<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DetallePedido;
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
    $pedido = Pedido::with('detalles.producto.variantes')->findOrFail($idPedido);
    $nuevoEstado = $request->input('estado');

    // -----------------------------------------
    // 1) CAMBIO DE ESTADO DE UN SOLO PRODUCTO
    // -----------------------------------------
    if ($request->filled('detalle_id')) {

        $detalle = $pedido->detalles()->find($request->detalle_id);
        if (!$detalle) {
            return back()->with('error', 'Detalle no encontrado.');
        }

        // Cambiar estado individual
        $detalle->estado = $nuevoEstado;

        // Quitar marca de nuevo si ya está preparando o listo
        if ($nuevoEstado !== 'pendiente') {
            $detalle->es_nuevo = 0;
        }
        $detalle->save();

        // Actualizar estado global automáticamente
        $this->actualizarEstadoGlobal($pedido);

        return back()->with('exito', "El producto fue marcado como '{$nuevoEstado}'.");
    }

    // -----------------------------------------
    // 2) SI TIENE PRODUCTOS NUEVOS, USAR LÓGICA ESPECÍFICA
    // -----------------------------------------
    if ($pedido->detalles()->where('es_nuevo', 1)->exists()) {
        return $this->manejarEstadosPorProducto($request, $pedido);
    }

    // Validación de estado
    if (!in_array($nuevoEstado, ['pendiente', 'en preparación', 'listo', 'cancelado'])) {
        return redirect()->back()->with('error', 'Estado inválido.');
    }

    // Ya tiene ese estado?
    if ($pedido->estado === $nuevoEstado) {
        return redirect()->back()->with('info', "El pedido ya está en estado '{$nuevoEstado}'.");
    }

    // -----------------------------------------
    // 3) LÓGICA DE DESCUENTO DE STOCK SOLO CUANDO SE MARQUE LISTO
    // -----------------------------------------
    if ($nuevoEstado === 'listo') {

        // VALIDAR STOCK
        foreach ($pedido->detalles as $detalle) {
            $producto = $detalle->producto;
            $varianteId = $detalle->variante_id ?? null;

            if ($varianteId) {
                $variante = $producto->variantes()->find($varianteId);
                if (!$variante || $variante->stock < $detalle->cantidad) {
                    return redirect()->back()->with(
                        'error',
                        "No hay suficiente stock de la variante {$variante->tipo} de {$producto->nombre}."
                    );
                }
            } else {
                if ($producto->stock_inicial < $detalle->cantidad) {
                    return redirect()->back()->with(
                        'error',
                        "No hay suficiente stock de {$producto->nombre}."
                    );
                }
            }
        }

        // DESCONTAR STOCK
        foreach ($pedido->detalles as $detalle) {
            $producto = $detalle->producto;
            $varianteId = $detalle->variante_id ?? null;

            $oldStock = $producto->stock;
            $resultado = $producto->descontarStock($detalle->cantidad, $varianteId);

            if (!$resultado) {
                return redirect()->back()->with(
                    'error',
                    "Error inesperado al descontar el stock de {$producto->nombre}."
                );
            }

            $this->logAction(
                "Descuento de stock por Pedido #{$pedido->idPedido}: {$detalle->cantidad}x {$producto->nombre}" .
                ($varianteId ? " (Variante ID: $varianteId)" : "") .
                " (de {$oldStock} a {$producto->stock})",
                'Stock',
                'Descuento automático'
            );
        }
    }

    // -----------------------------------------
    // 4) CANCELACIÓN SI EL PEDIDO YA ESTABA LISTO
    // -----------------------------------------
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

    // -----------------------------------------
    // 5) ACTUALIZAR ESTADO GLOBAL DEL PEDIDO
    // -----------------------------------------
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

  // Obtener rol de forma segura
$rolUsuario = is_object(Auth::user()->rol) ? strtolower(Auth::user()->rol->nombre) : strtolower(Auth::user()->rol);

// Bloqueo solo si NO es dueño y NO es el mesero que creó el pedido
if ($pedido->ciUsuario !== Auth::user()->ciUsuario && $rolUsuario !== 'dueno') {
    return redirect()->back()->with('error', 'No puedes cancelar pedidos de otros meseros.');
}


    // Si el pedido ya fue cancelado o cobrado
    if ($pedido->estado === 'cancelado') {
        return redirect()->back()->with('info', 'Este pedido ya está cancelado.');
    }

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

    // 🟢 Log corregido según quién cancela
    $usuario = Auth::user()->nombre;
    $this->logAction(
        "Pedido #{$pedido->idPedido} fue cancelado por {$usuario}",
        'Pedidos',
        'Cancelación'
    );

    return redirect()->back()->with('exito', 'El pedido fue cancelado correctamente.');
}

   
private function manejarEstadosPorProducto($request, $pedido)
{
    $nuevoEstado = $request->input('estado');

    // Validar estados permitidos
    if (!in_array($nuevoEstado, ['pendiente', 'en preparación', 'listo'])) {
        return back()->with('error', 'Estado inválido para este flujo.');
    }

    foreach ($pedido->detalles as $detalle) {
        if ($detalle->es_nuevo != 1) continue;

        $detalle->estado = $nuevoEstado;

        if ($nuevoEstado !== 'pendiente') {
            $detalle->es_nuevo = 0;
        }

        $detalle->save();
    }

    // Actualizar el estado global
    $this->actualizarEstadoGlobal($pedido);

    return back()->with('exito', 'Estado actualizado con la lógica por producto.');
}

private function actualizarEstadoGlobal($pedido)
{
    $detalles = $pedido->detalles()
        ->whereIn('estado', ['pendiente', 'en preparación', 'listo'])
        ->get();

    if ($detalles->isEmpty()) return;

    $pendientes = $detalles->where('estado', 'pendiente')->count();
    $preparando = $detalles->where('estado', 'en preparación')->count();
    $listos = $detalles->where('estado', 'listo')->count();
    $total = $detalles->count();

    // Si TODOS están listos
    if ($listos === $total) {
        $pedido->estado = 'listo';

        // Opcional pero recomendable: limpiar marcas es_nuevo
        $pedido->detalles()->update(['es_nuevo' => 0]);
    }
    // Si TODOS están pendientes
    elseif ($pendientes === $total) {
        $pedido->estado = 'pendiente';
    }
    // Si hay mezcla o preparándose => en preparación
    else {
        $pedido->estado = 'en preparación';
    }

    $pedido->save();
}
public function cambiarEstadoDetalle(Request $request, $detalleId)
{
    $detalle = DetallePedido::with('pedido')->findOrFail($detalleId);
    $nuevoEstado = $request->estado;

    if (!in_array($nuevoEstado, ['pendiente', 'en preparación', 'listo'])) {
        return back()->with('error', 'Estado inválido.');
    }

    $detalle->estado = $nuevoEstado;

    // Si ya no está pendiente, ya no es "nuevo"
    if ($nuevoEstado !== 'pendiente') {
        $detalle->es_nuevo = 0;
    }

    $detalle->save();

    // 🔥 Actualizar el estado general del pedido
    $this->actualizarEstadoGlobal($detalle->pedido);

    return back()->with('exito', "Producto marcado como '{$nuevoEstado}'.");
}

}
