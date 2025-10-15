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

use App\Traits\Auditable;

class VentaController extends Controller
{
    use Auditable;
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

        return view('admin.ventas.index', compact('categorias', 'productos', 'ventas', 'pedidos'))
            ->with('title', 'Gestión de Ventas');
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
            'ciUsuario'   => $usuario->ciUsuario,
            'estado'      => 'pendiente',
            'comentarios' => $request->comentarios ?? null,
            'fechaCreacion' => now(),
            'total'       => $total,
            'mesa' => $request->mesa,

        ]);

        // Crear detalle del pedido
        foreach ($productos as $producto) {
            $pedido->detalles()->create([
                'idProducto' => $producto['idProducto'],
                'cantidad'   => $producto['cantidad'],
                'subtotal'   => $producto['cantidad'] * $producto['precio'],
            ]);
        }
        $this->logAction(
            "Se creó el pedido #{$pedido->idPedido} para la mesa {$pedido->mesa} por {$usuario->usuario}",
            'Pedidos',
            'Exitoso'
        );

        return redirect()->route('ventas.index')
            ->with('exito', 'Pedido enviado a Cocina ');
    }

    public function historial(Request $request)
    {
        $query = Venta::with('pedido');

        if ($request->filled('fecha_desde')) {
            $query->whereDate('fechaPago', '>=', $request->fecha_desde);
        }

        if ($request->filled('fecha_hasta')) {
            $query->whereDate('fechaPago', '<=', $request->fecha_hasta);
        }

        if ($request->filled('mesa')) {
            $busqueda = $request->mesa;
            $query->whereHas('pedido', function ($q) use ($busqueda) {
                $q->where('mesa', $busqueda);
            });
        }

        $ventas = $query->orderBy('fechaPago', 'desc')->paginate(10);

        // 👇 Obtener todas las mesas que tienen ventas registradas
        $mesas = Pedido::select('mesa')->distinct()->get();

        return view('admin.ventas.historial', compact('ventas', 'mesas'));
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

        $venta = Venta::create([
            'idPedido'   => $pedido->idPedido,
            'montoTotal' => $montoTotal,
            'fechaPago'  => now(),
        ]);
        $this->logAction(
            "Se registró la venta #{$venta->idVenta} del pedido #{$pedido->idPedido}, monto total: {$montoTotal}",
            'Ventas',
            'Exitoso'
        );
        return redirect()->route('ventas.index')
            ->with('exito', 'Venta registrada correctamente.');
    }


    /**
     * Mostrar detalle de una venta
     */
    public function show($idVenta)
    {
        $venta = Venta::with('pedido.detalles.producto')->findOrFail($idVenta);
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
            'montoTotal'  => 'required|numeric|min:0',
            'metodo_pago' => 'required|string',
            'fechaPago'   => 'required|date',
        ]);

        $venta = Venta::findOrFail($id);
        $venta->update([
            'montoTotal'  => $request->montoTotal,
            'metodo_pago' => $request->metodo_pago,
            'fechaPago'   => $request->fechaPago,
        ]);

        $this->logAction(
            "Se actualizó la venta #{$venta->idVenta} con monto total {$venta->montoTotal}",
            'Ventas',
            'Exitoso'
        );

        return redirect()->route('ventas.historial')
            ->with('exito', 'Venta actualizada correctamente.');
    }



    /**
     * Eliminar venta
     */
    public function destroy($id)
    {
        $venta = Venta::findOrFail($id);
        $venta->delete();
        $this->logAction(
            "Se eliminó la venta #{$venta->idVenta} (pedido #{$venta->idPedido})",
            'Ventas',
            'Exitoso'
        );

        return redirect()->route('ventas.index')->with('exito', 'Venta eliminada correctamente.');
    }
}
