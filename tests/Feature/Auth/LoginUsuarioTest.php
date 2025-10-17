<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\Usuario;
use App\Models\Rol;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

class LoginUsuarioTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function un_usuario_activo_puede_iniciar_sesion_y_redirige_segun_su_rol()
    {
        // 1️⃣ Crear un rol de prueba
        $rol = Rol::factory()->create(['nombre' => 'Cajero']);

        // 2️⃣ Crear usuario asociado a ese rol
        $usuario = Usuario::factory()->create([
            'ciUsuario'   => '12345678',
            'contrasena'  => Hash::make('12345678'),
            'estado'      => true,
            'idRol'       => $rol->idRol ?? $rol->id, // depende de tu nombre de PK
        ]);

        // 3️⃣ Enviar petición POST al login real (route('login'))
        $response = $this->post(route('login'), [
            'ci'         => '12345678',
            'contrasena' => '12345678',
        ]);

        // 4️⃣ Verificar redirección correcta (ajusta la ruta según tu app)
        $response->assertRedirect(route('ventas.index'));

        // 5️⃣ Verificar que el usuario está autenticado
        $this->assertAuthenticatedAs($usuario);
    }

    /** @test */
    public function un_usuario_con_contrasena_incorrecta_no_puede_iniciar_sesion()
    {
        $rol = Rol::factory()->create(['nombre' => 'Cajero']);
        $usuario = Usuario::factory()->create([
            'ciUsuario'   => '87654321',
            'contrasena'  => Hash::make('12345678'),
            'estado'      => true,
            'idRol'       => $rol->idRol ?? $rol->id,
        ]);

        $response = $this->from(route('login'))->post(route('login'), [
            'ci'         => '87654321',
            'contrasena' => 'wrongpassword',
        ]);

        $response->assertSessionHasErrors('ci');
        $this->assertGuest();
    }

    /** @test */
    public function un_usuario_inactivo_no_puede_iniciar_sesion()
    {
        $rol = Rol::factory()->create(['nombre' => 'Cajero']);
        $usuario = Usuario::factory()->create([
            'ciUsuario'   => '11122233',
            'contrasena'  => Hash::make('123456'),
            'estado'      => false,
            'idRol'       => $rol->idRol ?? $rol->id,
        ]);

        $response = $this->from(route('login'))->post(route('login'), [
            'ci'         => '11122233',
            'contrasena' => '123456',
        ]);

        $response->assertSessionHasErrors('ci');
        $this->assertGuest();
    }
}
