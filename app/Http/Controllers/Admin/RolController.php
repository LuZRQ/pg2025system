<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rol;
use App\Models\Modulo;

class RolController extends Controller
{
    public function index()
    {
        $roles = Rol::all();
        return view('admin.roles.index', compact('roles'));
    }

    public function crear()
    {

        $modulos = Modulo::all();
        return view('admin.roles.crear', compact('modulos'));
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:50',
            'descripcion' => 'nullable|string|max:255',
            'modulos' => 'array', // ids de módulos
        ]);

        $rol = Rol::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
        ]);

        if ($request->has('modulos')) {
            $rol->modulos()->sync($request->modulos);
        }

        return redirect()->route('roles.index')->with('exito', 'Rol creado correctamente.');
    }


    public function editar($idRol)
    {
        $rol = Rol::with('modulos')->findOrFail($idRol);
        $modulos = Modulo::all(); // Todos los módulos disponibles
        return view('admin.roles.editar', compact('rol', 'modulos'));
    }

    public function actualizar(Request $request, $idRol)
    {
        $rol = Rol::findOrFail($idRol);

        $request->validate([
            'nombre' => 'required|string|max:50',
            'descripcion' => 'nullable|string|max:255',
            'modulos' => 'array', // ids de módulos
        ]);

        $rol->update([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
        ]);

        // Actualizamos los módulos asignados al rol
        if ($request->has('modulos')) {
            $rol->modulos()->sync($request->modulos);
        } else {
            $rol->modulos()->sync([]); // Si no se envía nada, desasigna todos
        }

        return redirect()->route('roles.index')->with('exito', 'Rol actualizado correctamente.');
    }


    public function eliminar($idRol)
    {
        $rol = Rol::findOrFail($idRol);
        $rol->delete();

        return redirect()->route('roles.index')->with('exito', 'Rol eliminado correctamente.');
    }
}
