<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\CategoriaProducto;
use App\Models\Calificacion;
use Illuminate\Support\Facades\Auth;

class PublicController extends Controller
{

    public function index()
    {
        // Solo productos activos para la página pública
        $productos = Producto::activos()->with('categoria')->get();
        $categorias = CategoriaProducto::all();

        // Opiniones recientes (últimas 5)
        $opiniones = Calificacion::with('usuario')
            ->orderBy('fecha', 'desc')
            ->take(5)
            ->get();

        // Resumen de calificaciones
        $total = Calificacion::count();
        $ratings = [];
        if ($total > 0) {
            $ratings = [
                [
                    'label' => 'Excelente',
                    'value' => round((Calificacion::where('calificacion', 5)->count() / $total) * 100)
                ],
                [
                    'label' => 'Bueno',
                    'value' => round((Calificacion::where('calificacion', 4)->count() / $total) * 100)
                ],
                [
                    'label' => 'Regular',
                    'value' => round((Calificacion::where('calificacion', 3)->count() / $total) * 100)
                ],
                [
                    'label' => 'Malo',
                    'value' => round((Calificacion::where('calificacion', '<=', 2)->count() / $total) * 100)
                ],
            ];
        }
        // Revisar si el usuario ya opinó
        $usuario = Auth::user(); // null si es visitante
        $yaOpino = null;
        if ($usuario) {
            $yaOpino = Calificacion::where('ciUsuario', $usuario->ciUsuario)->first();
        }

        return view('publico.index', compact('productos', 'categorias', 'ratings', 'opiniones', 'usuario', 'yaOpino'));
    }
}
