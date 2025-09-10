<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
 
    protected $table = 'Modulo';
    protected $primaryKey = 'idModulo';

    protected $fillable = ['nombre', 'descripcion'];

    public function roles()
    {
        return $this->belongsToMany(
            Rol::class,      // modelo relacionado
            'modulo_rol',    // tabla pivote
            'modulo_id',     // FK de este modelo en la tabla pivote
            'rol_id'         // FK del modelo relacionado en la tabla pivote
        )->withTimestamps(); // para tener created_at y updated_at
    }
}
