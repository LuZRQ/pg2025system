<?php

namespace App\Exports;

use App\Models\Venta;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
class VentasExport implements FromCollection
{
   
     public function collection()
    {
        return Venta::with('pedido.usuario')->get()->map(function($venta) {
            return [
                'ID Venta'      => $venta->idVenta,
                'ID Pedido'     => $venta->idPedido,
                'Usuario'       => $venta->pedido->usuario->nombre ?? '',
                'Monto Total'   => $venta->montoTotal,
                'Método Pago'   => $venta->metodo_pago ?? '',
                'Fecha Pago'    => $venta->fechaPago,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'ID Venta',
            'ID Pedido',
            'Usuario',
            'Monto Total',
            'Método Pago',
            'Fecha Pago',
        ];
    }
}
