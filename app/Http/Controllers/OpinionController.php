<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calificacion;
use Illuminate\Support\Facades\Auth;
class OpinionController extends Controller
{
    
    // Guardar la opinión del cliente
    public function store(Request $request)
    {
        

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string|max:500',
        ]);


        Calificacion::create([
            'ciUsuario' => Auth::user()->ciUsuario,
            'calificacion' => $request->rating,
            'comentario' => $request->comentario,
            'fecha' => now(),
        ]);

        return redirect()->back()->with('success', '¡Gracias por tu opinión!');
    }
}
