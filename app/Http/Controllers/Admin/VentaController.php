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
        // Categorías con sus productos activos
        $categorias = CategoriaProducto::with(['productos' => function ($query) {
            $query->activos();
        }])->get();

        // Todos los productos activos (opcional, si quieres filtrar por JS)
        $productos = Producto::activos()->with('categoria')->get();

        // Ventas realizadas
        $ventas = Venta::with('pedido.usuario', 'pedido.detalles.producto')->get();

        // Pedidos listos en cocina
        $pedidos = Pedido::where('estado', 'listo')
            ->doesntHave('venta')
            ->with('detalles.producto')
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


    public function historial(Request $request)
    {
        // Puedes agregar filtros si quieres
        $ventas = Venta::with('cliente')->paginate(10); // o get() si no quieres paginar

        $query = Venta::with('pedido.cliente'); // Trae cliente relacionado al pedido

        if ($request->filled('fecha_desde')) {
            $query->whereDate('fecha', '>=', $request->fecha_desde);
        }
        if ($request->filled('fecha_hasta')) {
            $query->whereDate('fecha', '<=', $request->fecha_hasta);
        }
        if ($request->filled('mesa')) {
            $mesa = $request->mesa;
            $query->whereHas('pedido', function ($q) use ($mesa) {
                $q->where('mesa', 'like', "%$mesa%");
            });
        }

        $ventas = $query->orderBy('fecha', 'desc')->paginate(10);

        return view('admin.ventas.historial', compact('ventas'));
    }
    public function caja()
    {
        $usuario = Auth::user();
        if ($usuario->rol?->nombre !== 'Cajero') {
            abort(403, 'No tienes permisos para acceder a la caja');
        }

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
                })->values(), // 👈 importante
            ];
        })->values(); // 👈 forzamos array


        // 👇 OJO: hay que enviar $pedidos Y $pedidosJS a la vista
        return view('admin.ventas.caja', [
            'pedidos' => $pedidos,
            'pedidosJS' => $pedidosJS,
        ]);
    }





    public function cobrar(Request $request)
    {
        $request->validate([
            'idPedido' => 'required|exists:Pedido,idPedido',
            'tipo_pago' => 'required|string',
            'pago_cliente' => 'required|numeric|min:0',
        ]);

        $pedido = Pedido::with('detalles.producto')->findOrFail($request->idPedido);

     
$total = $pedido->detalles->sum(fn($d) => $d->subtotal);

$venta = Venta::create([
    'idPedido'    => $pedido->idPedido,
    'montoTotal'  => $total,
    'fechaPago'   => now(),
    'metodo_pago' => $request->tipo_pago,
]);

        $pedido->update(['estado' => 'pagado']);

        // Redirigir al recibo
    return redirect()->route('ventas.recibo', $venta->idVenta);
    }
    public function recibo($idVenta)
    {
        $venta = Venta::with(['pedido.detalles.producto', 'pedido.usuario'])->findOrFail($idVenta);

        return view('admin.ventas.recibo', compact('venta'));
    }




    /**
     * Formulario para registrar nueva venta
     */
    public function create()
    {

        $pedidos = Pedido::where('estado', 'listo')
            ->doesntHave('venta')
            ->with('detalles.producto')
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

        $pedido = Pedido::with('detalles')->findOrFail($request->idPedido);

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

        $pedido = Pedido::with('detalles')->findOrFail($request->idPedido);
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
