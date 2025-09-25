<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CierreCaja;
use App\Models\Venta;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;



class CajaController extends Controller
{
    public function caja()
    {
        // Obtener el último cierre de caja para sacar el fondo inicial
        $ultimoCierre = \App\Models\CierreCaja::latest()->first();
        $fondoInicial = $ultimoCierre ? $ultimoCierre->total_caja : 1000;

        // Ventas del día de hoy
        $ventasHoy = \App\Models\Venta::whereDate('fechaPago', now()->toDateString())->get();

        $totalEfectivo = $ventasHoy->where('metodo_pago', 'efectivo')->sum('montoTotal');
        $totalTarjeta  = $ventasHoy->where('metodo_pago', 'tarjeta')->sum('montoTotal');
        $totalQR       = $ventasHoy->where('metodo_pago', 'qr')->sum('montoTotal');

        $totalEnCaja = $fondoInicial + $totalEfectivo + $totalTarjeta + $totalQR;

        return view('admin.ventas.caja', compact(
            'fondoInicial',
            'totalEnCaja',
            'totalEfectivo',
            'totalTarjeta',
            'totalQR'
        ));
    }


   public function cerrarCaja()
{
    /** @var \App\Models\Usuario $usuario */
    $usuario = Auth::user();

    // Obtenemos fondo inicial desde el último cierre
    $ultimoCierre = CierreCaja::latest()->first();
    $fondoInicial = $ultimoCierre ? $ultimoCierre->total_caja : 1000;

    // Ventas del día
    $ventas = Venta::whereDate('fechaPago', now()->toDateString())->get();

    $totalEfectivo = $ventas->where('metodo_pago', 'efectivo')->sum('montoTotal');
    $totalTarjeta  = $ventas->where('metodo_pago', 'tarjeta')->sum('montoTotal');
    $totalQR       = $ventas->where('metodo_pago', 'qr')->sum('montoTotal');

    // Total en caja correcto
    $totalCaja = $fondoInicial + $totalEfectivo + $totalTarjeta + $totalQR;

    // Guardamos el cierre
    CierreCaja::create([
        'ciUsuario'      => $usuario->ciUsuario,
        'fondo_inicial'  => $fondoInicial,
        'total_efectivo' => $totalEfectivo,
        'total_tarjeta'  => $totalTarjeta,
        'total_qr'       => $totalQR,
        'total_caja'     => $totalCaja,
        'fecha_cierre'   => now(),
    ]);

    return redirect()->route('ventas.caja')->with('success', '✅ Caja cerrada correctamente');
}

    // Exportar Excel (ejemplo simple)
    public function exportExcel()
    {
        // Aquí usarías Laravel Excel o lo que tengas
        return "Función Excel aún no implementada";
    }

    // Exportar PDF (ejemplo simple)
    public function exportPDF()
    {
        // Aquí usarías dompdf o snappy
        return "Función PDF aún no implementada";
    }
}
