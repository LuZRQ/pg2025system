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

    public function show($id)
    {
        $reporte = Reporte::findOrFail($id);
        return view('admin.reportes.show', compact('reporte'));
    }

    public function generarVentasDiaPDF()
    {
        // Obtener las ventas del día
        $ventas = Venta::whereDate('fechaPago', now()->toDateString())->get();
        $total = $ventas->sum('montoTotal');
        $fecha = now()->toDateString();

        // Generar PDF usando una vista
        $pdf = Pdf::loadView('admin.reportes.pdf.ventasDia', compact('ventas', 'total', 'fecha'));

        // Definir nombre del archivo
        $nombreArchivo = 'ventas_dia_' . $fecha . '.pdf';
        $ruta = 'reportes/' . $nombreArchivo;

        // Guardar en storage/app/public/reportes
        Storage::disk('public')->put($ruta, $pdf->output());

        // Registrar en la tabla Reporte
        Reporte::create([
            'tipo' => 'ventas_dia',
            'periodo' => $fecha,
            'generadoPor' => auth()->user()->name ?? 'Sistema',
            'archivo' => $ruta,
        ]);

        // Devolver descarga
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

    // Ventas semana - PDF
    public function ventasSemanalPDF()
    {
        $ventas = Venta::whereBetween('fechaPago', [now()->subWeek(), now()])
            ->with('pedido.detalles.producto', 'pedido.usuario')
            ->get();

        $pdf = Pdf::loadView('reportes.ventasPDF', compact('ventas'));
        return $pdf->download('ventas_semana.pdf');
    }

    // Ventas semana - Excel
    public function ventasSemanaExcel()
    {
        $ventas = Venta::whereBetween('fechaPago', [now()->subWeek(), now()])
            ->with('pedido.usuario')
            ->get();

        return Excel::download(new VentasExport($ventas), 'ventas_semana.xlsx');
    }

    // Ventas mes - PDF
    public function ventasMesPDF()
    {
        $ventas = Venta::whereMonth('fechaPago', now()->month)
            ->with('pedido.detalles.producto', 'pedido.usuario')
            ->get();

        $pdf = Pdf::loadView('reportes.ventasPDF', compact('ventas'));
        return $pdf->download('ventas_mes.pdf');
    }

    // Ventas mes - Excel
    public function ventasMesExcel()
    {
        $ventas = Venta::whereMonth('fechaPago', now()->month)
            ->with('pedido.usuario')
            ->get();

        return Excel::download(new VentasExport($ventas), 'ventas_mes.xlsx');
    }

    // ===== Stock =====


    // Stock
    public function stockExcel()
    {
        return Excel::download(new StockExport, 'stock.xlsx');
    }

    public function stockPDF()
    {
        $productos = Producto::all();

        // Crear PDF desde la vista
        $pdf = Pdf::loadView('reportes.stockPDF', compact('productos'));

        // Nombre del archivo con fecha
        $filename = 'reportes/ventas/stock_' . now()->toDateString() . '.pdf';

        // Guardar en storage/public/reportes/ventas
        $pdf->save(storage_path('app/public/' . $filename));

        // Retornar para descargar
        return response()->download(storage_path('app/public/' . $filename));
    }
}
