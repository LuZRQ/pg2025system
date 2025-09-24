<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use App\Models\CategoriaProducto;

class ProductoController extends Controller
{

    public function index(Request $request)
    {
        $categorias = CategoriaProducto::all();

        $productos = Producto::with('categoria')
            ->when($request->search, function ($query) use ($request) {
                $query->where('nombre', 'like', "%{$request->search}%")
                    ->orWhere('descripcion', 'like', "%{$request->search}%");
            })
            ->when($request->categoria, function ($query) use ($request) {
                $query->where('categoriaId', $request->categoria);
            })
            ->when($request->estado !== null && $request->estado !== '', function ($query) use ($request) {
                $query->where('estado', $request->estado);
            })
            ->get();

        return view('admin.productos.index', compact('productos', 'categorias'));
    }

    public function crear()
    {
        $categorias = CategoriaProducto::all();
        return view('admin.productos.crear', compact('categorias'));
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoriaId' => 'required|exists:CategoriaProducto,idCategoria',
            'estado' => 'required|boolean', // <-- agregamos validación
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048', // valida imagen
        ]);

        if ($request->hasFile('imagen')) {
            $archivo = $request->file('imagen');
            $nombreArchivo = time() . '_' . $archivo->getClientOriginalName();
            $archivo->move(public_path('images'), $nombreArchivo);
            $request->merge(['imagen' => $nombreArchivo]);
        }

        Producto::create($request->all());

        return redirect()->route('productos.index')->with('exito', 'Producto creado correctamente.');
    }

    public function editar($idProducto)
    {
        $producto = Producto::findOrFail($idProducto);
        $categorias = CategoriaProducto::all();
        return view('admin.productos.editar', compact('producto', 'categorias'));
    }

    public function actualizar(Request $request, $idProducto)
    {
        $producto = Producto::findOrFail($idProducto);

        $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoriaId' => 'required|exists:CategoriaProducto,idCategoria',
            'estado' => 'required|boolean', // <-- agregamos validación
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $archivo = $request->file('imagen');
            $nombreArchivo = time() . '_' . $archivo->getClientOriginalName();
            $archivo->move(public_path('images'), $nombreArchivo);
            $request->merge(['imagen' => $nombreArchivo]);
        }

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
