<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerificarRolMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles  // Los roles permitidos
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $usuario = Auth::user();

        if (!$usuario) {
            return redirect('/ingresar')->withErrors(['auth' => 'Debes iniciar sesión primero']);
        }
/** @var \App\Models\Usuario $usuario */
        // Cargar la relación rol si no está cargada
        $usuario->loadMissing('rol');

        // Verificar el rol
        if (!$usuario->rol || !in_array($usuario->rol->nombre, $roles)) {
            return redirect('/')->withErrors(['auth' => 'No tienes permiso para acceder']);
        }

        return $next($request);
    }
}
