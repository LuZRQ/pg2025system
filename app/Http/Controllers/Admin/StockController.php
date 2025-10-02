<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use Carbon\Carbon;
use App\Traits\Auditable;

class StockController extends Controller
{
    use Auditable;
    public function index(Request $request)
    {
        $query = Producto::with('categoria'); // traemos productos con categoría

        // 🔎 Filtro por categoría
        if ($request->filled('categoria')) {
            $query->whereHas('categoria', function ($q) use ($request) {
                $q->where('nombreCategoria', $request->categoria);
            });
        }

        // 🔎 Filtro por estado de stock
        if ($request->filled('estado')) {
            $estado = $request->estado;

            $query = $query->get()->filter(function ($producto) use ($estado) {
                $estadoStock = $this->getEstadoStock($producto);
                return $estadoStock === $estado;
            });
        } else {
            $query = $query->get();
        }

        // 🔎 Filtro por búsqueda
        if ($request->filled('buscar')) {
            $buscar = strtolower($request->buscar);
            $query = $query->filter(function ($producto) use ($buscar) {
                return str_contains(strtolower($producto->nombre), $buscar);
            });
        }

        // Asignar estadoStock a cada producto
        $productos = $query->map(function ($producto) {
            $producto->estadoStock = $this->getEstadoStock($producto);
            return $producto;
        });

        return view('admin.stock.index', compact('productos'))
        ->with('title', 'Control de stock');
    }
    public function update(Request $request, Producto $producto)
    {
        $oldStock = $producto->stock;

        $producto->update($request->all());
        if ($oldStock != $producto->stock) {
            $this->logAction(
                "Stock del producto '{$producto->nombre}' actualizado manualmente de {$oldStock} a {$producto->stock}",
                'Stock',
                'Exitoso'
            );
        }
        $redirect = $request->input('redirect', 'productos.index');
        return redirect()->route($redirect)->with('exito', 'Producto actualizado correctamente.');
    }

    // Registrar entrada de stock
    public function entrada(Request $request, $idProducto)
    {
        $producto = Producto::findOrFail($idProducto);

        $request->validate([
            'cantidad' => 'required|integer|min:1',
        ]);

        $producto->stock += $request->cantidad;

        if ($producto->stock_inicial < $producto->stock) {
            $producto->stock_inicial = $producto->stock;
        }

        $producto->save();
        $this->logAction(
            "Se registró entrada de {$request->cantidad} unidades en {$producto->nombre}",
            'Stock',
            'Exitoso'
        );

        return redirect()->route('stock.index')->with('exito', 'Stock actualizado con entrada.');
    }

    // Registrar salida de stock
    public function salida(Request $request, $idProducto)
    {
        $producto = Producto::findOrFail($idProducto);

        $request->validate([
            'cantidad' => 'required|integer|min:1',
        ]);

        if ($producto->stock < $request->cantidad) {
            return redirect()->route('stock.index')->with('error', 'No hay suficiente stock disponible.');
        }

        $producto->stock -= $request->cantidad;
        $producto->save();
        $this->logAction(
            "Salida de stock: -{$request->cantidad} unidades del producto '{$producto->nombre}'. Stock actual: {$producto->stock}",
            'Stock',
            'Exitoso'
        );
        return redirect()->route('stock.index')->with('exito', 'Stock actualizado con salida.');
    }

    // Función privada para calcular el estado
    private function getEstadoStock(Producto $producto)
    {
        if ($producto->stock <= 0) {
            return 'rojo'; // Agotado
        }

        if ($producto->stock < 5) {
            return 'rojo'; // Muy bajo
        }

        if ($producto->stock < 20) {
            return 'amarillo'; // Bajo stock
        }

        return 'verde'; // OK
    }
}
