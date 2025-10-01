<?php

namespace App\Exports;

use App\Models\Producto;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Models\DetallePedido;

use Carbon\Carbon;
class GananciaMesExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        $productos = Producto::with('detallePedidos.pedido.venta', 'categoria')->get()->map(function ($producto) {
            $ganancia = 0;

            foreach ($producto->detallePedidos as $detalle) {
                $venta = $detalle->pedido->venta ?? null;

                // Contar solo ventas pagadas en el mes actual
                if ($venta && Carbon::parse($venta->fechaPago)->month == now()->month) {
                    $ganancia += $detalle->cantidad * $producto->precio; // Precio del producto
                }
            }

            return [
                'ID Producto' => $producto->idProducto,
                'Nombre'      => $producto->nombre,
                'Categoría'   => $producto->categoria->nombreCategoria ?? '',
                'Ganancia'    => $ganancia,
            ];
        });

        return collect($productos);
    }

    public function headings(): array
    {
        return [
            'ID Producto',
            'Nombre',
            'Categoría',
            'Ganancia',
        ];
    }
}

