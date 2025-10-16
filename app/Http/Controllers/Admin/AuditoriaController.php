<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Activitylog\Models\Activity;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Usuario;

/**
 * @method \Illuminate\Routing\MiddlewareRegistrar middleware($middleware, array $options = [])
 */
class AuditoriaController extends Controller
{
    public function __construct()
    {
        // Limitar a 5 intentos por minuto el cambio de contraseña
       // $this->middleware('throttle:5,1')->only('cambiarContrasena');
    }

    // ====== Mostrar tabla de logs ======
    public function index()
    {
        $logs = Activity::with('causer')
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
        /** @var \App\Models\Usuario $usuario */
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
