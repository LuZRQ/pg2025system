<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Illuminate\Http\Request;
use App\Traits\Auditable;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
class PedidoController extends Controller
{
    use Auditable;
    // Mostrar pedidos pendientes en cocina
    public function index(Request $request)
    {
        $estado = $request->get('estado');

        $pedidos = Pedido::with(['detalles.producto', 'usuario'])
            ->whereDate('fechaCreacion', now()->toDateString())
            ->when($estado, function ($query, $estado) {
                $query->where('estado', $estado);
            })
            ->orderBy('fechaCreacion', 'desc')
            ->get();

        return view('admin.pedidos.index', compact('pedidos'))
            ->with('title', 'Pedidos de Cocina');
    }



    // Mostrar detalle de un pedido específico
    public function show($idPedido)
    {
        $pedido = Pedido::with('detalles.producto', 'usuario')->findOrFail($idPedido);

        return view('admin.pedidos.show', compact('pedido'));
    }




    // Listar pedidos ya listos
    public function listos()
    {
        $pedidos = Pedido::with('detalles.producto', 'usuario')
            ->where('estado', 'listo')
            ->whereDate('fechaCreacion', now()->toDateString())
            ->orderBy('fechaCreacion', 'desc')
            ->get();

        return view('admin.pedidos.listos', compact('pedidos'));
    }

    public function cambiarEstado(Request $request, $idPedido)
    {

        $pedido = Pedido::with('detalles.producto')->findOrFail($idPedido);


        $nuevoEstado = $request->input('estado');

        if (!in_array($nuevoEstado, ['pendiente', 'en preparación', 'listo', 'cancelado'])) {
            return redirect()->back()->with('error', 'Estado inválido.');
        }

        if ($pedido->estado === $nuevoEstado) {
            return redirect()->back()->with('info', "El pedido ya está en estado '{$nuevoEstado}'.");
        }

        if ($nuevoEstado === 'listo') {
            foreach ($pedido->detalles as $detalle) {
                $producto = $detalle->producto;

                if ($producto->stock < $detalle->cantidad) {
                    return redirect()->back()->with(
                        'error',
                        "No hay suficiente stock de {$producto->nombre} para completar el pedido."
                    );
                }
            }

           foreach ($pedido->detalles as $detalle) {
    // Recargar el producto directamente de la BD (evita usar el cache del primer pedido)
    $producto = \App\Models\Producto::find($detalle->producto->idProducto);

    $oldStock = $producto->stock;

    $resultado = $producto->descontarStock($detalle->cantidad);

                if (!$resultado) {
                    return redirect()->back()->with(
                        'error',
                        "Error inesperado al descontar el stock de {$producto->nombre}."
                    );
                }


                $this->logAction(
                    "Descuento de stock por Pedido #{$pedido->idPedido}: {$detalle->cantidad}x {$producto->nombre} (de {$oldStock} a {$producto->stock})",
                    'Stock',
                    'Descuento automático'
                );
            }
        }

        if ($nuevoEstado === 'cancelado' && $pedido->estado === 'listo') {
            foreach ($pedido->detalles as $detalle) {
                $producto = $detalle->producto;

                $this->logAction(
                    "Pedido #{$pedido->idPedido} cancelado - pérdida de {$detalle->cantidad}x {$producto->nombre}",
                    'Pedidos',
                    'Cancelado'
                );
            }
        }

        $pedido->estado = $nuevoEstado;
        $pedido->save();

        $this->logAction(
            "Pedido #{$pedido->idPedido} cambiado a '{$nuevoEstado}'" . ($nuevoEstado === 'listo' ? ' con descuento de stock' : ''),
            'Pedidos',
            'Exitoso'
        );

        return redirect()->back()->with(
            'exito',
            "Pedido marcado como '{$nuevoEstado}'" . ($nuevoEstado === 'listo' ? ' y stock actualizado.' : '.')
        );
    }
    // 🧾 Mostrar los pedidos actuales y listos del mesero logueado
    public function pedidosMesero()
    {
        $usuario = Auth::user();

        // Pedidos en curso (no cancelados ni listos)
        $pedidosActuales = Pedido::with(['detalles.producto'])
            ->where('usuario_id', $usuario->id)
            ->whereNotIn('estado', ['cancelado', 'listo'])
            ->orderBy('fechaCreacion', 'desc')
            ->get();

        // Pedidos que ya están listos
        $pedidosListos = Pedido::with(['detalles.producto'])
            ->where('usuario_id', $usuario->id)
            ->where('estado', 'listo')
            ->orderBy('fechaCreacion', 'desc')
            ->get();

        return view('admin.ventas.pedidos_mesero', compact('pedidosActuales', 'pedidosListos'))
            ->with('title', 'Pedidos del Mesero');
    }

    // 🚫 Cancelar un pedido (desde vista del mesero)
    public function cancelarPedido($idPedido)
    {
        $pedido = Pedido::with('detalles.producto')->findOrFail($idPedido);

        // Solo el mesero que creó el pedido puede cancelarlo
   if ($pedido->ciUsuario !== Auth::user()->ciUsuario) {


            return redirect()->back()->with('error', 'No puedes cancelar pedidos de otros meseros.');
        }

        // Si el pedido ya fue cancelado o cobrado
        if ($pedido->estado === 'cancelado') {
            return redirect()->back()->with('info', 'Este pedido ya está cancelado.');
        }

        // Si el pedido ya fue cobrado o cerrado
        if ($pedido->estado === 'cobrado') {
            return redirect()->back()->with('error', 'Este pedido ya fue cobrado y no se puede cancelar.');
        }

        // Si ya estaba listo, lo registramos como pérdida
        if ($pedido->estado === 'listo') {
            foreach ($pedido->detalles as $detalle) {
                $producto = $detalle->producto;

                $this->logAction(
                    "Pedido #{$pedido->idPedido} cancelado (Listo) - pérdida de {$detalle->cantidad}x {$producto->nombre}",
                    'Pedidos',
                    'Cancelado'
                );
            }
        }

        // Actualizar estado
        $pedido->estado = 'cancelado';
        $pedido->save();

        $this->logAction(
            "Pedido #{$pedido->idPedido} fue cancelado por el mesero " . Auth::user()->nombre,
            'Pedidos',
            'Cancelación'
        );

        return redirect()->back()->with('exito', 'El pedido fue cancelado correctamente.');
    }


}
