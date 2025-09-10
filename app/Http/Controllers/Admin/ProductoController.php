<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use App\Models\CategoriaProducto;
class ProductoController extends Controller
{
    
    public function index()
    {
        $productos = Producto::with('categoria')->get();
        return view('admin.productos.index', compact('productos'));
    }

    // Formulario crear producto
    public function crear()
    {
        $categorias = CategoriaProducto::all();
        return view('admin.productos.crear', compact('categorias'));
    }

    // Guardar nuevo producto
    public function guardar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoriaId' => 'required|exists:CategoriaProducto,idCategoria',
        ]);

        Producto::create($request->all());

        return redirect()->route('productos.index')->with('exito', 'Producto creado correctamente.');
    }

    // Formulario editar producto
    public function editar($idProducto)
    {
        $producto = Producto::findOrFail($idProducto);
        $categorias = CategoriaProducto::all();
        return view('admin.productos.editar', compact('producto', 'categorias'));
    }

    // Actualizar producto
    public function actualizar(Request $request, $idProducto)
    {
        $producto = Producto::findOrFail($idProducto);

        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoriaId' => 'required|exists:CategoriaProducto,idCategoria',
        ]);

        $producto->update($request->all());

        return redirect()->route('productos.index')->with('exito', 'Producto actualizado correctamente.');
    }

    // Eliminar producto
    public function eliminar($idProducto)
    {
        $producto = Producto::findOrFail($idProducto);
        $producto->delete();

        return redirect()->route('productos.index')->with('exito', 'Producto eliminado correctamente.');
    }

    public function ver($idProducto)
{
    $producto = Producto::with('categoria')->findOrFail($idProducto);
    return view('admin.productos.ver', compact('producto'));
}

}
