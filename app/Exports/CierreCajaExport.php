<?php

namespace App\Exports;

use App\Models\CierreCaja;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class CierreCajaExport implements FromArray, WithHeadings, WithStyles
{
    protected $cierre;

    public function __construct($cierre)
    {
        $this->cierre = $cierre;
    }

    public function array(): array
    {
        return [
            [
                'Usuario'       => $this->cierre->usuario->nombre ?? '',
                'Fondo Inicial' => $this->cierre->fondo_inicial,
                'Total Efectivo' => $this->cierre->total_efectivo,
                'Total Tarjeta' => $this->cierre->total_tarjeta,
                'Total QR'      => $this->cierre->total_qr,
                'Total General' => $this->cierre->total_caja,
                'Fecha Apertura' => $this->cierre->fecha_apertura,
                'Fecha Cierre'  => $this->cierre->fecha_cierre,
                'Observaciones' => $this->cierre->observaciones,
            ]
        ];
    }

    public function headings(): array
    {
        return [
            'Usuario',
            'Fondo Inicial',
            'Total Efectivo',
            'Total Tarjeta',
            'Total QR',
            'Total General',
            'Fecha Apertura',
            'Fecha Cierre',
            'Observaciones',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1:I1')->getFont()->setBold(true)->setSize(12);
        $sheet->getStyle('A1:I1')->getAlignment()->setHorizontal('center');
        foreach (range('A', 'I') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }
    }
}
