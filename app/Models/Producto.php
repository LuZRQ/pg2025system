<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'Producto';
    protected $primaryKey = 'idProducto';
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'stock_inicial',
        'estado', // nueva columna para stock inicial
        'categoriaId',
        'imagen',
        'vendidos_dia',
        'fecha_actualizacion_stock'
    ];

    // Relación con la categoría
    public function categoria()
    {
        return $this->belongsTo(CategoriaProducto::class, 'categoriaId', 'idCategoria');
    }
    // Scope para productos activos
    public function scopeActivos($query)
    {
        return $query->where('estado', 1);
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


    // ======================
    // 🔎 Nueva lógica unificada de stock
    // ======================
    public function getEstadoStock(): string
    {
        if ($this->stock <= 0) return 'rojo';       // agotado
        if ($this->stock < 5) return 'rojo';        // muy bajo
        if ($this->stock < 10) return 'amarillo';   // bajo
        return 'verde';
    }

    public function getEstadoStockNombre(): string
    {
        return match ($this->getEstadoStock()) {
            'rojo' => 'Crítico',
            'amarillo' => 'Bajo',
            'verde' => 'Disponible',
            default => 'Desconocido',
        };
    }
    // Descuenta stock si hay suficiente
    public function descontarStock(int $cantidad): bool
    {
        if ($this->stock < $cantidad) {
            return false;
        }

        $this->stock -= $cantidad;
        $this->vendidos_dia += $cantidad;
        $this->save();

        return true;
    }
}
