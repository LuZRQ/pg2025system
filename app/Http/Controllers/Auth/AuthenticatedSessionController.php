<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return view('auth.login');
    }

    public function store(Request $request)
    {
        $request->validate([
            'ci' => 'required|string|exists:Usuario,ciUsuario',
            'contrasena' => 'required|string',
        ]);

        $key = Str::lower($request->input('ci')) . '|' . $request->ip();

        // Revisar si ya superó el límite
        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);
            throw ValidationException::withMessages([
                'ci' => "Demasiados intentos fallidos. Intenta en " . gmdate("H:i:s", $seconds),
            ]);
        }

        $usuario = Usuario::where('ciUsuario', $request->ci)->first();

        if (!$usuario || !Hash::check($request->contrasena, $usuario->contrasena)) {
            RateLimiter::hit($key, 10800); // cada error suma, bloqueo 3h (10800s)
            return back()->withErrors(['ci' => 'Credenciales inválidas']);
        }

        RateLimiter::clear($key); // si el login es correcto, reiniciamos contador

        Auth::login($usuario);

        // Redirección según rol
        switch ($usuario->rol->nombre) {
            case 'Dueno':
                return redirect()->route('usuarios.index');
            case 'Cajero':
                return redirect()->route('ventas.index');
            case 'Cocina':
                return redirect()->route('pedidos.index');
            case 'Mesero':
                return redirect()->route('ventas.index');
            case 'Cliente':
                return redirect()->route('home');
            default:
                Auth::logout();
                return redirect('/')->withErrors(['ci' => 'Rol no permitido']);
        }
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirigir a la página pública
        return redirect()->route('home');
    }
}
