<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    
    protected $table = 'DetallePedido';
    protected $primaryKey = 'idDetallePedido';
    public $timestamps = false;

    protected $fillable = [
        'idPedido',
        'idProducto',
        'cantidad',
        'subtotal'
    ];



    public function producto()
    {
        return $this->belongsTo(Producto::class, 'idProducto', 'idProducto');
    }
}
