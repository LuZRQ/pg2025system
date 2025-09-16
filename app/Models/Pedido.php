<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'Pedido';
    protected $primaryKey = 'idPedido';
    public $timestamps = false; // porque usas fechaCreacion

    protected $fillable = [
        'ciUsuario',
        'mesa',        
        'comentarios',
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

    // 👇 renómbralo a "detalles" para usarlo más natural
    public function detalles()
    {
        return $this->hasMany(DetallePedido::class, 'idPedido', 'idPedido');
    }
}
