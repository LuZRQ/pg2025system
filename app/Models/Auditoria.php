<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auditoria extends Model
{
    protected $table = 'Auditoria';
    protected $primaryKey = 'idAuditoria';

    protected $fillable = [
        'accion',
        'fechaHora',
        'ciUsuario',
        'ipOrigen',
        'modulo'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'ciUsuario', 'ciUsuario');
    }
}
