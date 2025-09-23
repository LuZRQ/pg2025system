<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class RegisteredUserController extends Controller
{
    /**
     * Mostrar el formulario de registro
     */
    public function create()
    {
        return view('auth.register');
    }

    /**
     * Procesar el registro de un nuevo usuario
     */
    public function store(Request $request)
    {
        $request->validate([
            'ciUsuario' => 'nullable|string|size:8|unique:Usuario,ciUsuario',
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:60',
            'correo' => 'required|email|unique:Usuario,correo',
            'telefono' => 'nullable|string|max:8',
            'usuario' => 'required|string|max:50|unique:Usuario,usuario',
            'contrasena' => 'required|confirmed|min:6',
        ]);

        // Rol por defecto: Cliente
        $rolCliente = Rol::where('nombre', 'Cliente')->first();

        if (!$rolCliente) {
            abort(500, 'No se encontró el rol Cliente. Verifica la tabla roles.');
        }

        $usuario = Usuario::create([
            // si no mandan CI, se genera automáticamente
            'ciUsuario' => $request->ciUsuario ?? str_pad(rand(0, 99999999), 8, '0', STR_PAD_LEFT),
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
            'usuario' => $request->usuario,
            'contrasena' => Hash::make($request->contrasena),
            'rolId' => $rolCliente->idRol,
        ]);

        // iniciar sesión automáticamente
        Auth::login($usuario);

        // Redirigir a la página pública
        return redirect()->route('home')->with('exito', '¡Bienvenido a Garabato Café! Tu cuenta se creó exitosamente.');;
    }
}
