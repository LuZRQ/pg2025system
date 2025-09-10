<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

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
}
