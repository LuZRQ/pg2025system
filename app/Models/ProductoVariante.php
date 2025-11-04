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
        'estado',
    ];

    // Tipo de dato para que Eloquent los transforme automáticamente
    protected $casts = [
        'precio' => 'decimal:2',
        'stock' => 'integer',
        'estado' => 'boolean',
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
}
