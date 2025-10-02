<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CierreCaja;
use App\Models\Venta;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\VentasExport;
use App\Models\Pedido;
use App\Models\CategoriaProducto;
use App\Models\Producto;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Traits\Auditable;



class CajaController extends Controller
{
    use Auditable;
    public function index()
    {
        $usuario = Auth::user();
        if ($usuario->rol?->nombre !== 'Cajero') {
            abort(403, 'No tienes permisos para acceder a la caja');
        }

        // ============================
        // 1. Pedidos listos sin venta
        // ============================
        $pedidos = Pedido::where('estado', 'listo')
            ->doesntHave('venta')
            ->with('detalles.producto')
            ->get();

        $pedidosJS = $pedidos->map(function ($p) {
            return [
                'idPedido' => $p->idPedido,
                'mesa' => $p->mesa,
                'detalles' => $p->detalles->map(function ($d) {
                    return [
                        'nombre' => $d->producto->nombre,
                        'cantidad' => $d->cantidad,
                        'comentarios' => $d->comentarios ?? '',
                        'precio' => $d->producto->precio,
                        'subtotal' => $d->subtotal,
                    ];
                })->values(),
            ];
        })->values();

        // ============================
        // 2. Datos de resumen de caja
        // ============================
        $ultimoCierre = CierreCaja::latest()->first();
        $fondoInicial = $ultimoCierre ? $ultimoCierre->total_caja : 0; // 👈 lo puse en 0 como pediste

        // ⚠️ Usa el campo correcto de tu BD: "fecha" o "fechaPago"
        $ventasHoy = Venta::whereDate('fechaPago', now()->toDateString())->get();


        $totalEfectivo = $ventasHoy->where('metodo_pago', 'Efectivo')->sum('montoTotal');
        $totalTarjeta  = $ventasHoy->where('metodo_pago', 'Tarjeta')->sum('montoTotal');
        $totalQR       = $ventasHoy->where('metodo_pago', 'QR')->sum('montoTotal');

        $totalEnCaja = $fondoInicial + $totalEfectivo + $totalTarjeta + $totalQR;

        // ============================
        // 3. Retornar a la vista
        // ============================
        return view('admin.ventas.caja', [
            'pedidos'       => $pedidos,
            'pedidosJS'     => $pedidosJS,
            'fondoInicial'  => $fondoInicial,
            'totalEnCaja'   => $totalEnCaja,
            'totalEfectivo' => $totalEfectivo,
            'totalTarjeta'  => $totalTarjeta,
            'totalQR'       => $totalQR,
        ])->with('title', 'Control de caja');
    }




    public function cobrar(Request $request)
    {
        $request->validate([
            'idPedido' => 'required|exists:Pedido,idPedido',
            'tipo_pago' => 'required|string',
            'pago_cliente' => 'required|numeric|min:0',
        ]);

        $pedido = Pedido::with('detalles.producto')->findOrFail($request->idPedido);

        // Calcular total del pedido
        $total = $pedido->detalles->sum(fn($d) => $d->subtotal);

        // Pago y cambio
        $pagoCliente = $request->pago_cliente;
        $cambio = $pagoCliente - $total;

        // Crear la venta
        $venta = Venta::create([
            'idPedido'     => $pedido->idPedido,
            'montoTotal'   => $total,
            'fechaPago'    => now(),
            'metodo_pago'  => $request->tipo_pago,
            'pago_cliente' => $pagoCliente,
            'cambio'       => $cambio,
        ]);

        // Actualizar estado del pedido
        $pedido->update(['estado' => 'pagado']);

        // Redirigir al recibo
        return redirect()->route('ventas.recibo', $venta->idVenta);
    }

    public function recibo($idVenta)
    {
        $venta = Venta::with(['pedido.detalles.producto', 'pedido.usuario'])->findOrFail($idVenta);

        return view('admin.ventas.recibo', compact('venta'));
    }



    public function cerrarCaja()
    {
        $usuario = Auth::user();

        $ultimoCierre = CierreCaja::latest()->first();
        $fondoInicial = $ultimoCierre ? $ultimoCierre->total_caja : 0;

        // 👇 Usar la columna correcta
        $ventasHoy = Venta::whereDate('fechaPago', now()->toDateString())->get();

        $totalEfectivo = $ventasHoy->where('metodo_pago', 'Efectivo')->sum('montoTotal');
        $totalTarjeta  = $ventasHoy->where('metodo_pago', 'Tarjeta')->sum('montoTotal');
        $totalQR       = $ventasHoy->where('metodo_pago', 'QR')->sum('montoTotal');

        $totalEnCaja = $fondoInicial + $totalEfectivo + $totalTarjeta + $totalQR;


        CierreCaja::create([
            'ciUsuario'      => $usuario->ciUsuario,
            'fondo_inicial'  => $fondoInicial,
            'total_efectivo' => $totalEfectivo,
            'total_tarjeta'  => $totalTarjeta,
            'total_qr'       => $totalQR,
            'total_caja'     => $totalEnCaja,
            'fecha_cierre'   => now(),
        ]);
        // 🔒 Log de auditoría
        $this->logAction(
            "Se cerró la caja con total {$totalEnCaja}",
            'Caja',
            'Exitoso'
        );
        return redirect()->route('ventas.caja')->with('exito', '✅ Caja cerrada correctamente');
    }






    // Exportar Excel (ejemplo simple)
    public function exportExcel()
    {
        $ventasHoy = Venta::whereDate('fechaPago', now()->toDateString())->with('pedido.usuario')->get();
        $this->logAction("Se exportó Excel de ventas del día", 'Caja', 'Exitoso');


        return \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\VentasExport($ventasHoy), 'ventas_hoy.xlsx');
    }



    // Exportar PDF (ejemplo simple)
    public function exportPDF()
    {
        $ventasHoy = Venta::whereDate('fechaPago', now()->toDateString())->get();
        $pdf = Pdf::loadView('admin.ventas.reportePDF', compact('ventasHoy'));
        $this->logAction("Se exportó PDF de ventas del día", 'Caja', 'Exitoso');
        return $pdf->download('ventas_hoy.pdf');
    }
}
