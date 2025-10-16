<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Auditoria;
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
        $key = Str::lower($request->input('ci')) . '|' . $request->ip();

        // Verificar si está bloqueado
        if (RateLimiter::tooManyAttempts($key, 3)) {
            throw ValidationException::withMessages([
                'ci' => "Demasiados intentos fallidos 🙂",
            ]);
        }

        // Sanitizar inputs
        $request->merge([
            'ci' => strip_tags($request->input('ci')),
            'contrasena' => strip_tags($request->input('contrasena')),
        ]);

        // Validación
        $request->validate([
            'ci' => 'required|string|max:8|exists:Usuario,ciUsuario',
            'contrasena' => 'required|string|max:20',
            'g-recaptcha-response' => RateLimiter::attempts($key) >= 3 ? 'required|captcha' : '',
        ], [
            'ci.exists' => 'El CI ingresado no es válido',
            'g-recaptcha-response.required' => 'Debes completar la verificación CAPTCHA',
            'g-recaptcha-response.captcha' => 'Error en la verificación CAPTCHA',
        ]);

        // Buscar usuario
        $usuario = Usuario::where('ciUsuario', $request->ci)->first();

        // Verificar credenciales
        if (!$usuario || !Hash::check($request->contrasena, $usuario->contrasena)) {
            RateLimiter::hit($key, 3600); // Bloqueo 1 hora

            // Registrar intento fallido en Auditoria
            Auditoria::create([
                'ciUsuario' => $request->ci,
                'accion' => 'Intento de login fallido',
                'fechaHora' => now(),
                'ipOrigen' => $request->ip(),
                'modulo' => 'Login',
            ]);

            return back()->withErrors(['ci' => 'Credenciales inválidas']);
        }

        // Verificar estado
        if (!$usuario->estado) {
            return back()->withErrors(['ci' => 'Tu cuenta está inactiva, no puedes acceder.']);
        }

        // Login correcto
        RateLimiter::clear($key);
        Auth::login($usuario);

        // Registrar login exitoso en Auditoria
        Auditoria::create([
            'ciUsuario' => $usuario->ciUsuario,
            'accion' => 'Login exitoso',
            'fechaHora' => now(),
            'ipOrigen' => $request->ip(),
            'modulo' => 'Login',
        ]);

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
