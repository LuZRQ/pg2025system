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
        return $this->stock;
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
            // Buscar variante
            $variante = $this->variantes()->find($varianteId);
            if (!$variante || $variante->stock < $cantidad) {
                return false;
            }
            $variante->stock -= $cantidad;
            $variante->save();
        } else {
            // Producto sin variantes
            if ($this->stock < $cantidad) {
                return false;
            }
            $this->stock -= $cantidad;
        }

        // Actualizar stock total del producto principal (sumando variantes si existen)
        if ($this->variantes()->count() > 0) {
            $this->stock = $this->variantes()->sum('stock');
        } else {
            $this->vendidos_dia += $cantidad;
        }

        $this->save();

        return true;
    }

}
