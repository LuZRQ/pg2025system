<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reporte de Ventas del Día</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px;}
        th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; }
        h2 { text-align: center; }
    </style>
</head>
<body>
    <h2>Reporte de Ventas del Día - {{ $fecha }}</h2>

    <p><strong>Total del Día:</strong> S/ {{ number_format($total, 2) }}</p>

    <table>
        <thead>
            <tr>
                <th>ID Venta</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            @foreach($ventas as $v)
                <tr>
                    <td>{{ $v->idVenta }}</td>
                    <td>{{ $v->cliente->nombre ?? 'N/A' }}</td>
                    <td>S/ {{ number_format($v->montoTotal, 2) }}</td>
                    <td>{{ $v->fechaPago }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
