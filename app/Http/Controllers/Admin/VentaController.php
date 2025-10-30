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

public function index(Request $request)
{
    // 🔹 Obtener todas las categorías activas
    $categorias = CategoriaProducto::orderBy('nombreCategoria')->get();

    // 🔹 Filtros desde la vista
    $categoriaId = $request->get('categoria');
    $buscar = $request->get('buscar');

    // 🔹 Base query para productos activos
    $query = Producto::activos()->with('categoria');

    if ($categoriaId && $categoriaId !== 'all') {
        $query->where('categoriaId', $categoriaId);
    }

    if ($buscar) {
        $query->where('nombre', 'like', "%{$buscar}%");
    }

    // 🔹 Paginación de productos (12 por página)
    $productos = $query->orderBy('nombre')->paginate(12);

    // 🔹 Ventas y pedidos listos (mantiene tu lógica)
    $ventas = Venta::with('pedido.usuario', 'pedido.detalles.producto')->get();

    $pedidos = Pedido::where('estado', 'listo')
        ->doesntHave('venta')
        ->with('detalles.producto')
        ->get();

    // 🔹 Pedidos actuales y listos del mesero logueado
    $usuario = Auth::user();
$pedidosActuales = Pedido::with(['detalles.producto'])
    ->where('ciUsuario', $usuario->ciUsuario)
    ->whereNotIn('estado', ['cancelado', 'listo'])
    ->orderBy('fechaCreacion', 'desc')
    ->get();

$pedidosListos = Pedido::with(['detalles.producto'])
    ->where('ciUsuario', $usuario->ciUsuario)
    ->where('estado', 'listo')
     ->whereDate('fechaCreacion', now()->toDateString()) 
    ->get();


    // 🔹 Retornar vista con todos los datos
    return view('admin.ventas.index', compact(
        'categorias',
        'productos',
        'ventas',
        'pedidos',
        'pedidosActuales',
        'pedidosListos'
    ))
    ->with('title', 'Gestión de Ventas')
    ->with([
        'categoriaSeleccionada' => $categoriaId,
        'busqueda' => $buscar,
    ]);
}


public function enviarACocina(Request $request)
{
    // ✅ 1. Validar datos
    $request->validate([
        'mesa' => 'required',
        'productos' => 'required',
    ]);

    $productos = json_decode($request->productos, true);
    $total = collect($productos)->sum(fn($p) => $p['cantidad'] * $p['precio']);

    $usuario = Auth::user();
    if (!$usuario) {
        return redirect()->back()->with('error', 'Debes iniciar sesión para registrar pedidos.');
    }

    // ✅ 2. Calcular número correlativo diario
    $numeroPedido = Pedido::whereDate('fechaCreacion', now()->toDateString())->count() + 1;

    // ✅ 3. Crear el pedido
    $pedido = Pedido::create([
        'ciUsuario'     => $usuario->ciUsuario,
        'estado'        => 'pendiente',
        'comentarios'   => $request->comentarios ?? null,
        'fechaCreacion' => now(),
        'total'         => $total,
        'mesa'          => $request->mesa,
        'numero_diario' => $numeroPedido,
    ]);

    // ✅ 4. Guardar detalles
    foreach ($productos as $producto) {
        $pedido->detalles()->create([
            'idProducto' => $producto['idProducto'],
            'cantidad'   => $producto['cantidad'],
            'subtotal'   => $producto['cantidad'] * $producto['precio'],
        ]);
    }

    // ✅ 5. Log en auditoría
    $this->logAction(
        "Se creó el pedido #{$pedido->idPedido} (N° diario {$pedido->numero_diario}) para la mesa {$pedido->mesa} por {$usuario->usuario}",
        'Pedidos',
        'Exitoso'
    );

    // ✅ 6. Guardar ID para posible reimpresión
    session(['ultimoPedidoId' => $pedido->idPedido]);

    // ✅ 7. Redirigir directo al recibo
    return redirect()
        ->route('ventas.pedido.recibo', ['idPedido' => $pedido->idPedido])
        ->with('exito', "Pedido #{$pedido->numero_diario} enviado a cocina correctamente.");
}

/**
 * Mostrar el recibo del pedido en formato imprimible
 */
public function reciboPedido($idPedido)
{
    $pedido = Pedido::with('detalles.producto', 'usuario')->findOrFail($idPedido);
    $fechaActual = now();

    return view('admin.ventas.reciboPedido', compact('pedido', 'fechaActual'));
}

/**
 * Reimprimir el último pedido enviado
 */
public function reimprimirUltimoPedido()
{
    $idPedido = session('ultimoPedidoId');

    if (!$idPedido) {
        return redirect()->back()->with('error', 'No hay un pedido reciente para reimprimir.');
    }

    return $this->reciboPedido($idPedido);
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

        $mesas = Pedido::select('mesa')->distinct()->get();

        return view('admin.ventas.historial', compact('ventas', 'mesas'));
    }

    public function create()
    {

        $pedidos = Pedido::where('estado', 'listo')
            ->doesntHave('venta')
            ->with('detalles.producto')
            ->get();

        return view('admin.ventas.create', compact('pedidos'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'idPedido' => 'required|exists:Pedido,idPedido',
        ]);

        $pedido = Pedido::with('detalles')->findOrFail($request->idPedido);

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

    public function show($idVenta)
    {
        $venta = Venta::with('pedido.detalles.producto')->findOrFail($idVenta);
        return view('admin.ventas.show', compact('venta'));
    }

    public function edit($id)
    {
        $venta = Venta::findOrFail($id);
        $pedidos = Pedido::all();
        return view('admin.ventas.edit', compact('venta', 'pedidos'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'montoTotal'  => 'required|numeric|min:0',
            'metodo_pago' => 'required|in:Efectivo,Tarjeta,QR',
            'fechaPago'   => 'required|date_format:Y-m-d\TH:i',
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
