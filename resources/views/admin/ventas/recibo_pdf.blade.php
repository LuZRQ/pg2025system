<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Recibo Venta #{{ $venta->idVenta ?? '---' }}</title>
    <style>
        body { font-family: monospace; font-size: 12px; width: 5cm; margin:0; padding:0; }
        .text-center { text-align: center; }
        hr { border: 1px dashed #000; margin: 5px 0; }
        .flex { display: flex; justify-content: space-between; }
        .font-bold { font-weight: bold; }
        .text-xs { font-size: 10px; }
    </style>
</head>
<body>

    <div class="text-center">
        <h1>Garabato</h1>
        <p>Calle Pinilla, Avenida 6 de Agosto</p>
        <p>La Paz, Bolivia</p>
        <p>Tel: +591 2 123 4567</p>
    </div>

    <p>Fecha: {{ $venta->fechaPago ? $venta->fechaPago->format('d M Y') : '---' }}</p>
    <p>Hora: {{ $venta->fechaPago ? $venta->fechaPago->format('H:i:s') : '---' }}</p>
    <p>Orden #: {{ str_pad($venta->idVenta ?? 0, 3, '0', STR_PAD_LEFT) }}</p>
    <p>Mesa: {{ $venta->pedido->mesa ?? '---' }}</p>
    <p>Atendido por: {{ $venta->pedido->usuario->nombre ?? '---' }}</p>

    <hr>

    @if($venta->pedido && $venta->pedido->detalles)
        @foreach ($venta->pedido->detalles as $detalle)
            <div class="flex">
                <span>{{ $detalle->cantidad ?? 0 }} x {{ $detalle->producto->nombre ?? '---' }}</span>
                <span>Bs. {{ number_format($detalle->subtotal ?? 0, 2) }}</span>
            </div>
            @if (!empty($detalle->comentarios))
                <p class="text-xs">({{ $detalle->comentarios }})</p>
            @endif
        @endforeach
    @else
        <p>No hay detalles de productos disponibles.</p>
    @endif

    <hr>

    <div class="flex font-bold">
        <span>Total</span>
        <span>Bs. {{ number_format($venta->montoTotal ?? 0, 2) }}</span>
    </div>
    <p>Método de pago: {{ strtoupper($venta->metodo_pago ?? '---') }}</p>

    <hr>

    <div class="text-center text-xs">
        <p>¡Gracias por visitarnos!</p>
        <p>“El café sabe mejor con una sonrisa”</p>
    </div>

</body>
</html>
