<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Illuminate\Http\Request;
use App\Traits\Auditable;

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

    // Cambiar estado del pedido
 public function cambiarEstado(Request $request, $idPedido)
{
    $pedido = Pedido::with('detalles.producto')->findOrFail($idPedido);

    $nuevoEstado = $request->input('estado');

    // Solo aceptar estados válidos
    if (!in_array($nuevoEstado, ['pendiente', 'en preparación', 'listo', 'cancelado'])) {
    return redirect()->back()->with('error', 'Estado inválido.');
}


    // Si ya está en el mismo estado, no hacemos nada
    if ($pedido->estado === $nuevoEstado) {
        return redirect()->back()->with('info', "El pedido ya está en estado '{$nuevoEstado}'.");
    }

    // 🔹 Caso especial: pasar a LISTO → descontar stock
   // 🔹 Caso especial: pasar a LISTO → descontar stock
if ($nuevoEstado === 'listo') {
    foreach ($pedido->detalles as $detalle) {
        $producto = $detalle->producto;
        if ($producto->stock >= $detalle->cantidad) {
            $producto->stock -= $detalle->cantidad;
            $producto->save();
        } else {
            return redirect()->back()->with(
                'error',
                "No hay suficiente stock de {$producto->nombre} para completar el pedido."
            );
        }
    }
}

// 🔹 Caso especial: pasar a CANCELADO después de LISTO → registrar pérdida
if ($nuevoEstado === 'cancelado' && $pedido->estado === 'listo') {
    foreach ($pedido->detalles as $detalle) {
        $producto = $detalle->producto;

        // No devolvemos stock, solo registramos pérdida
        $this->logAction(
            "Pedido #{$pedido->idPedido} cancelado - pérdida de {$detalle->cantidad}x {$producto->nombre}",
            'Pedidos',
            'Cancelado'
        );
    }
}


    // Actualizar estado y guardar
    $pedido->estado = $nuevoEstado;
    $pedido->save();

    // Log de auditoría
    $this->logAction(
        "Pedido #{$pedido->idPedido} cambiado a '{$nuevoEstado}'"
            . ($nuevoEstado === 'listo' ? ' y stock actualizado' : ''),
        'Pedidos',
        'Exitoso'
    );

    return redirect()->back()->with(
        'exito',
        "Pedido marcado como '{$nuevoEstado}'" . ($nuevoEstado === 'listo' ? ' ✅ y stock actualizado.' : '.')
    );
}

}
