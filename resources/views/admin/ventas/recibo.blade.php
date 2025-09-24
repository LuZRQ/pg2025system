<div class="grid grid-cols-12 gap-6 p-6">
    {{-- Panel izquierdo --}}
    <div class="col-span-3 bg-white shadow rounded-lg p-4 flex flex-col gap-4">
        <h3 class="font-semibold text-gray-700">Opciones</h3>
        <div>
            <label class="block text-sm text-gray-600">Ancho del ticket</label>
            <input type="text" value="5 cm" disabled
                   class="w-full mt-1 px-2 py-1 border rounded bg-gray-100 text-gray-700">
        </div>
        <button onclick="window.print()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            🖨 Imprimir
        </button>
        <a href="{{ route('ventas.recibo.pdf', $venta->idVenta) }}" 
           class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-center">
            ⬇ Exportar a PDF
        </a>
    </div>

    {{-- Panel derecho: Ticket --}}
    <div class="col-span-9 bg-white shadow rounded-lg p-6 text-sm font-mono" style="max-width: 5cm;">
        {{-- Encabezado --}}
        <div class="text-center mb-4">
            <h1 class="text-lg font-bold">Garabato</h1>
            <p>Calle Pinilla, Avenida 6 de Agosto</p>
            <p>La Paz, Bolivia</p>
            <p>Tel: +591 2 123 4567</p>
        </div>

        {{-- Datos generales --}}
        <p>Fecha: {{ $venta->fechaPago->format('d M Y') }}</p>
        <p>Hora: {{ $venta->fechaPago->format('H:i:s') }}</p>
        <p>Orden #: {{ str_pad($venta->idVenta, 3, '0', STR_PAD_LEFT) }}</p>
        <p>Mesa: {{ $venta->pedido->mesa }}</p>
        <p>Atendido por: {{ $venta->pedido->usuario->nombre ?? '---' }}</p>

        <hr class="my-2">

        {{-- Productos --}}
        @foreach ($venta->pedido->detalles as $detalle)
            <div class="flex justify-between">
                <span>{{ $detalle->cantidad }} x {{ $detalle->producto->nombre }}</span>
                <span>Bs. {{ number_format($detalle->subtotal, 2) }}</span>
            </div>
            @if ($detalle->comentarios)
                <p class="text-xs text-gray-500">({{ $detalle->comentarios }})</p>
            @endif
        @endforeach

        <hr class="my-2">

        {{-- Totales --}}
        <div class="flex justify-between font-bold">
            <span>Total</span>
            <span>Bs. {{ number_format($venta->montoTotal, 2) }}</span>
        </div>
        <p class="mt-2">Estado de pago: <strong>Pagado</strong></p>
        <p>Método de pago: {{ strtoupper($venta->metodo_pago) }}</p>

        <hr class="my-2">

        {{-- Mensaje --}}
        <div class="text-center mt-4">
            <p class="text-sm">¡Gracias por visitarnos!</p>
            <p class="text-xs italic">“El café sabe mejor con una sonrisa”</p>
            <p class="text-lg">♥ ☕ ♥</p>
        </div>
    </div>
</div>
