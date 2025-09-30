<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Stock Actual</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        h1 { text-align: center; color: #B45309; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #D97706; padding: 8px; text-align: left; }
        th { background-color: #FCD34D; color: #78350F; }
        tr:nth-child(even) { background-color: #FEF3C7; }
    </style>
</head>
<body>
    <h1>Stock Actual de Productos</h1>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            @foreach($productos as $i => $p)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td>{{ $p->nombre }}</td>
                    <td>{{ $p->stock }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
