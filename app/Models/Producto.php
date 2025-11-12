<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    protected $table = 'Producto';
    protected $primaryKey = 'idProducto';
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'stock_inicial',
        'estado',
        'categoriaId',
        'imagen',
        'vendidos_dia',
        'fecha_actualizacion_stock'
    ];

    public function categoria()
    {
        return $this->belongsTo(CategoriaProducto::class, 'categoriaId', 'idCategoria');
    }

    public function scopeActivos($query)
    {
        return $query->where('estado', 1);
    }

    public function detallePedidos()
    {
        return $this->hasMany(DetallePedido::class, 'idProducto', 'idProducto');
    }

    public function variantes()
    {
        return $this->hasMany(ProductoVariante::class, 'productoId', 'idProducto');
    }

    public function getVendidosAttribute()
    {
        return $this->stock_inicial - $this->stock;
    }

    public function getRestanteAttribute()
{
    return $this->stock_inicial; // restante = stock inicial
}

    public function getEstadoStock(): string
    {
        if ($this->stock <= 0) {
            return 'rojo'; // sin stock
        } elseif ($this->stock < 5) {
            return 'rojo'; // crítico
        } elseif ($this->stock < 10) {
            return 'amarillo'; // bajo
        } else {
            return 'verde'; // suficiente
        }
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

    /**
     * Descontar stock del producto o de una variante
     *
     * @param int $cantidad
     * @param int|null $varianteId
     * @return bool
     */
    public function descontarStock(int $cantidad, ?int $varianteId = null): bool
{
    if ($varianteId) {
        // 🔹 Descontar stock en una variante
        $variante = $this->variantes()->find($varianteId);
        if (!$variante || $variante->stock < $cantidad) {
            return false;
        }

        // Descontar del stock restante de la variante
        $variante->stock -= $cantidad;

        // Actualizar vendidos del día (si lo manejas)
        $variante->vendidos_dia = ($variante->stock_inicial ?? 0) - $variante->stock;
        $variante->save();

        // Actualizar stock restante del producto base (suma de todas las variantes)
        $this->stock_inicial = $this->variantes()->sum('stock');
        $this->vendidos_dia = $this->stock - $this->stock_inicial;
        $this->save();

        return true;
    }

    // 🔹 Sin variante: producto simple
    if ($this->stock_inicial < $cantidad) {
        return false;
    }

    // Descontar del stock restante
    $this->stock_inicial -= $cantidad;

    // Actualizar vendidos
    $this->vendidos_dia = $this->stock - $this->stock_inicial;
    $this->save();

    return true;
}

public function resetStockDiario()
{
    if ($this->fecha_actualizacion_stock != now()->toDateString()) {

        // Producto base
        $this->vendidos_dia = 0;
        $this->stock_inicial = $this->stock; // stock vuelve al valor inicial
        $this->fecha_actualizacion_stock = now()->toDateString();
        $this->save();

        // Variantes
        foreach ($this->variantes as $variante) {
            $variante->vendidos_dia = 0;
            $variante->stock = $variante->stock_inicial;
            $variante->save();
        }
    }
}


}
