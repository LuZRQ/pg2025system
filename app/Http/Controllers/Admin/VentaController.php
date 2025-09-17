<?php

/**
 * @property string $ciUsuario
 * @property string $nombre
 * @property string $apellido
 * @property string $correo
 * @property string $telefono
 */

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Venta;
use Illuminate\Http\Request;
use App\Models\Pedido;
use App\Models\CategoriaProducto;
use App\Models\Producto;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;


class VentaController extends Controller
{
    /**
     * Listado de ventas
     */
    public function index()
    {
        // Categorías con sus productos
        $categorias = CategoriaProducto::with('productos')->get();

        // Todos los productos (opcional, si quieres filtrar por JS)
        $productos = Producto::with('categoria')->get();

        // Ventas realizadas
        $ventas = Venta::with('pedido.usuario', 'pedido.detallePedidos.producto')->get();

        // Pedidos listos en cocina
        $pedidos = Pedido::where('estado', 'listo')
            ->doesntHave('venta')
            ->with('detallePedidos.producto')
            ->get();

        return view('admin.ventas.index', compact('categorias', 'productos', 'ventas', 'pedidos'));
    }
   public function enviarACocina(Request $request)
{
    $request->validate([
        'mesa' => 'required',
        'productos' => 'required', // JSON con los productos
    ]);

    // Convertir productos JSON a array
    $productos = json_decode($request->productos, true);

    // Calcular el total del pedido
    $total = collect($productos)->sum(fn($p) => $p['cantidad'] * $p['precio']);

    // Obtener el usuario logueado (o null si no hay sesión)
    $usuario = Auth::user();

    if (!$usuario) {
        return redirect()->back()->with('error', 'Debes iniciar sesión para registrar pedidos.');
    }

    // Crear pedido con total calculado
    $pedido = Pedido::create([
        'ciUsuario'   => $usuario->ciUsuario,  // 👈 ahora sí seguro
        'mesa'        => $request->mesa,
        'estado'      => 'pendiente',
        'comentarios' => $request->comentarios ?? null,
        'fechaCreacion' => now(),
        'total'       => $total,
    ]);

    // Crear detalle del pedido
    foreach ($productos as $producto) {
        $pedido->detalles()->create([
            'idProducto' => $producto['idProducto'],
            'cantidad'   => $producto['cantidad'],
            'subtotal'   => $producto['cantidad'] * $producto['precio'],
        ]);
    }

    return redirect()->route('ventas.index')
        ->with('success', 'Pedido enviado a Cocina ✅');
}



    /**
     * Formulario para registrar nueva venta
     */
    public function create()
    {

        $pedidos = Pedido::where('estado', 'listo')
            ->doesntHave('venta')
            ->with('detallePedidos.producto')
            ->get();

        return view('admin.ventas.create', compact('pedidos'));
    }

    /**
     * Guardar nueva venta
     */
    public function store(Request $request)
    {
        $request->validate([
            'idPedido' => 'required|exists:Pedido,idPedido',
        ]);

        $pedido = Pedido::with('detallePedidos')->findOrFail($request->idPedido);

        // Calcular total desde detallePedidos
        $montoTotal = $pedido->detallePedidos->sum(function ($detalle) {
            return $detalle->subtotal;
        });

        Venta::create([
            'idPedido'   => $pedido->idPedido,
            'montoTotal' => $montoTotal,
            'fechaPago'  => now(),
        ]);

        return redirect()->route('ventas.index')
            ->with('success', 'Venta registrada correctamente.');
    }


    /**
     * Mostrar detalle de una venta
     */
    public function show($id)
    {
        $venta = Venta::with('pedido')->findOrFail($id);
        return view('admin.ventas.show', compact('venta'));
    }

    /**
     * Formulario para editar venta
     */
    public function edit($id)
    {
        $venta = Venta::findOrFail($id);
        $pedidos = Pedido::all();
        return view('admin.ventas.edit', compact('venta', 'pedidos'));
    }

    /**
     * Actualizar venta
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'idPedido' => 'required|exists:Pedido,idPedido',
        ]);

        $pedido = Pedido::with('detallePedidos')->findOrFail($request->idPedido);
        $montoTotal = $pedido->detallePedidos->sum(fn($d) => $d->subtotal);

        $venta = Venta::findOrFail($id);
        $venta->update([
            'idPedido'   => $pedido->idPedido,
            'montoTotal' => $montoTotal,
            'fechaPago'  => now(),
        ]);

        return redirect()->route('ventas.index')
            ->with('success', 'Venta actualizada correctamente.');
    }


    /**
     * Eliminar venta
     */
    public function destroy($id)
    {
        $venta = Venta::findOrFail($id);
        $venta->delete();

        return redirect()->route('ventas.index')->with('success', 'Venta eliminada correctamente.');
    }
}
