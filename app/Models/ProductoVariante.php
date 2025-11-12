<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoVariante extends Model
{
   use HasFactory;

    protected $table = 'producto_variantes';
    protected $primaryKey = 'idVariante';
    public $timestamps = false; // No hay created_at/updated_at

    protected $fillable = [
        'productoId',
        'tipo',
        'precio',
        'stock',
        'stock_inicial', 
        'estado',
        'vendidos_dia',           // NUEVO
    'fecha_actualizacion_stock',
    ];

    // Tipo de dato para que Eloquent los transforme automáticamente
    protected $casts = [
        'precio' => 'decimal:2',
        'stock' => 'integer',
           'stock_inicial' => 'integer', 
        'estado' => 'boolean',
           'vendidos_dia' => 'integer',
    'fecha_actualizacion_stock' => 'date',
    ];

    // Relación inversa: cada variante pertenece a un producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'productoId', 'idProducto');
    }

    // Scope para filtrar variantes activas
    public function scopeActivas($query)
    {
        return $query->where('estado', 1);
    }

    // Función helper opcional para mostrar nombre de tipo capitalizado
    public function tipoFormateado()
    {
        return ucfirst($this->tipo);
    }
public function getVendidosAttribute()
{
    return $this->vendidos_dia;
}

public function getRestanteAttribute()
{
    return $this->stock; // restante = stock actual
}

public function resetStockDiario()
{
    $today = now()->toDateString();
    if ($this->fecha_actualizacion_stock != $today) {
        $this->vendidos_dia = 0;
        $this->fecha_actualizacion_stock = $today;
        $this->save();
    }
}

}
