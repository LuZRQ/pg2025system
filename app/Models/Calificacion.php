<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calificacion extends Model
{
   protected $table = 'Calificacion';
    protected $primaryKey = 'idCalificacion';

    protected $fillable = [
        'ciUsuario',
        'calificacion',
        'comentario',
        'fecha'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'ciUsuario', 'ciUsuario');
    }
}
