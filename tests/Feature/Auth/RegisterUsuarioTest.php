<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\Usuario;
use App\Models\Rol;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Framework\Attributes\Test;

class RegisterUsuarioTest extends TestCase
{
    use RefreshDatabase;
/**
     * Verifica que un usuario cliente pueda registrarse correctamente,
     * almacenando datos válidos, encriptando la contraseña y autenticándolo tras el registro.
     */
    #[Test]
    public function un_usuario_cliente_puede_registrarse_correctamente(): void
    {
        $rolCliente = Rol::factory()->create(['nombre' => 'Cliente']);
        $response = $this->post(route('register'), [
            'ciUsuario'              => '99988877',
            'nombre'                 => 'Pedro',
            'apellido'               => 'López',
            'correo'                 => 'pedro@example.com',
            'telefono'               => '77777777',
            'usuario'                => 'pedro123',
            'contrasena'             => 'mypassword',
            'contrasena_confirmation'=> 'mypassword',
        ]);
        $this->assertDatabaseHas('Usuario', [
            'ciUsuario' => '99988877',
            'nombre'    => 'Pedro',
            'correo'    => 'pedro@example.com',
            'rolId'     => $rolCliente->idRol,
        ]);
        $usuario = Usuario::where('correo', 'pedro@example.com')->first();
        $this->assertTrue(Hash::check('mypassword', $usuario->contrasena));
        $response->assertRedirect(route('home'));
        $this->assertAuthenticatedAs($usuario);
    }
  /**
     * Comprueba que el sistema no permita registrar un usuario
     * cuando el número de CI ya se encuentra registrado en la base de datos.
     */
    #[Test]
    public function no_puede_registrarse_con_ci_duplicado(): void
    {
        $rolCliente = Rol::factory()->create(['nombre' => 'Cliente']);
        Usuario::factory()->create([
            'ciUsuario' => '55566677',
            'correo'    => 'cliente1@example.com',
            'usuario'   => 'user1',
            'rolId'     => $rolCliente->idRol,
        ]);
        $response = $this->from(route('register'))->post(route('register'), [
            'ciUsuario'              => '55566677', 
            'nombre'                 => 'Carlos',
            'apellido'               => 'Pérez',
            'correo'                 => 'carlos@example.com',
            'telefono'               => '77777777',
            'usuario'                => 'carlos123',
            'contrasena'             => '123456',
            'contrasena_confirmation'=> '123456',
        ]);
        $response->assertSessionHasErrors('ciUsuario');
        $this->assertGuest();
    }
/**
     * Verifica que no sea posible registrar un usuario
     * cuando el correo electrónico ya existe en el sistema.
     */
    #[Test]
    public function no_puede_registrarse_con_correo_duplicado(): void
    {
        $rolCliente = Rol::factory()->create(['nombre' => 'Cliente']);
        Usuario::factory()->create([
            'correo'  => 'cliente1@example.com',
            'rolId'   => $rolCliente->idRol,
        ]);
        $response = $this->from(route('register'))->post(route('register'), [
            'ciUsuario'              => '11122233',
            'nombre'                 => 'Juan',
            'apellido'               => 'Mamani',
            'correo'                 => 'cliente1@example.com', // repetido
            'telefono'               => '77777777',
            'usuario'                => 'juanito',
            'contrasena'             => 'mypassword',
            'contrasena_confirmation'=> 'mypassword',
        ]);
        $response->assertSessionHasErrors('correo');
        $this->assertGuest();
    }
}
