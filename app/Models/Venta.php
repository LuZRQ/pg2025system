<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $table = 'Venta';
    protected $primaryKey = 'idVenta';
    public $timestamps = false;

    protected $fillable = [
        'idPedido',
        'montoTotal',
        'fechaPago'
    ];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'idPedido', 'idPedido');
    }
}
