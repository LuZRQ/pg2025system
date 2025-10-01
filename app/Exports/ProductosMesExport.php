<?php

namespace App\Exports;

use App\Models\Producto;
use Maatwebsite\Excel\Concerns\FromCollection;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\WithHeadings;

use App\Models\DetallePedido;
class ProductosMesExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        $productos = Producto::with('detallePedidos.pedido.venta', 'categoria')->get()->map(function ($producto) {
            $cantidadVendida = 0;

            foreach ($producto->detallePedidos as $detalle) {
                $venta = $detalle->pedido->venta ?? null;

                if ($venta && Carbon::parse($venta->fechaPago)->month == now()->month) {
                    $cantidadVendida += $detalle->cantidad;
                }
            }

            return [
                'ID Producto'      => $producto->idProducto,
                'Nombre'           => $producto->nombre,
                'Categoría'        => $producto->categoria->nombreCategoria ?? '',
                'Cantidad Vendida' => $cantidadVendida,
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
            'Cantidad Vendida',
        ];
    }
}