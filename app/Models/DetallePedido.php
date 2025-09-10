<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    protected $table = 'DetallePedido';
    protected $primaryKey = 'idDetallePedido';

    protected $fillable = [
        'idPedido',
        'idProducto',
        'cantidad',
        'subtotal'
    ];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'idPedido', 'idPedido');
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'idProducto', 'idProducto');
    }
}
