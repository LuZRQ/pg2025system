<?php

namespace App\Exports;

use App\Models\Venta;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
class VentasExport implements FromCollection, WithHeadings, WithStyles
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

    public function styles(Worksheet $sheet)
    {
        // Encabezado: negrita, centrado y tamaño de fuente
        $sheet->getStyle('A1:F1')->getFont()->setBold(true)->setSize(12);
        $sheet->getStyle('A1:F1')->getAlignment()->setHorizontal('center');

        // Auto ancho de columnas
        foreach(range('A','F') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Filas de datos centradas verticalmente
        $sheet->getStyle('A2:F' . ($this->ventas->count() + 1))
              ->getAlignment()->setVertical('center');
    }
}
