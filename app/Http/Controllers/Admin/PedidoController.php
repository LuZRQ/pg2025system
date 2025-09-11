<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    // Mostrar pedidos pendientes en cocina
    public function index()
    {
        $pedidos = Pedido::with('detalles.producto', 'usuario')
        ->whereIn('estado', ['pendiente', 'en preparación']) // Traer pendientes y en preparación
        ->orderBy('fechaCreacion', 'asc')
        ->get();

    return view('admin.pedidos.index', compact('pedidos')); // tu blade está en pedidos/index.blade.php

    }

    // Mostrar detalle de un pedido específico
    public function show($idPedido)
    {
        $pedido = Pedido::with('detalles.producto', 'usuario')->findOrFail($idPedido);

        return view('admin.pedidos.show', compact('pedido'));
    }

    // Cambiar estado del pedido a "listo"
    public function updateEstado(Request $request, $idPedido)
    {
        $pedido = Pedido::findOrFail($idPedido);
        $pedido->estado = 'listo';
        $pedido->save();

        return redirect()->route('admin.pedidos.index')
            ->with('success', 'Pedido marcado como listo ✅');
    }

    // Listar pedidos ya listos
    public function listos()
    {
        $pedidos = Pedido::with('detalles.producto', 'usuario')
            ->where('estado', 'listo')
            ->orderBy('fechaCreacion', 'desc')
            ->get();

        return view('admin.pedidos.listos', compact('pedidos'));
    }
    // Cambiar estado del pedido
    public function cambiarEstado(Request $request, $idPedido)
    {
        $pedido = Pedido::findOrFail($idPedido);

        // Recibir el estado por POST
        $nuevoEstado = $request->input('estado');
        if (in_array($nuevoEstado, ['pendiente', 'en preparación', 'listo'])) {
            $pedido->estado = $nuevoEstado;
            $pedido->save();
        }

        return redirect()->back()->with('success', "Pedido marcado como '{$nuevoEstado}'.");
    }
}
