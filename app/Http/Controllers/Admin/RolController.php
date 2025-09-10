<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rol;

class RolController extends Controller
{
     public function index()
    {
        $roles = Rol::all();
        return view('admin.roles.index', compact('roles'));
    }

    public function crear()
    {
        return view('admin.roles.crear');
    }

    public function guardar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:50',
            'descripcion' => 'nullable|string|max:255'
        ]);

        Rol::create($request->all());

        return redirect()->route('roles.index')->with('exito', 'Rol creado correctamente.');
    }

    public function editar($idRol)
    {
        $rol = Rol::findOrFail($idRol);
        return view('admin.roles.editar', compact('rol'));
    }

    public function actualizar(Request $request, $idRol)
    {
        $rol = Rol::findOrFail($idRol);

        $request->validate([
            'nombre' => 'required|string|max:50',
            'descripcion' => 'nullable|string|max:255'
        ]);

        $rol->update($request->all());

        return redirect()->route('roles.index')->with('exito', 'Rol actualizado correctamente.');
    }

    public function eliminar($idRol)
    {
        $rol = Rol::findOrFail($idRol);
        $rol->delete();

        return redirect()->route('roles.index')->with('exito', 'Rol eliminado correctamente.');
    }
}
