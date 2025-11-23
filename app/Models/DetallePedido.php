<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    use HasFactory;
    protected $table = 'DetallePedido';
    protected $primaryKey = 'idDetallePedido';
    public $timestamps = false;

    protected $fillable = [
        'idPedido',
        'idProducto',
        'variante_id',
        'cantidad',
        'subtotal',
        'estado',
        'es_nuevo',
         'comentarios', 
    ];
    protected $casts = [
        'es_nuevo' => 'boolean',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'idProducto', 'idProducto');
    }
    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'idPedido', 'idPedido');
    }

    public function variante()
    {
        return $this->belongsTo(ProductoVariante::class, 'variante_id', 'idVariante'); // 👈 relación correcta
    }
}
