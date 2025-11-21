<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Historial de Ventas</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
        th, td { border: 1px solid #aaa; padding: 4px; text-align: left; }
        th { background: #f59e0b; color: white; }
        tfoot td { font-weight: bold; }
        .logo { width: 100px; margin-bottom: 10px; }
         header {
            text-align: center;
            margin-bottom: 30px;
        }
        header h2 {
            font-size: 18px;
            margin: 0;
            font-weight: bold;
        }
    </style>
</head>
<body>
<header>
 {{-- LOGO --}}
    <img src="{{ public_path('img/fondo3.png') }}" class="logo" alt="Logo">

    <h2>Historial de Ventas</h2>
    <h2>__________________________________________________________________________</h2>
</header>
   

    @foreach ($ventas as $venta)
        <h4>
            Venta #{{ $venta->idVenta }} - 
            Pedido {{ $venta->pedido->idPedido }} - 
            Mesa {{ $venta->pedido->mesa }}
        </h4>

        <p>
            Fecha: {{ $venta->fechaPago }} |
            Método: {{ $venta->metodo_pago }} |
            Total: Bs {{ number_format($venta->montoTotal,2) }}
        </p>

        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Variante</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($venta->pedido->detalles as $detalle)
                    <tr>
                        {{-- PRODUCTO --}}
                        <td>
                            {{ $detalle->producto->nombre }}
                        </td>

                        {{-- VARIANTE (tipo) --}}
                        <td>
                            {{ $detalle->variante ? $detalle->variante->tipo : 'Sin variante' }}
                        </td>

                        {{-- CANTIDAD --}}
                        <td>{{ $detalle->cantidad }}</td>

                        {{-- PRECIO UNITARIO --}}
                        <td>Bs {{ number_format($detalle->subtotal / $detalle->cantidad, 2) }}</td>

                        {{-- SUBTOTAL --}}
                        <td>Bs {{ number_format($detalle->subtotal, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach

    <hr>

    <h4>Totales por tipo de pago</h4>
    <table>
        <tr>
            <td>Total Efectivo:</td>
            <td>Bs {{ number_format($totalEfectivo,2) }}</td>
        </tr>
        <tr>
            <td>Total Tarjeta:</td>
            <td>Bs {{ number_format($totalTarjeta,2) }}</td>
        </tr>
        <tr>
            <td>Total QR:</td>
            <td>Bs {{ number_format($totalQR,2) }}</td>
        </tr>
        <tr>
            <td>Total General:</td>
            <td>Bs {{ number_format($totalGeneral,2) }}</td>
        </tr>
    </table>

</body>
</html>
