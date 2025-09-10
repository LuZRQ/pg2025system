<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\CategoriaProducto;

class PublicController extends Controller
{
    public function index()
    {
        $productos = Producto::with('categoria')->get();
        $categorias = CategoriaProducto::all();

        // Para el resumen de calificaciones, puedes calcular porcentajes como ejemplo
        $ratings = [
            ['label' => 'Excelente', 'value' => 50],
            ['label' => 'Bueno', 'value' => 30],
            ['label' => 'Regular', 'value' => 15],
            ['label' => 'Malo', 'value' => 5],
        ];

        return view('publico.index', compact('productos', 'categorias', 'ratings'));
    }
}
