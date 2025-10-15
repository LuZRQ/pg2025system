<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ingresos Totales del Mes</title>
   <style>
        body {
            font-family: 'Arial', sans-serif;
            font-size: 12px;
            color: #333;
            margin: 30px;
        }

        header {
            text-align: center;
            margin-bottom: 30px;
        }

        header img {
            max-height: 80px;
            margin-bottom: 10px;
        }

        header h1 {
            font-size: 18px;
            margin: 0;
            font-weight: bold;
        }

        header p {
            font-size: 12px;
            margin: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th, td {
            border: 1px solid #bbb;
            padding: 8px;
            text-align: left;
            font-size: 12px;
        }

        th {
            background-color: #f0f0f0;
        }

        tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        footer {
            position: fixed;
            bottom: 20px;
            width: 100%;
            text-align: right;
            font-size: 10px;
            color: #555;
            border-top: 1px solid #bbb;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <header>
        <img src="{{ public_path('img/fondo3.png') }}" alt="Logo">
     
      <p>Mes: {{ now()->locale('es')->translatedFormat('F Y') }}</p>

    </header>
    <h2>Ingresos Totales del Mes: {{ now()->format('F Y') }}</h2>

    @php
        $ingreso_total = $productos->sum('ingreso');
    @endphp

    <h3>Total: {{ number_format($ingreso_total, 2) }}</h3>

    <table>
        <thead>
            <tr>
                <th>ID Producto</th>
                <th>Nombre</th>
                <th>Ingreso</th>
            </tr>
        </thead>
        <tbody>
            @foreach($productos as $producto)
            <tr>
                <td>{{ $producto->idProducto }}</td>
                <td>{{ $producto->nombre }}</td>
                <td>{{ number_format($producto->ingreso ?? 0, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
