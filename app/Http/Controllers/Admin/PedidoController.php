<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Illuminate\Http\Request;
use App\Traits\Auditable;
use Barryvdh\DomPDF\Facade\Pdf;

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
            ->whereDate('fechaCreacion', now()->toDateString()) // 🔹 Solo del día
            ->orderBy('fechaCreacion', 'desc')
            ->get();

        return view('admin.pedidos.listos', compact('pedidos'));
    }

    public function cambiarEstado(Request $request, $idPedido)
    {

        $pedido = Pedido::with('detalles.producto')->findOrFail($idPedido);


        $nuevoEstado = $request->input('estado');

        // 🔒 Validar estado permitido
        if (!in_array($nuevoEstado, ['pendiente', 'en preparación', 'listo', 'cancelado'])) {
            return redirect()->back()->with('error', 'Estado inválido.');
        }

        // ⚠️ Ya está en ese estado
        if ($pedido->estado === $nuevoEstado) {
            return redirect()->back()->with('info', "El pedido ya está en estado '{$nuevoEstado}'.");
        }

        // ✅ Si cambiamos a "listo", descontar stock
        if ($nuevoEstado === 'listo') {
            // Primero, validar que todos los productos tengan stock suficiente
            foreach ($pedido->detalles as $detalle) {
                $producto = $detalle->producto;

                if ($producto->stock < $detalle->cantidad) {
                    return redirect()->back()->with(
                        'error',
                        "No hay suficiente stock de {$producto->nombre} para completar el pedido."
                    );
                }
            }

            // Ahora sí, descontar stock usando el método del modelo
            foreach ($pedido->detalles as $detalle) {
                $producto = $detalle->producto;
                $oldStock = $producto->stock;

                $resultado = $producto->descontarStock($detalle->cantidad);

                if (!$resultado) {
                    return redirect()->back()->with(
                        'error',
                        "Error inesperado al descontar el stock de {$producto->nombre}."
                    );
                }

                // Log por producto
                $this->logAction(
                    "Descuento de stock por Pedido #{$pedido->idPedido}: {$detalle->cantidad}x {$producto->nombre} (de {$oldStock} a {$producto->stock})",
                    'Stock',
                    'Descuento automático'
                );
            }
        }

        // 🛑 Cancelar pedido que ya estaba "listo" → registrar pérdida
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

        // 💾 Guardar el nuevo estado del pedido
        $pedido->estado = $nuevoEstado;
        $pedido->save();

        // 📋 Log general del cambio
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



    public function imprimirRecibo($idPedido)
    {
        $pedido = Pedido::with('detalles.producto', 'usuario')->findOrFail($idPedido);
        return view('admin.pedidos.recibo', compact('pedido'));
    }
}
