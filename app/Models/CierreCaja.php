<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class CierreCaja extends Model
{
    use HasFactory;

    protected $table = 'CierreCaja'; // tu tabla camelCase
    protected $primaryKey = 'idCierre';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'ciUsuario',
        'fondo_inicial',
        'total_efectivo',
        'total_tarjeta',
        'total_qr',
        'total_caja',
        'fecha_apertura',
        'fecha_cierre',
        'observaciones'
    ];

    // Relación con Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'ciUsuario', 'ciUsuario');
    }
}
