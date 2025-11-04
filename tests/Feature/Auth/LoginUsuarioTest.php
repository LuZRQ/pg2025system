<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\Usuario;
use App\Models\Rol;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Framework\Attributes\Test;

class LoginUsuarioTest extends TestCase
{
    use RefreshDatabase;
/**
     * Prueba que un usuario activo con credenciales correctas
     * pueda iniciar sesión y que el sistema redirija según su rol.
     * En este caso, se comprueba que el rol "Cajero" ingresa al módulo de ventas.
     */
    #[Test]
    public function un_usuario_activo_puede_iniciar_sesion_y_redirige_segun_su_rol(): void
    {
        $rol = Rol::factory()->create(['nombre' => 'Cajero']);

        $usuario = Usuario::factory()->create([
            'ciUsuario'  => '12345678',
            'contrasena' => Hash::make('12345678'),
            'estado'     => true,
            'rolId'      => $rol->idRol,
        ]);

        $response = $this->post(route('login'), [
            'ci'         => '12345678',
            'contrasena' => '12345678',
        ]);

        $response->assertRedirect(route('ventas.index'));
        $this->assertAuthenticatedAs($usuario);
    }
/**
     * Prueba que si la contraseña ingresada es incorrecta,
     * el inicio de sesión falla, se retorna un error en la sesión
     * y no se autenticará al usuario.
     */
    #[Test]
    public function un_usuario_con_contrasena_incorrecta_no_puede_iniciar_sesion(): void
    {
        $rol = Rol::factory()->create(['nombre' => 'Cajero']);

        $usuario = Usuario::factory()->create([
            'ciUsuario'  => '87654321',
            'contrasena' => Hash::make('12345678'),
            'estado'     => true,
            'rolId'      => $rol->idRol,
        ]);

        $response = $this->from(route('login'))->post(route('login'), [
            'ci'         => '87654321',
            'contrasena' => 'wrongpassword',
        ]);

        $response->assertSessionHasErrors('ci');
        $this->assertGuest();
    }
/**
     * Prueba que un usuario marcado como inactivo
     * (estado = false) no pueda iniciar sesión aunque sus
     * credenciales sean correctas.
     */
    #[Test]
    public function un_usuario_inactivo_no_puede_iniciar_sesion(): void
    {
        $rol = Rol::factory()->create(['nombre' => 'Cajero']);

        $usuario = Usuario::factory()->create([
            'ciUsuario'  => '11122233',
            'contrasena' => Hash::make('123456'),
            'estado'     => false,
            'rolId'      => $rol->idRol,
        ]);

        $response = $this->from(route('login'))->post(route('login'), [
            'ci'         => '11122233',
            'contrasena' => '123456',
        ]);

        $response->assertSessionHasErrors('ci');
        $this->assertGuest();
    }
}
