<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rol;
use App\Models\Modulo;
use App\Traits\Auditable;

class RolController extends Controller
{
    use Auditable;
    public function index()
    {
        $roles = Rol::all();
        return view('admin.roles.index', compact('roles'))
            ->with('title', 'Control de roles');
    }

    public function crear()
    {

        $modulos = Modulo::all();
        return view('admin.roles.crear', compact('modulos'));
    }
public function guardar(Request $request)
{
    $request->validate([
        'nombre' => 'required|string|max:50|unique:Rol,nombre',
        'descripcion' => 'nullable|string|max:255',
        'modulos' => 'array',
        'modulos.*' => 'exists:Modulo,idModulo',
    ], [
        'nombre.required' => 'El nombre del rol es obligatorio',
        'nombre.unique' => 'Ya existe un rol con este nombre',
        'nombre.max' => 'El nombre no puede superar los 50 caracteres',
        'modulos.*.exists' => 'El módulo seleccionado no es válido',
    ]);

    // Crear el rol
    $rol = Rol::create([
        'nombre' => $request->nombre,
        'descripcion' => $request->descripcion,
    ]);

    // Relacionar módulos si se envían en la solicitud
    if ($request->has('modulos')) {
        $rol->modulos()->sync($request->modulos); // Sincroniza los módulos
    }

    // Loguear la acción
    $this->logAction(
        "Se creó el rol '{$rol->nombre}' (ID: {$rol->idRol})",
        'Roles',
        'Exitoso'
    );

    return redirect()->route('roles.index')->with('exito', 'Rol creado correctamente.');
}

public function editar($idRol)
{
    // Buscar el rol y sus módulos relacionados
    $rol = Rol::with('modulos')->findOrFail($idRol);
    $modulos = Modulo::all();  // Obtén todos los módulos disponibles
    return view('admin.roles.editar', compact('rol', 'modulos'));
}

public function actualizar(Request $request, $idRol)
{
    $rol = Rol::findOrFail($idRol);

    // Validación de los datos
    $request->validate([
        'nombre' => 'required|string|max:50|unique:Rol,nombre,' . $rol->idRol . ',idRol',
        'descripcion' => 'nullable|string|max:255',
        'modulos' => 'array',
        'modulos.*' => 'exists:Modulo,idModulo',
    ], [
        'nombre.required' => 'El nombre del rol es obligatorio',
        'nombre.unique' => 'Ya existe un rol con este nombre',
        'nombre.max' => 'El nombre no puede superar los 50 caracteres',
        'modulos.*.exists' => 'El módulo seleccionado no es válido',
    ]);

    // Actualizar el rol con los nuevos datos
    $rol->update([
        'nombre' => $request->nombre,
        'descripcion' => $request->descripcion,
    ]);

    // Relacionar los módulos si se han enviado, de lo contrario desasociar todos
    if ($request->has('modulos')) {
        $rol->modulos()->sync($request->modulos);
    } else {
        $rol->modulos()->sync([]); // Desasociar todos los módulos si no se envían
    }

    // Loguear la acción
    $this->logAction(
        "Se actualizó el rol '{$rol->nombre}' (ID: {$rol->idRol})",
        'Roles',
        'Exitoso'
    );

    return redirect()->route('roles.index')->with('exito', 'Rol actualizado correctamente.');
}

public function eliminar($idRol)
{
    $rol = Rol::findOrFail($idRol);
    $rol->delete();

    // Loguear la acción
    $this->logAction(
        "Se eliminó el rol '{$rol->nombre}' (ID: {$rol->idRol})",
        'Roles',
        'Exitoso'
    );

    return redirect()->route('roles.index')->with('exito', 'Rol eliminado correctamente.');
}

}
