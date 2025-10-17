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
            Rol::class,
            'modulo_rol',
            'modulo_id',
            'rol_id'
        )->withTimestamps();
    }
}
