<?php

namespace Tests\Feature\Admin\PermisosRoles;

use Tests\TestCase;
use App\Models\Usuario;
use App\Models\Rol;
use App\Models\Modulo;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AccesoUsuariosTest extends TestCase
{
    use RefreshDatabase;
/**
     * Prueba que únicamente el usuario con rol "Dueño" pueda acceder 
     * al módulo de gestión de usuarios y roles.
     * El resto de roles del sistema deben recibir una respuesta 403,
     * garantizando el control de accesos basado en permisos.
     */
    #[\PHPUnit\Framework\Attributes\Test]
    public function solo_dueno_puede_acceder_al_modulo_usuarios()
    {
        $rolDueno = Rol::factory()->create([
            'nombre' => 'Dueno',
            'descripcion' => 'Acceso completo al sistema',
        ]);
// Se registra el módulo de Usuarios y Roles y se asigna al Dueño
        $moduloUsuarios = Modulo::factory()->create([
            'nombre' => 'Usuarios y Roles',
            'ruta' => 'usuarios.index', 
        ]);


        $moduloUsuarios->roles()->attach($rolDueno->idRol);
// Se crea un usuario Dueño y se verifica acceso correcto (200)
        /** @var \App\Models\Usuario $usuarioDueno */
        $usuarioDueno = Usuario::factory()->create([
            'rolId' => $rolDueno->idRol,
        ]);
        $this->actingAs($usuarioDueno)
            ->get(route('usuarios.index'))
            ->assertStatus(200);

        $otrosRoles = ['Cajero', 'Cocina', 'Mesero', 'Cliente'];

        foreach ($otrosRoles as $rolNombre) {
            $rol = Rol::factory()->create([
                'nombre' => $rolNombre,
                'descripcion' => 'Rol de prueba',
            ]);

            $usuario = Usuario::factory()->create([
                'rolId' => $rol->idRol,
            ]);
            /** @var Usuario $usuario */
            $this->actingAs($usuario)
                ->get(route('usuarios.index'))
                ->assertStatus(403);
        }
    }
}
