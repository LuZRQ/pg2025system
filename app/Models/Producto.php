<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
      protected $table = 'Producto';
    protected $primaryKey = 'idProducto';

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'stock_inicial', // nueva columna para stock inicial
        'categoriaId'
    ];

    // Relación con la categoría
    public function categoria()
    {
        return $this->belongsTo(CategoriaProducto::class, 'categoriaId', 'idCategoria');
    }

    // Relación con detalle de pedidos (si usas)
    public function detallePedidos()
    {
        return $this->hasMany(DetallePedido::class, 'idProducto', 'idProducto');
    }

    // Stock vendido (calculado)
    public function getVendidosAttribute()
    {
        return $this->stock_inicial - $this->stock;
    }

    // Stock restante (igual a stock actual)
    public function getRestanteAttribute()
    {
        return $this->stock;
    }
}
