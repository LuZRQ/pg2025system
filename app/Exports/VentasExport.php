<?php

namespace App\Exports;

use App\Models\Venta;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
class VentasExport implements FromCollection
{
protected $ventas;

    public function __construct($ventas)
    {
        $this->ventas = $ventas;
    }

    public function collection()
    {
        return $this->ventas->map(function($venta) {
            return [
                'ID Venta'      => $venta->idVenta,
                'ID Pedido'     => $venta->idPedido,
                'Usuario'       => $venta->pedido->usuario->nombre ?? '',
                'Monto Total'   => $venta->montoTotal,
                'Método Pago'   => ucfirst($venta->metodo_pago ?? ''),
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
