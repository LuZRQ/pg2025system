<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Histórico Mensual Caja</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: center; }
        th { background: #f2f2f2; }
        .total { font-weight: bold; background: #e6e6e6; }
    </style>
</head>
<body>
    <h2 style="text-align:center;">Histórico de Caja - {{ $mes }}/{{ $anio }}</h2>

    <table>
        <thead>
            <tr>
                <th>Semana</th>
                <th>Total (Bs.)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($totales as $row)
                <tr>
                    <td>{{ $row['semana'] }}</td>
                    <td>{{ number_format($row['monto'], 2, ',', '.') }}</td>
                </tr>
            @endforeach
            <tr class="total">
                <td>TOTAL MES</td>
                <td>{{ number_format($totalMes, 2, ',', '.') }}</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
