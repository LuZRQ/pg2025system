<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ganancia Total del Mes</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        h2, h3 { margin: 0; padding: 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f3f3f3; }
    </style>
</head>
<body>
    <h2>Ganancia Total del Mes: {{ now()->format('F Y') }}</h2>

    @php
        $ganancia_total = $productos->sum('ganancia');
    @endphp

    <h3>Total: {{ number_format($ganancia_total, 2) }}</h3>

    <table>
        <thead>
            <tr>
                <th>ID Producto</th>
                <th>Nombre</th>
                <th>Ganancia</th>
            </tr>
        </thead>
        <tbody>
            @foreach($productos as $producto)
            <tr>
                <td>{{ $producto->idProducto }}</td>
                <td>{{ $producto->nombre }}</td>
                <td>{{ number_format($producto->ganancia ?? 0, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
