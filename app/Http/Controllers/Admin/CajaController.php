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
use App\Models\CajaActual;
use App\Models\Pedido;
use App\Models\CategoriaProducto;
use App\Models\Producto;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Traits\Auditable;

use Illuminate\Support\Facades\Log;


class CajaController extends Controller
{
    use Auditable;
    public function index()
    {
        $usuario = Auth::user();
        $rol = $usuario->rol?->nombre;

        if (!in_array($rol, ['Cajero', 'Dueno'])) {
            abort(403, 'No tienes permisos para acceder a la caja');
        }

        // --- Pedidos listos sin venta ---
        $pedidos = Pedido::where('estado', 'listo')
            ->doesntHave('venta')
            ->with('detalles.producto')
            ->get();

        $pedidosJS = $pedidos->map(function ($p) {
            return [
                'idPedido' => $p->idPedido,
                'mesa' => $p->mesa,
                'detalles' => $p->detalles->map(fn($d) => [
                    'nombre' => $d->producto->nombre,
                    'cantidad' => $d->cantidad,
                    'comentarios' => $d->comentarios ?? '',
                    'precio' => $d->producto->precio,
                    'subtotal' => $d->subtotal,
                ]),
            ];
        });

        Log::info('Index Caja - Sesión actual:', session()->all());

        // === Traer caja actual desde BD ===
        $cajaActual = \App\Models\CajaActual::where('estado', 'abierta')->first();

        // === Último cierre (opcional) ===
        $ultimoCierre = \App\Models\CierreCaja::latest('fecha_cierre')->first();

        // 🟡 Verificar si falta cerrar días anteriores o si ya es hora de cierre y no se ha cerrado
        $mostrarAlerta = false;
        $horaActual = now()->format('H:i');

        // Si no hay cierre del día o fue de una fecha anterior
        if (!$ultimoCierre || \Carbon\Carbon::parse($ultimoCierre->fecha_cierre)->lt(now()->startOfDay())) {
            // Mostrar alerta solo si ya pasó la hora de cierre (por ejemplo, 20:00)
            if ($horaActual >= '20:00') {
                $mostrarAlerta = true;
            }
        }


        // --- Fondo inicial ---
        $fondoInicial = $cajaActual?->fondo_inicial ?? 0;

        if ($cajaActual) {
            $ventasHoy = Venta::whereDate('fechaPago', now()->toDateString())->get();

            // Total efectivo cobrado (para mostrar en resumen)
            $totalEfectivoCobrado = $ventasHoy->where('metodo_pago', 'Efectivo')->sum('montoTotal');

            // Total efectivo que queda en caja = lo que se cobró
            $totalEfectivoReal = $totalEfectivoCobrado;

            $totalTarjeta  = $ventasHoy->where('metodo_pago', 'Tarjeta')->sum('montoTotal');
            $totalQR       = $ventasHoy->where('metodo_pago', 'QR')->sum('montoTotal');

            // Total en caja = fondo inicial + efectivo + tarjeta + QR
            $totalEnCaja = $fondoInicial + $totalEfectivoReal + $totalTarjeta + $totalQR;
        } else {
            $totalEfectivoCobrado = 0;
            $totalEfectivoReal    = 0;
            $totalTarjeta         = 0;
            $totalQR              = 0;
            $totalEnCaja          = 0;
        }

        return view('admin.ventas.caja', [
            'pedidos'              => $pedidos,
            'pedidosJS'            => $pedidosJS,
            'cajaActual'           => $cajaActual,
            'ultimoCierre'         => $ultimoCierre,
            'fondoInicial'         => $fondoInicial,
            'totalEnCaja'          => $totalEnCaja,
            'totalEfectivoCobrado' => $totalEfectivoCobrado, // resumen
            'totalEfectivo'        => $totalEfectivoCobrado, // mostrar en Blade como "Efectivo"
            'totalTarjeta'         => $totalTarjeta,
            'totalQR'              => $totalQR,
            'mostrarAlerta'        => $mostrarAlerta,
        ])->with('title', 'Control de caja');
    }





    // 🧾 Recibo individual
    public function recibo($idVenta)
    {
        $venta = Venta::with(['pedido.detalles.producto', 'pedido.usuario'])->findOrFail($idVenta);
        return view('admin.ventas.recibo', compact('venta'));
    }

    public function abrirCaja(Request $request)
    {
        $usuario = Auth::user();

        // Validar que no haya una caja abierta por este usuario
        $cajaAbierta = CajaActual::where('estado', 'abierta')->first();

        if ($cajaAbierta) {
            return redirect()->route('ventas.caja')
                ->with('error', 'Ya hay una caja abierta.');
        }

        $request->validate([
            'fondo_inicial' => 'required|numeric|min:0',
            'observaciones' => 'nullable|string|max:255',
        ]);

        CajaActual::create([
            'ciUsuario'     => $usuario->ciUsuario,
            'fondo_inicial'  => $request->fondo_inicial,
            'observaciones'  => $request->observaciones,
            'fecha_apertura' => now(),
            'estado'         => 'abierta',
        ]);

        $this->logAction("Caja abierta con fondo de Bs. {$request->fondo_inicial}", 'Caja', 'Exitoso');

        return redirect()->route('ventas.caja')->with('exito', 'Caja abierta correctamente.');
    }


    // 💵 Cobrar pedido
    public function cobrar(Request $request)
    {
        $request->validate([
            'idPedido' => 'required|exists:Pedido,idPedido',
            'tipo_pago' => 'required|string',
            'pago_cliente' => 'required|numeric|min:0',
        ]);

        $pedido = Pedido::with('detalles.producto')->findOrFail($request->idPedido);
        $total = $pedido->detalles->sum(fn($d) => $d->subtotal);

        $pagoCliente = $request->pago_cliente;
        $cambio = $pagoCliente - $total;

        // Obtener caja actual
        $cajaActual = CajaActual::where('estado', 'abierta')->first();
        $fondoDisponible = $cajaActual?->fondo_inicial ?? 0;

        // Validar que haya fondo suficiente para dar cambio si es efectivo
        if ($request->tipo_pago === 'Efectivo' && $cambio > $fondoDisponible) {
            return redirect()->back()->with('error', "No hay suficiente fondo inicial para dar cambio (fondo disponible: Bs. {$fondoDisponible}).");
        }

        // Ajustar fondo inicial si hay cambio
        if ($request->tipo_pago === 'Efectivo') {
            $cajaActual->fondo_inicial -= $cambio;
            $cajaActual->save();
        }

        // Calcular monto total según tipo de pago
        $montoTotal = $request->tipo_pago === 'Tarjeta'
            ? $total - ($total * 0.018)
            : $total;

        // Efectivo que realmente entra a caja (lo que queda)
        $efectivoReal = $request->tipo_pago === 'Efectivo' ? $pagoCliente - $cambio : 0;

        $venta = Venta::create([
            'idPedido'      => $pedido->idPedido,
            'montoTotal'    => $montoTotal,
            'fechaPago'     => now(),
            'metodo_pago'   => $request->tipo_pago,
            'pago_cliente'  => $pagoCliente,
            'cambio'        => $cambio,
            'efectivo_real' => $efectivoReal,
        ]);

        $pedido->update(['estado' => 'pagado']);

        return redirect()->route('ventas.recibo', $venta->idVenta)
            ->with('exito', 'Venta realizada correctamente.');
    }



    public function cerrarCaja()
    {
        $usuario = Auth::user();

        $caja = CajaActual::where('estado', 'abierta')->first();

        if (!$caja) {
            return redirect()->route('ventas.caja')
                ->with('error', 'No hay caja abierta.');
        }


        $ventasHoy = Venta::whereDate('fechaPago', now()->toDateString())->get();

        $totalEfectivo = $ventasHoy->where('metodo_pago', 'Efectivo')->sum('efectivo_real');

        $totalTarjeta  = $ventasHoy->where('metodo_pago', 'Tarjeta')->sum('montoTotal');
        $totalQR       = $ventasHoy->where('metodo_pago', 'QR')->sum('montoTotal');

        $totalEnCaja = $caja->fondo_inicial + $totalEfectivo + $totalTarjeta + $totalQR;

        // Guardar cierre
        CierreCaja::create([
            'ciUsuario'      => $usuario->ciUsuario,
            'fondo_inicial'  => $caja->fondo_inicial,
            'total_efectivo' => $totalEfectivo,
            'total_tarjeta'  => $totalTarjeta,
            'total_qr'       => $totalQR,
            'total_caja'     => $totalEnCaja,
            'observaciones'  => $caja->observaciones,
            'fecha_apertura' => $caja->fecha_apertura,
            'fecha_cierre'   => now(),
        ]);

        // Cerrar caja actual
        $caja->update(['estado' => 'cerrada']);

        $this->logAction("Se cerró la caja con total de Bs. {$totalEnCaja}", 'Caja', 'Exitoso');

        return redirect()->route('ventas.caja')->with('exito', ' Caja cerrada correctamente.');
    }


    public function updateMontoInicial(Request $request)
    {
        $usuario = Auth::user();

        if ($usuario->rol?->nombre !== 'Dueno') {
            abort(403, 'Solo el dueño puede editar el monto inicial.');
        }

        $request->validate(['monto_inicial' => 'required|numeric|min:0']);

        $caja = CajaActual::where('estado', 'abierta')->first();

        if (!$caja) {
            return redirect()->route('ventas.caja')
                ->with('error', 'No hay caja abierta.');
        }


        $caja->update(['fondo_inicial' => $request->monto_inicial]);

        $this->logAction("Monto inicial actualizado a Bs. {$request->monto_inicial}", 'Caja', 'Exitoso');

        return redirect()->route('ventas.caja')->with('exito', 'Monto inicial actualizado correctamente.');
    }





    // Exportar Excel de la caja en vivo
    public function exportCajaExcel()
    {
        $caja = CajaActual::where('estado', 'abierta')->first();
        if (!$caja) {
            return back()->with('error', 'No hay una caja abierta actualmente.');
        }


        $fondoInicial = is_array($caja) ? $caja['fondo_inicial'] : $caja->fondo_inicial;

        $ventasHoy = Venta::whereDate('fechaPago', now()->toDateString())
            ->selectRaw('metodo_pago, SUM(montoTotal) as total')
            ->groupBy('metodo_pago')
            ->pluck('total', 'metodo_pago');

        $totalEfectivo = $ventasHoy['Efectivo'] ?? 0;
        $totalTarjeta  = $ventasHoy['Tarjeta'] ?? 0;
        $totalQR       = $ventasHoy['QR'] ?? 0;

        $totalEnCaja = $fondoInicial + $totalEfectivo + $totalTarjeta + $totalQR;

        $this->logAction("Se exportó Excel de la caja en vivo", 'Caja', 'Exitoso');

        return \Maatwebsite\Excel\Facades\Excel::download(
            new \App\Exports\CajaEnVivoExport($caja, $totalEfectivo, $totalTarjeta, $totalQR, $totalEnCaja),
            'caja_en_vivo_' . now()->format('Y-m-d_H-i') . '.xlsx'
        );
    }

    // Exportar PDF de la caja en vivo
    public function exportCajaPDF()
    {
        $caja = CajaActual::where('estado', 'abierta')->first();
        if (!$caja) {
            return back()->with('error', 'No hay una caja abierta actualmente.');
        }


        $fondoInicial = is_array($caja) ? $caja['fondo_inicial'] : $caja->fondo_inicial;

        $ventasHoy = Venta::whereDate('fechaPago', now()->toDateString())
            ->selectRaw('metodo_pago, SUM(montoTotal) as total')
            ->groupBy('metodo_pago')
            ->pluck('total', 'metodo_pago');

        $totalEfectivo = $ventasHoy['Efectivo'] ?? 0;
        $totalTarjeta  = $ventasHoy['Tarjeta'] ?? 0;
        $totalQR       = $ventasHoy['QR'] ?? 0;

        $totalEnCaja = $fondoInicial + $totalEfectivo + $totalTarjeta + $totalQR;

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView(
            'admin.ventas.cajaEnVivoPDF',
            compact('caja', 'totalEfectivo', 'totalTarjeta', 'totalQR', 'totalEnCaja')
        );

        $this->logAction("Se exportó PDF de la caja en vivo", 'Caja', 'Exitoso');

        return $pdf->download('caja_en_vivo_' . now()->format('Y-m-d_H-i') . '.pdf');
    }
}
