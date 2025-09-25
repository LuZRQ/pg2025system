<?php

namespace App\Exports;

use App\Models\Producto;
use Maatwebsite\Excel\Concerns\FromCollection;

class StockExport implements FromCollection
{
     public function collection()
    {
        return Producto::all()->map(function($producto) {
            return [
                'ID Producto'   => $producto->idProducto,
                'Nombre'        => $producto->nombre,
                'Categoría'     => $producto->categoria->nombreCategoria ?? '',
                'Stock Actual'  => $producto->stock,
                'Stock Inicial' => $producto->stock_inicial,
                'Estado'        => $producto->stock <= 5 ? 'Crítico' : ($producto->stock < 20 ? 'Bajo' : 'OK'),
            ];
        });
    }

    public function headings(): array
    {
        return [
            'ID Producto',
            'Nombre',
            'Categoría',
            'Stock Actual',
            'Stock Inicial',
            'Estado',
        ];
    }
}
