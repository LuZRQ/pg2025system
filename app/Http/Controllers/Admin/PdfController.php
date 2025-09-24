<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Venta;
use Barryvdh\DomPDF\Facade\Pdf;
class PdfController extends Controller
{
   public function reciboVenta($idVenta)
    {
        $venta = Venta::with(['pedido.detalles.producto', 'pedido.usuario'])->findOrFail($idVenta);

        // Genera el PDF desde la vista
        $pdf = Pdf::loadView('admin.ventas.recibo_pdf', compact('venta'))
                  ->setPaper([0, 0, 226, 600]); // tamaño aproximado ticket 5 cm ancho

        return $pdf->download("Recibo_Venta_{$venta->idVenta}.pdf");
    }
}
