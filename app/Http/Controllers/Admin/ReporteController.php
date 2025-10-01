<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Pedido;
use App\Models\Reporte;
use App\Models\Producto;
use App\Models\DetallePedido;
use App\Exports\VentasExport;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use App\Exports\StockExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ProductosMesExport;
use App\Exports\GananciaMesExport;
use App\Exports\AltaRotacionExport;
use App\Exports\BajaVentaExport;
use Illuminate\Support\Facades\Auth;


class ReporteController extends Controller
{
    public function index(Request $request)
    {
        // ✅ 1. Estadísticas del día
        $totalVentasDia = Venta::whereDate('fechaPago', now()->toDateString())->sum('montoTotal');

        $pedidosAtendidosDia = Pedido::whereDate('fechaCreacion', now()->toDateString())
            ->where('estado', 'pagado')
            ->count();

        $productoMasVendido = DetallePedido::selectRaw('idProducto, SUM(cantidad) as cantidad')
            ->whereHas('pedido', function ($q) {
                $q->whereDate('fechaCreacion', now()->toDateString())
                    ->where('estado', 'pagado');
            })
            ->groupBy('idProducto')
            ->orderByDesc('cantidad')
            ->with('producto')
            ->first();

        $top5Productos = DetallePedido::selectRaw('idProducto, SUM(cantidad) as cantidad')
            ->whereHas('pedido', function ($q) {
                $q->whereDate('fechaCreacion', now()->toDateString())
                    ->where('estado', 'pagado');
            })
            ->groupBy('idProducto')
            ->orderByDesc('cantidad')
            ->with('producto')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'nombre'   => $item->producto->nombre ?? 'Producto',
                    'cantidad' => $item->cantidad
                ];
            });

        // ✅ 2. Gráfico de ventas últimos 7 días
        $ventasSemana = collect();
        for ($i = 6; $i >= 0; $i--) {
            $fecha = now()->subDays($i)->toDateString();
            $total = Venta::whereDate('fechaPago', $fecha)->sum('montoTotal');
            $ventasSemana->push(['fecha' => $fecha, 'total' => $total]);
        }

        // ✅ 3. Stock crítico
        $stockCritico = Producto::where('stock', '<=', 5)->get();

        // ✅ 4. Tendencias de ventas
        $ventasActuales = DetallePedido::selectRaw('idProducto, SUM(cantidad) as cantidad')
            ->whereHas('pedido', fn($q) => $q->whereBetween('fechaCreacion', [now()->subDays(6), now()]))
            ->groupBy('idProducto')
            ->with('producto')
            ->get()
            ->keyBy('idProducto');

        $ventasPrevias = DetallePedido::selectRaw('idProducto, SUM(cantidad) as cantidad')
            ->whereHas('pedido', fn($q) => $q->whereBetween('fechaCreacion', [now()->subDays(13), now()->subDays(7)]))
            ->groupBy('idProducto')
            ->get()
            ->keyBy('idProducto');

        $tendencias = [];
        foreach ($ventasActuales as $id => $actual) {
            $previa = $ventasPrevias[$id]->cantidad ?? 0;
            $cambio = $previa > 0 ? (($actual->cantidad - $previa) / $previa) * 100 : 100;

            if ($cambio >= 20) {
                $tendencias[] = [
                    'producto' => $actual->producto->nombre ?? 'Producto',
                    'tipo' => 'subiendo',
                    'cambio' => round($cambio)
                ];
            } elseif ($cambio <= -20) {
                $tendencias[] = [
                    'producto' => $actual->producto->nombre ?? 'Producto',
                    'tipo' => 'bajando',
                    'cambio' => round(abs($cambio))
                ];
            }
        }

        // ✅ 5. Reportes históricos (lo que te faltaba y causa el error)
        $query = Reporte::query();

        if ($request->filled('categoria')) {
            $query->where('tipo', $request->categoria);
        }
        if ($request->filled('desde')) {
            $query->whereDate('fechaGeneracion', '>=', $request->desde);
        }
        if ($request->filled('hasta')) {
            $query->whereDate('fechaGeneracion', '<=', $request->hasta);
        }

        $reportes = $query->orderBy('fechaGeneracion', 'desc')->get();

        // ✅ 6. Retornamos TODO JUNTO
        return view('admin.reportes.index', [
            'totalVentasDia'      => $totalVentasDia,
            'pedidosAtendidosDia' => $pedidosAtendidosDia,
            'productoMasVendido'  => $productoMasVendido ? (object)[
                'nombre'   => $productoMasVendido->producto->nombre ?? '-',
                'cantidad' => $productoMasVendido->cantidad
            ] : null,
            'top5Productos'       => $top5Productos,
            'ventasSemana'        => $ventasSemana,
            'stockCritico'        => $stockCritico,
            'tendencias'          => $tendencias,
            'reportes'            => $reportes, // ✅ Esto evita tu error
        ]);
    }
public function show(Reporte $reporte)
{
    $path = storage_path('app/public/' . $reporte->archivo);
    return view('admin.reportes.show', compact('reporte', 'path'));
}
public function showAvanzadoPDF($tipo)
{
    $fecha = now()->toDateString();

    switch ($tipo) {
        case 'productos_mes':
            $productos = Producto::with('categoria', 'detallePedidos.pedido.venta')
                ->get()
                ->map(function ($producto) {
                    $cantidadVendida = 0;

                    foreach ($producto->detallePedidos as $detalle) {
                        $venta = $detalle->pedido->venta ?? null;

                        if ($venta && \Carbon\Carbon::parse($venta->fechaPago)->month == now()->month) {
                            $cantidadVendida += $detalle->cantidad;
                        }
                    }

                    $producto->cantidad_vendida = $cantidadVendida;
                    return $producto;
                });

            $pdf = Pdf::loadView('admin.reportes.pdf.productosMes', compact('productos'));
            break;

        case 'ganancia_mes':
            $productos = Producto::with('detallePedidos.pedido.venta')
                ->get()
                ->map(function ($producto) {
                    $ganancia = 0;

                    foreach ($producto->detallePedidos as $detalle) {
                        $venta = $detalle->pedido->venta ?? null;

                        if ($venta && \Carbon\Carbon::parse($venta->fechaPago)->month == now()->month) {
                            $ganancia += $detalle->cantidad * $producto->precio;
                        }
                    }

                    $producto->ganancia = $ganancia;
                    return $producto;
                });

            $pdf = Pdf::loadView('admin.reportes.pdf.gananciaMes', compact('productos'));
            break;

        case 'alta_rotacion':
            $productos = Producto::with('detallePedidos.pedido.venta')
                ->get()
                ->map(function ($producto) {
                    $cantidadVendida = 0;

                    foreach ($producto->detallePedidos as $detalle) {
                        $venta = $detalle->pedido->venta ?? null;

                        if ($venta && \Carbon\Carbon::parse($venta->fechaPago)->month == now()->month) {
                            $cantidadVendida += $detalle->cantidad;
                        }
                    }

                    $producto->cantidad_vendida = $cantidadVendida;
                    return $producto;
                })
                ->sortByDesc('cantidad_vendida');

            $pdf = Pdf::loadView('admin.reportes.pdf.altaRotacion', compact('productos'));
            break;

        case 'baja_venta':
            $productos = Producto::with('detallePedidos.pedido.venta')
                ->get()
                ->map(function ($producto) {
                    $cantidadVendida = 0;

                    foreach ($producto->detallePedidos as $detalle) {
                        $venta = $detalle->pedido->venta ?? null;

                        if ($venta && \Carbon\Carbon::parse($venta->fechaPago)->month == now()->month) {
                            $cantidadVendida += $detalle->cantidad;
                        }
                    }

                    $producto->cantidad_vendida = $cantidadVendida;
                    return $producto;
                })
                ->sortBy('cantidad_vendida');

            $pdf = Pdf::loadView('admin.reportes.pdf.bajaVenta', compact('productos'));
            break;

        default:
            abort(404);
    }

    $filename = $tipo . '_' . $fecha . '.pdf';
    $ruta = 'reportes/' . $filename;

    Storage::disk('public')->put($ruta, $pdf->output());

    $pdfUrl = asset('storage/' . $ruta);

    return view('admin.reportes.showAvanzado', compact('pdfUrl', 'tipo'));
}

   

   // ===== SECCIÓN 1: REPORTES RÁPIDOS =====

    // Ventas del día - PDF
    public function ventasDiaPDF()
    {
        $ventas = Venta::whereDate('fechaPago', now()->toDateString())->get();
        $total = $ventas->sum('montoTotal');
        $fecha = now()->toDateString();

        $pdf = Pdf::loadView('admin.reportes.pdf.ventasDia', compact('ventas', 'total', 'fecha'));

        $nombreArchivo = 'ventas_dia_' . $fecha . '.pdf';
        $ruta = 'reportes/' . $nombreArchivo;

        Storage::disk('public')->put($ruta, $pdf->output());

        Reporte::create([
            'tipo' => 'ventas_dia',
            'periodo' => $fecha,
            'generadoPor' => Auth::user()->name ?? 'Sistema',
            'archivo' => $ruta,
        ]);

        return response()->download(storage_path('app/public/' . $ruta));
    }

    // Ventas del día - Excel
    public function ventasDiaExcel()
    {
        $ventas = Venta::whereDate('fechaPago', now()->toDateString())
            ->with('pedido.usuario')
            ->get();

        return Excel::download(new VentasExport($ventas), 'ventas_dia.xlsx');
    }

    // Stock general - PDF
    public function stockPDF()
    {
        $productos = Producto::all();
        $fecha = now()->toDateString();

        $pdf = Pdf::loadView('admin.reportes.pdf.stockPDF', compact('productos', 'fecha'));

        $nombreArchivo = 'stock_' . $fecha . '.pdf';
        $ruta = 'reportes/' . $nombreArchivo;

        Storage::disk('public')->put($ruta, $pdf->output());

        Reporte::create([
            'tipo' => 'stock',
            'periodo' => $fecha,
            'generadoPor' => Auth::user()->name ?? 'Sistema',
            'archivo' => $ruta,
        ]);

        return response()->download(storage_path('app/public/' . $ruta));
    }

    // Stock general - Excel
    public function stockExcel()
    {
        return Excel::download(new StockExport, 'stock.xlsx');
    }

// ===== SECCIÓN 2: REPORTES AVANZADOS =====

// Productos más vendidos del mes
public function productosMesPDF()
{
    $productos = Producto::with('categoria', 'detallePedidos.pedido.venta')
        ->get()
        ->map(function ($producto) {
            $cantidadVendida = 0;
            foreach ($producto->detallePedidos as $detalle) {
                $venta = $detalle->pedido->venta ?? null;
                if ($venta && \Carbon\Carbon::parse($venta->fechaPago)->month == now()->month) {
                    $cantidadVendida += $detalle->cantidad;
                }
            }
            $producto->cantidad_vendida = $cantidadVendida;
            return $producto;
        });

    $pdf = Pdf::loadView('admin.reportes.pdf.productosMes', compact('productos'));
    $fecha = now()->toDateString();
    $nombreArchivo = 'productos_mes_' . $fecha . '.pdf';
    $ruta = 'reportes/' . $nombreArchivo;

    Storage::disk('public')->put($ruta, $pdf->output());

    Reporte::create([
        'tipo' => 'productos_mes',
        'periodo' => $fecha,
        'generadoPor' => Auth::user()->name ?? 'Sistema',
        'archivo' => $ruta,
    ]);

    return response()->download(storage_path('app/public/' . $ruta));
}

// Ganancia total del mes
public function gananciaMesPDF()
{
    $productos = Producto::with('detallePedidos.pedido.venta')
        ->get()
        ->map(function ($producto) {
            $ganancia = 0;
            foreach ($producto->detallePedidos as $detalle) {
                $venta = $detalle->pedido->venta ?? null;
                if ($venta && \Carbon\Carbon::parse($venta->fechaPago)->month == now()->month) {
                    $ganancia += $detalle->cantidad * $producto->precio;
                }
            }
            $producto->ganancia = $ganancia;
            return $producto;
        });

    $pdf = Pdf::loadView('admin.reportes.pdf.gananciaMes', compact('productos'));
    $fecha = now()->toDateString();
    $nombreArchivo = 'ganancia_mes_' . $fecha . '.pdf';
    $ruta = 'reportes/' . $nombreArchivo;

    Storage::disk('public')->put($ruta, $pdf->output());

    Reporte::create([
        'tipo' => 'ganancia_mes',
        'periodo' => $fecha,
        'generadoPor' => Auth::user()->name ?? 'Sistema',
        'archivo' => $ruta,
    ]);

    return response()->download(storage_path('app/public/' . $ruta));
}

// Productos con alta rotación
public function altaRotacionPDF()
{
    $productos = Producto::with('detallePedidos.pedido.venta')
        ->get()
        ->map(function ($producto) {
            $cantidadVendida = 0;
            foreach ($producto->detallePedidos as $detalle) {
                $venta = $detalle->pedido->venta ?? null;
                if ($venta && \Carbon\Carbon::parse($venta->fechaPago)->month == now()->month) {
                    $cantidadVendida += $detalle->cantidad;
                }
            }
            $producto->cantidad_vendida = $cantidadVendida;
            return $producto;
        })
        ->sortByDesc('cantidad_vendida');

    $pdf = Pdf::loadView('admin.reportes.pdf.altaRotacion', compact('productos'));
    $fecha = now()->toDateString();
    $nombreArchivo = 'alta_rotacion_' . $fecha . '.pdf';
    $ruta = 'reportes/' . $nombreArchivo;

    Storage::disk('public')->put($ruta, $pdf->output());

    Reporte::create([
        'tipo' => 'alta_rotacion',
        'periodo' => $fecha,
        'generadoPor' => Auth::user()->name ?? 'Sistema',
        'archivo' => $ruta,
    ]);

    return response()->download(storage_path('app/public/' . $ruta));
}

// Productos con baja venta
public function bajaVentaPDF()
{
    $productos = Producto::with('detallePedidos.pedido.venta')
        ->get()
        ->map(function ($producto) {
            $cantidadVendida = 0;
            foreach ($producto->detallePedidos as $detalle) {
                $venta = $detalle->pedido->venta ?? null;
                if ($venta && \Carbon\Carbon::parse($venta->fechaPago)->month == now()->month) {
                    $cantidadVendida += $detalle->cantidad;
                }
            }
            $producto->cantidad_vendida = $cantidadVendida;
            return $producto;
        })
        ->sortBy('cantidad_vendida');

    $pdf = Pdf::loadView('admin.reportes.pdf.bajaVenta', compact('productos'));
    $fecha = now()->toDateString();
    $nombreArchivo = 'baja_venta_' . $fecha . '.pdf';
    $ruta = 'reportes/' . $nombreArchivo;

    Storage::disk('public')->put($ruta, $pdf->output());

    Reporte::create([
        'tipo' => 'baja_venta',
        'periodo' => $fecha,
        'generadoPor' => Auth::user()->name ?? 'Sistema',
        'archivo' => $ruta,
    ]);

    return response()->download(storage_path('app/public/' . $ruta));
}


    // ===== SECCIÓN 2: REPORTES AVANZADOS =====

    // Productos más vendidos del mes
    public function productosMesExcel()
    {
        return Excel::download(new ProductosMesExport, 'productos_mes.xlsx');
    }

    // Ganancia total del mes

    public function gananciaMesExcel()
    {
        return Excel::download(new GananciaMesExport, 'ganancia_mes.xlsx');
    }

    // Insumos / Productos con alta rotación

    public function altaRotacionExcel()
    {
        return Excel::download(new AltaRotacionExport, 'alta_rotacion.xlsx');
    }

    // Productos con baja venta

    public function bajaVentaExcel()
    {
        return Excel::download(new BajaVentaExport, 'baja_venta.xlsx');
    }

    // ===== SHOW de reportes históricos =====
  
public function downloadPDF($tipo)
{
    $fecha = now()->toDateString();
    $filename = $tipo . '_' . $fecha . '.pdf';
    $ruta = 'reportes/' . $filename;

    if (!Storage::disk('public')->exists($ruta)) {
        return back()->with('error', 'El archivo no existe.');
    }
// Guardar registro en la tabla Reporte
Reporte::firstOrCreate(
    [
        'tipo' => $tipo,
        'periodo' => $fecha,
        'archivo' => $ruta,
    ],
    [
        'generadoPor' => Auth::user()->name ?? 'Sistema',
    ]
);

    return response()->download(storage_path('app/public/' . $ruta));
}

   public function downloadExcel($tipo)
{
    switch ($tipo) {
        case 'productos_mes':
            $exportClass = \App\Exports\ProductosMesExport::class;
            break;

        case 'ganancia_mes':
            $exportClass = \App\Exports\GananciaMesExport::class;
            break;

        case 'alta_rotacion':
            $exportClass = \App\Exports\AltaRotacionExport::class;
            break;

        case 'baja_venta':
            $exportClass = \App\Exports\BajaVentaExport::class;
            break;

        default:
            abort(404);
    }

    $nombreArchivo = $tipo . '_' . now()->toDateString() . '.xlsx';
    return Excel::download(new $exportClass, $nombreArchivo);
}
}
