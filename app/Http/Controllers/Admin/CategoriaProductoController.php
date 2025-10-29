<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CategoriaProducto;
use App\Traits\Auditable;

class CategoriaProductoController extends Controller
{
      use Auditable; // si quieres logs

    // Listar categorías
public function index()
{
    $categorias = CategoriaProducto::all();
    return view('admin.productos.indexCategorias', compact('categorias'));
}

// Mostrar formulario para crear categoría
public function create()
{
    return view('admin.productos.crearCategoria');
}

    // Guardar categoría
    public function store(Request $request)
{
    $request->validate([
        'nombreCategoria' => 'required|string|max:100|unique:CategoriaProducto,nombreCategoria',
        'descripcion' => 'nullable|string|max:255', // ✅ agregado
    ]);

    $categoria = CategoriaProducto::create([
        'nombreCategoria' => $request->nombreCategoria,
        'descripcion' => $request->descripcion, // ✅ agregado
    ]);

    $this->logAction(
        "Se creó la categoría '{$categoria->nombreCategoria}' (ID: {$categoria->idCategoria})",
        'Categorías',
        'Exitoso'
    );

    return redirect()->route('categorias.index')->with('exito', 'Categoría creada correctamente.');
}


    // Eliminar categoría
    public function destroy($idCategoria)
    {
        $categoria = CategoriaProducto::findOrFail($idCategoria);
        $nombre = $categoria->nombreCategoria;
        $categoria->delete();

        $this->logAction(
            "Se eliminó la categoría '{$nombre}' (ID: {$idCategoria})",
            'Categorías',
            'Exitoso'
        );

        return redirect()->route('categorias.index')->with('exito', 'Categoría eliminada correctamente.');
    }
}
