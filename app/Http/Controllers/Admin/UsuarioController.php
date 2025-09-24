<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\Rol;
use App\Models\Modulo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = Usuario::with('rol')
            ->when($request->search, function ($query) use ($request) {
                $query->where('nombre', 'like', "%{$request->search}%")
                    ->orWhere('apellido', 'like', "%{$request->search}%")
                    ->orWhere('usuario', 'like', "%{$request->search}%")
                    ->orWhere('correo', 'like', "%{$request->search}%");
            })
            ->when($request->filled('estado'), function ($query) use ($request) {
                $query->where('estado', $request->estado);
            })
            ->get();

        $roles = Rol::all();
        $modulos = Modulo::with('roles')->get();

        return view('admin.usuarios.index', compact('usuarios', 'roles', 'modulos'));
    }

    public function crear()
    {
        $roles = Rol::all();
        return view('admin.usuarios.crear', compact('roles'));
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'ciUsuario'   => 'required|string|max:8|unique:Usuario,ciUsuario',
            'nombre'      => 'required|string|max:50',
            'apellido'    => 'required|string|max:60',
            'correo'      => 'required|email|unique:Usuario,correo',
            'telefono'    => 'nullable|string|max:8',
            'usuario'     => 'required|string|max:50|unique:Usuario,usuario',
            'contrasena'  => 'required|string|min:6',
            'rolId'       => 'required|exists:Rol,idRol',
            'estado'      => 'required|boolean',
        ]);

        Usuario::create([
            'ciUsuario'   => $request->ciUsuario,
            'nombre'      => $request->nombre,
            'apellido'    => $request->apellido,
            'correo'      => $request->correo,
            'telefono'    => $request->telefono,
            'usuario'     => $request->usuario,
            'contrasena'  => Hash::make($request->contrasena),
            'rolId'       => $request->rolId,
            'estado'      => $request->estado ?? 1,
        ]);

        return redirect()->route('usuarios.index')->with('exito', 'Usuario creado correctamente.');
    }

    public function mostrar($ciUsuario)
    {
        $usuario = Usuario::findOrFail($ciUsuario);
        return view('admin.usuarios.mostrar', compact('usuario'));
    }

    public function editar($ciUsuario)
    {
        $usuario = Usuario::findOrFail($ciUsuario);
        $roles = Rol::all();
        return view('admin.usuarios.editar', compact('usuario', 'roles'));
    }

    public function actualizar(Request $request, $ciUsuario)
    {
        $usuario = Usuario::findOrFail($ciUsuario);

        $request->validate([
            'nombre'      => 'required|string|max:50',
            'apellido'    => 'required|string|max:60',
            'correo'      => 'required|email|unique:Usuario,correo,' . $ciUsuario . ',ciUsuario',
            'telefono'    => 'nullable|string|max:8',
            'usuario'     => 'required|string|max:50|unique:Usuario,usuario,' . $ciUsuario . ',ciUsuario',
            'rolId'       => 'required|exists:Rol,idRol',
            'estado'      => 'required|boolean',
        ]);

        $datos = $request->all();

        if ($request->filled('contrasena')) {
            $datos['contrasena'] = Hash::make($request->contrasena);
        } else {
            unset($datos['contrasena']);
        }
        $usuario->update($datos);

        return redirect()->route('usuarios.index')->with('exito', 'Usuario actualizado correctamente.');
    }

    public function eliminar($ciUsuario)
    {
        $usuario = Usuario::findOrFail($ciUsuario);
        $usuario->delete();

        return redirect()->route('usuarios.index')->with('exito', 'Usuario eliminado correctamente.');
    }
}
