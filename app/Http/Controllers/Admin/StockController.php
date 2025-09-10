<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use Carbon\Carbon;

class StockController extends Controller
{ // Mostrar estado general del stock
    public function index()
    {
        $productos = Producto::all()->map(function ($producto) {
            $producto->estadoStock = $this->getEstadoStock($producto);
            return $producto;
        });

        return view('admin.stock.index', compact('productos'));
    }

    // Registrar entrada de stock
    public function entrada(Request $request, $idProducto)
    {
        $producto = Producto::findOrFail($idProducto);

        $request->validate([
            'cantidad' => 'required|integer|min:1',
        ]);

        $producto->stock += $request->cantidad;
        // Ajusta el stock inicial si quieres mantener un histórico de "stock inicial"
        if ($producto->stock_inicial < $producto->stock) {
            $producto->stock_inicial = $producto->stock;
        }

        $producto->save();

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
