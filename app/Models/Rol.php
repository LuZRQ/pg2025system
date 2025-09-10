<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'Rol';
    protected $primaryKey = 'idRol';

    protected $fillable = [
        'nombre',
        'descripcion'
    ];

    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'rolId', 'idRol');
    }


    public function modulos()
    {
        return $this->belongsToMany(
            Modulo::class,   // modelo relacionado
            'modulo_rol',    // tabla pivote
            'rol_id',        // FK de este modelo en la tabla pivote
            'modulo_id'      // FK del modelo relacionado en la tabla pivote
        )->withTimestamps();
    }
    public function getColorAttribute()
    {
        return match ($this->nombre) {
            'Dueno' => 'bg-purple-500 text-white',
            'Cajero' => 'bg-green-500 text-white',
            'Cocina' => 'bg-red-500 text-white',
            default => 'bg-gray-100 text-gray-800',
        };
    }
}
