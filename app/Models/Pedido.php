<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'Pedido';
    protected $primaryKey = 'idPedido';

    protected $fillable = [
        'ciUsuario',
        'direccion',
        'estado',
        'total',
        'fechaCreacion'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'ciUsuario', 'ciUsuario');
    }

    public function venta()
    {
        return $this->hasOne(Venta::class, 'idPedido', 'idPedido');
    }

    public function detallePedidos()
    {
        return $this->hasMany(DetallePedido::class, 'idPedido', 'idPedido');
    }
}
