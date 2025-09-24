@extends('layouts.recibo')

@section('title','Recibo de Venta')

@section('content')
<div class="grid grid-cols-12 gap-6">

    {{-- Panel de opciones --}}
    <div class="col-span-12 md:col-span-3 bg-yellow-100 text-gray-800 p-6 rounded-xl shadow-lg flex flex-col space-y-4
                md:sticky md:top-6">
        <h2 class="text-lg font-semibold">Opciones</h2>

        <div class="flex flex-col gap-2">
            <label for="ticketWidth" class="text-sm">Ancho del ticket (cm): <span id="ticketWidthValue">5</span>cm</label>
            <input type="range" id="ticketWidth" min="3" max="10" step="0.1" value="5" class="w-full">
        </div>

        <button onclick="printTicket()" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200">
            <i class="fas fa-print"></i> Imprimir Ticket
        </button>

        <button onclick="downloadPDF()" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all duration-200">
            <i class="fas fa-file-pdf"></i> Exportar PDF
        </button>
    </div>

    {{-- Panel del ticket --}}
    <div class="col-span-12 md:col-span-9 flex justify-center">
        <div id="ticket" class="bg-white p-4 shadow-xl rounded-xl w-full max-w-[5cm] font-mono"
             style="line-height:1.3;">

            {{-- Encabezado con imagen --}}
            <div class="text-center mb-2 text-[10px]">
                <img src="{{ asset('img/logogarabato.jpg') }}" alt="Garabato Café" class="mx-auto w-28 h-auto mb-1">
                <div>Calle Pinilla, Avenida 6 de Agosto</div>
                <div>La Paz, Bolivia</div>
                <div>Tel: +591 2 123 4567</div>
            </div>

            <hr class="my-2 border-dashed border-gray-400">

            {{-- Datos generales --}}
            <div class="space-y-1 text-[10px]">
                <div>Fecha: {{ $venta->fechaPago?->format('d M Y') ?? '---' }}</div>
                <div>Hora: {{ $venta->fechaPago?->format('H:i:s') ?? '---' }}</div>
                <div>Orden #: {{ str_pad($venta->idVenta ?? 0,3,'0',STR_PAD_LEFT) }}</div>
                <div>Mesa: {{ $venta->pedido->mesa ?? '---' }}</div>
                <div>Atendido por: {{ $venta->pedido->usuario->nombre ?? '---' }}</div>
            </div>

            <hr class="my-2 border-dashed border-gray-400">

            {{-- Productos --}}
            <div class="space-y-1 text-[10px]">
                @foreach($venta->pedido->detalles as $detalle)
                    <div class="flex justify-between">
                        <span>{{ $detalle->cantidad }} x {{ $detalle->producto->nombre }}</span>
                        <span>Bs. {{ number_format($detalle->subtotal,2) }}</span>
                    </div>
                    @if($detalle->comentarios)
                        <div class="ml-2 text-[9px] text-gray-500 italic">({{ $detalle->comentarios }})</div>
                    @endif
                @endforeach
            </div>

            <hr class="my-2 border-dashed border-gray-400">

            {{-- Totales --}}
            <div class="space-y-1 text-[10px]">
                <div class="flex justify-between font-bold">
                    <span>Total</span>
                    <span>Bs. {{ number_format($venta->montoTotal,2) }}</span>
                </div>
                <div>Estado de pago: <strong>Pagado</strong></div>
                <div>Método de pago: {{ strtoupper($venta->metodo_pago) }}</div>
            </div>

            <hr class="my-2 border-dashed border-gray-400">

            {{-- Mensaje --}}
            <div class="text-center mt-2 text-[10px]">
                <div>¡Gracias por visitarnos!</div>
                <div class="italic text-[8px]">“El café sabe mejor con una sonrisa”</div>
                <div class="text-sm">♥ ☕ ♥</div>
            </div>
        </div>
    </div>
</div>

{{-- Scripts --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script>
    const ticketWidth = document.getElementById('ticketWidth');
    const ticket = document.getElementById('ticket');
    const ticketWidthValue = document.getElementById('ticketWidthValue');

    // Ajustar ancho del ticket en tiempo real
    ticketWidth.addEventListener('input', function(e){
        const value = e.target.value;
        ticket.style.maxWidth = value + 'cm';
        ticketWidthValue.textContent = value;
    });

    // Descargar ticket como PDF
    function downloadPDF() {
        const element = ticket;
        const width = parseFloat(ticketWidth.value);
        html2pdf().set({
            margin: 0,
            filename: 'Recibo_Venta_{{ $venta->idVenta }}.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'cm', format: [element.offsetHeight/37.8, width] }
        }).from(element).save();
    }

    // Imprimir solo el ticket
    function printTicket() {
        const ticketHTML = ticket.outerHTML;
        const printWindow = window.open('', '', 'width=400,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Imprimir Ticket</title>
                    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
                    <style>
                        body { font-family: 'Roboto Mono', monospace; padding: 10px; }
                        .rounded-xl { border-radius: 1rem; }
                        .shadow-xl { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05); }
                    </style>
                </head>
                <body>${ticketHTML}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
</script>
@endsection