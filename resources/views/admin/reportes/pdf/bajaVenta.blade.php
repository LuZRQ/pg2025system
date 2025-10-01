<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Productos con Baja Venta</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f3f3f3; }
    </style>
</head>
<body>
    <h2>Productos con Baja Venta: {{ now()->format('F Y') }}</h2>
    <table>
        <thead>
            <tr>
                <th>ID Producto</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Cantidad Vendida</th>
            </tr>
        </thead>
        <tbody>
            @foreach($productos as $producto)
            <tr>
                <td>{{ $producto->idProducto }}</td>
                <td>{{ $producto->nombre }}</td>
                <td>{{ $producto->categoria->nombreCategoria ?? '' }}</td>
                <td>{{ $producto->cantidad_vendida ?? 0 }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
