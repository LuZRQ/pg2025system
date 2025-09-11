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
        'productos' => 'required', // lo validamos como string (vendrá en JSON)
    ]);

    // Convertir productos del JSON del formulario oculto a array
    $productos = json_decode($request->productos, true);

  $usuario = auth()->user() ?? Usuario::first(); // toma el primer usuario si no hay sesión

$pedido = Pedido::create([
    'mesa' => $request->mesa,
    'estado' => 'pendiente',
    'comentarios' => $request->comentarios ?? null,
    'ciUsuario' => $usuario->ciUsuario,
    'fechaCreacion' => now(),
]);


    // Crear detalle del pedido
    foreach ($productos as $producto) {
        $pedido->detalles()->create([  // 👈 tu relación en Pedido se llama detalles()
            'idProducto' => $producto['idProducto'], 
            'cantidad' => $producto['cantidad'],
            'subtotal' => $producto['cantidad'] * $producto['precio'],
        ]);
    }

    return redirect()->route('admin.ventas.index')
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
