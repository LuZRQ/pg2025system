<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Activitylog\Models\Activity;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Usuario;

class AuditoriaController extends Controller
{
    // ====== Mostrar tabla de logs ======
    public function index()
    {
        $logs = Activity::with('causer') // causer = usuario que hizo la acción
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return view('admin.auditoria.index', compact('logs'))
         ->with('title', 'Gestión de Auditoría y credenciales');
    }

    // ====== Cambiar contraseña ======
    public function cambiarContrasena(Request $request)
    {

        $request->validate([
            'contrasena_actual' => 'required|string',
            'nueva_contrasena' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&]/',
                'confirmed',
            ],
        ], [
            'nueva_contrasena.required' => 'La nueva contraseña es obligatoria',
            'nueva_contrasena.min' => 'La nueva contraseña debe tener al menos 8 caracteres',
            'nueva_contrasena.regex' => 'La nueva contraseña debe contener al menos una mayúscula, un número y un símbolo',
            'nueva_contrasena.confirmed' => 'La confirmación de la contraseña no coincide',
        ]);


        $usuario = Auth::user();

        // 🚨 Verificar contraseña actual
        if (!Hash::check($request->contrasena_actual, $usuario->contrasena)) {
            activity('sistema')
                ->causedBy($usuario)
                ->withProperties([
                    'ip_origen' => $request->ip(),
                    'modulo' => 'Gestión de Contraseñas',
                    'estado' => 'Fallido',
                ])
                ->event('password-change-failed')
                ->log("Intento fallido de cambio de contraseña (contraseña actual incorrecta)");

            return back()->withErrors(['contrasena_actual' => 'La contraseña actual no es correcta']);
        }

        // ✅ Guardar nueva contraseña
        $usuario->contrasena = Hash::make($request->nueva_contrasena);
        $usuario->save();

        // 🔒 Registrar auditoría
        activity('sistema')
            ->causedBy($usuario)
            ->withProperties([
                'ip_origen' => $request->ip(),
                'modulo' => 'Gestión de Contraseñas',
                'estado' => 'Exitoso',
            ])
            ->event('password-changed')
            ->log("El usuario {$usuario->nombre} {$usuario->apellido} cambió su contraseña correctamente");

        return back()->with('exito', 'Contraseña actualizada correctamente ✅');
    }

    public function exportPDF()
    {
        $logs = Activity::with('causer')->orderBy('created_at', 'desc')->get();

        $pdf = Pdf::loadView('admin.auditoria.pdf', compact('logs'));

        $fecha = now()->toDateString();
        $nombreArchivo = 'logs_auditoria_' . $fecha . '.pdf';

        return $pdf->download($nombreArchivo);
    }
}
