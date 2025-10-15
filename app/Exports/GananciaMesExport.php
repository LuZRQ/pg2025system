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
        $inicioMes = now()->startOfMonth();
        $finMes = now()->endOfMonth();

        $productos = Producto::with('detallePedidos.pedido.venta', 'categoria')
            ->get()
            ->map(function ($producto) use ($inicioMes, $finMes) {
                $ingreso = 0;

                foreach ($producto->detallePedidos as $detalle) {
                    $venta = $detalle->pedido->venta ?? null;

                    if ($venta && $venta->fechaPago->between($inicioMes, $finMes)) {
                        $ingreso += $detalle->cantidad * $producto->precio;
                    }
                }

                return [
                    'ID Producto' => $producto->idProducto,
                    'Nombre'      => $producto->nombre,
                    'Categoría'   => $producto->categoria->nombreCategoria ?? '',
                    'Ingreso'     => $ingreso,
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
            'Ingreso',
        ];
    }
}
