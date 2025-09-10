<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoriaProducto extends Model
{
    protected $table = 'CategoriaProducto';
    protected $primaryKey = 'idCategoria';

    protected $fillable = [
        'nombreCategoria',
        'descripcion'
    ];

    public function productos()
    {
        return $this->hasMany(Producto::class, 'categoriaId', 'idCategoria');
    }
}
