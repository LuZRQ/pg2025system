<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Pedido;
use App\Models\Producto;
use App\Models\DetallePedido;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Exports\VentasExport;

use App\Exports\StockExport;
use Maatwebsite\Excel\Facades\Excel;

class ReporteController extends Controller
{
    public function index()
    {
        // 1️⃣ Total Ventas del Día
        $totalVentasDia = Venta::whereDate('fechaPago', now()->toDateString())
            ->sum('montoTotal');

        // 2️⃣ Pedidos Atendidos del Día
        $pedidosAtendidosDia = Pedido::whereDate('updated_at', now()->toDateString())
            ->where('estado', 'pagado')
            ->count();

        // 3️⃣ Producto Más Vendido del Día
        $productoMasVendido = DetallePedido::selectRaw('producto_id, SUM(cantidad) as cantidad')
            ->whereHas('pedido', function ($q) {
                $q->whereDate('updated_at', now()->toDateString())
                    ->where('estado', 'pagado');
            })
            ->groupBy('producto_id')
            ->orderByDesc('cantidad')
            ->with('producto')
            ->first();

        // 4️⃣ Top 5 Productos del Día
        $top5Productos = DetallePedido::selectRaw('producto_id, SUM(cantidad) as cantidad')
            ->whereHas('pedido', function ($q) {
                $q->whereDate('updated_at', now()->toDateString())
                    ->where('estado', 'pagado');
            })
            ->groupBy('producto_id')
            ->orderByDesc('cantidad')
            ->with('producto')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'nombre' => $item->producto->nombre ?? 'Producto',
                    'cantidad' => $item->cantidad
                ];
            });

        // 5️⃣ Ventas últimos 7 días (para gráfico de barras)
        $ventasSemana = collect();
        for ($i = 6; $i >= 0; $i--) {
            $fecha = now()->subDays($i)->toDateString();
            $total = Venta::whereDate('fechaPago', $fecha)->sum('montoTotal');
            $ventasSemana->push([
                'fecha' => $fecha,
                'total' => $total
            ]);
        }

        // 6️⃣ Stock crítico (ejemplo: stock <= 5)
        $stockCritico = Producto::where('stock', '<=', 5)->get();

        return view('reportes.index', [
            'totalVentasDia'     => $totalVentasDia,
            'pedidosAtendidosDia' => $pedidosAtendidosDia,
            'productoMasVendido' => $productoMasVendido ? (object)[
                'nombre' => $productoMasVendido->producto->nombre ?? '-',
                'cantidad' => $productoMasVendido->cantidad
            ] : null,
            'top5Productos'      => $top5Productos,
            'ventasSemana'       => $ventasSemana,
            'stockCritico'       => $stockCritico,
        ]);
    }

 // Ventas del día - PDF
    public function ventasPDF()
    {
        $ventas = Venta::whereDate('fechaPago', now()->toDateString())
            ->with('pedido.detalles.producto', 'pedido.usuario')
            ->get();

        $pdf = Pdf::loadView('reportes.ventasPDF', compact('ventas'));
        return $pdf->download('ventas_dia.pdf');
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
    public function stockExcel() {
        return Excel::download(new StockExport, 'stock.xlsx');
    }

    // PDF opcional
    public function stockPDF() {
        $productos = Producto::all();
        $pdf = Pdf::loadView('reportes.stockPDF', compact('productos'));
        return $pdf->download('stock.pdf');
    }
}
