<?php

/**
 * @property string $ciUsuario
 * @property string $nombre
 * @property string $apellido
 * @property string $correo
 * @property string $telefono
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Rol;

class Usuario extends Authenticatable
{
    use Notifiable;

    public $timestamps = false;

    protected $table = 'Usuario';
    protected $primaryKey = 'ciUsuario';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'ciUsuario',
        'nombre',
        'apellido',
        'correo',
        'telefono',
        'usuario',
        'contrasena',
        'estado',
        'fechaRegistro',
        'rolId'
    ];

    protected $hidden = [
        'contrasena',
        'remember_token',
    ];

    public function getAuthPassword()
    {
        return $this->contrasena; // Laravel usará este campo al hacer login
    }

    public function getAuthIdentifierName()
    {
        return 'ciUsuario'; // en vez de 'email'
    }

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'rolId', 'idRol');
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'ciUsuario', 'ciUsuario');
    }

    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'ciUsuario', 'ciUsuario');
    }

    public function auditorias()
    {
        return $this->hasMany(Auditoria::class, 'ciUsuario', 'ciUsuario');
    }
    public function esDueno()
    {
        return $this->rol->nombre === 'Dueno';
    }
    public function esCajero()
    {
        return $this->rol->nombre === 'Cajero';
    }
    public function esCocinero()
    {
        return $this->rol->nombre === 'Cocina';
    }
    public function esMesero()
    {
        return $this->rol->nombre === 'Mesero';
    }
    public function esCliente()
    {
        return $this->rol->nombre === 'Cliente';
    }
}
