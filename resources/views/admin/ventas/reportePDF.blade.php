<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Ventas</title>
    <style>
        table { width:100%; border-collapse: collapse; }
        th, td { border:1px solid #000; padding:5px; text-align:left; }
    </style>
</head>
<body>
    <h2>Reporte de ventas - {{ now()->format('d/m/Y') }}</h2>
    <table>
    <thead>
        <tr>
            <th>ID Venta</th>
            <th>ID Pedido</th>
            <th>Usuario</th>
            <th>Monto Total</th>
            <th>Método Pago</th>
            <th>Fecha Pago</th>
        </tr>
    </thead>
    <tbody>
        @foreach($ventasHoy as $venta)
            <tr>
                <td>{{ $venta->idVenta }}</td>
                <td>{{ $venta->idPedido }}</td>
                <td>{{ $venta->pedido->usuario->nombre ?? '' }}</td>
                <td>{{ $venta->montoTotal }}</td>
                <td>{{ ucfirst($venta->metodo_pago) }}</td>
                <td>{{ $venta->fechaPago }}</td>
            </tr>
        @endforeach
    </tbody>
</table>

</body>
</html>
