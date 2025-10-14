<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class HistoricoCajaMensualExport implements FromArray, WithHeadings
{
    protected $anio, $mes, $totales, $totalMes;

    public function __construct($anio, $mes, $totales, $totalMes)
    {
        $this->anio = $anio;
        $this->mes = $mes;
        $this->totales = $totales;
        $this->totalMes = $totalMes;
    }

    public function array(): array
    {
        $data = [];
        foreach ($this->totales as $semana => $monto) {
            $data[] = [$semana, $monto];
        }
        $data[] = ['TOTAL MES', $this->totalMes];
        return $data;
    }

    public function headings(): array
    {
        return ["Periodo", "Total"];
    }
}