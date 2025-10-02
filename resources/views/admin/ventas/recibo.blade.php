@php
    $backRoute = route('ventas.caja'); 
    $title = 'Recibo de Pedido'; 
@endphp
@extends('layouts.recibo')


@section('content')
<div class="flex flex-col md:grid md:grid-cols-12 gap-6">

   {{-- Panel de opciones --}}
<div class="w-full md:w-1/4 md:fixed md:left-0 md:top-0 md:h-screen 
            bg-gradient-to-b from-yellow-900 to-yellow-700 
            text-white p-4 md:p-6 shadow-lg flex flex-col space-y-4 z-10">
{{-- Título con degradado brillante --}}
<div class="w-full bg-gradient-to-r from-red-400 via-orange-500 to-red-500 font-semibold text-white px-4 py-2 rounded-md shadow-md mb-4">
    <h2 class="text-sm font-semibold tracking-wide">Recibo de venta</h2>
</div>


    <h2 class="text-lg font-semibold text-center">Opciones</h2>

    {{-- Slider --}}
    <div class="flex flex-col gap-2">
        <label for="ticketWidth" class="text-sm">
            Ancho del ticket (cm): <span id="ticketWidthValue">5</span>cm
        </label>
        <input type="range" id="ticketWidth" min="3" max="10" step="0.1" value="5" 
               class="w-full accent-yellow-200">
    </div>

    {{-- Botones más compactos --}}
    <button id="btnPrint" 
        class="w-full bg-[#f5f5dc] border border-black text-black py-1.5 rounded-lg text-sm font-medium hover:bg-[#e8e8c8] transition">
        <i class="fas fa-print"></i> Imprimir
    </button>

    <button id="btnPDF" 
        class="w-full bg-[#f5f5dc] border border-black text-black py-1.5 rounded-lg text-sm font-medium hover:bg-[#e8e8c8] transition">
        <i class="fas fa-file-pdf"></i> Exportar PDF
    </button>
    <a href="{{ route('ventas.caja') }}" 
   class="w-full bg-[#f5f5dc] border border-black text-black py-1.5 rounded-lg text-sm font-medium hover:bg-[#e8e8c8] transition text-center">
   ⬅ Volver a Caja
</a>

</div>


    {{-- Panel del ticket --}}
   <div class="col-span-12 md:col-span-9 flex justify-center md:justify-end items-start md:items-center py-6">
    <div id="ticket" 
         class="bg-white p-4 shadow-xl rounded-xl w-full max-w-[5cm] font-mono text-gray-900"
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
@endsection