{{-- resources/views/caja.blade.php --}}
@extends('layouts.crud')

@section('content')
<div class="p-4 md:p-6 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen">

    {{-- Título --}}
    <div class="flex justify-center mb-6 border-b pb-4">
        <h1 class="font-bold text-2xl md:text-3xl text-amber-900">💰 Control de Caja</h1>
    </div>

    {{-- Grid principal --}}
    <div class="grid grid-cols-12 gap-6">

        {{-- Panel Izquierdo: Resumen de Caja --}}
        <div class="col-span-12 md:col-span-5 lg:col-span-4 p-2 md:p-4">
            <div class="bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-2xl shadow-lg p-4 md:p-6 border border-amber-200">

                <h2 class="font-semibold text-lg md:text-xl text-amber-900 mb-4 flex items-center gap-2">
                    <i class="fas fa-cash-register"></i> Control de Caja
                </h2>

                {{-- Totales iniciales y en caja --}}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div class="bg-amber-100 rounded-lg p-3 shadow flex items-center gap-2">
                        <i class="fas fa-wallet text-amber-700 text-lg sm:text-xl"></i>
                        <div>
                            <p class="text-sm text-amber-700">Fondo Inicial</p>
                            <p class="font-semibold text-base sm:text-lg text-amber-900">Bs. {{ number_format($fondoInicial,2) }}</p>
                        </div>
                    </div>
                    <div class="bg-green-100 rounded-lg p-3 shadow flex items-center gap-2">
                        <i class="fas fa-coins text-green-700 text-lg sm:text-xl"></i>
                        <div>
                            <p class="text-sm text-green-700">Total en Caja</p>
                            <p class="font-semibold text-base sm:text-lg text-green-900">Bs. {{ number_format($totalEnCaja,2) }}</p>
                        </div>
                    </div>
                </div>

                {{-- Resumen de ventas en caja blanca --}}
                <div class="bg-white rounded-xl p-4 shadow mb-4">
                    <h3 class="font-semibold text-md sm:text-lg text-amber-900 mb-2 flex items-center gap-1">
                        <i class="fas fa-chart-simple"></i> Resumen de Ventas
                    </h3>
                    <ul class="space-y-2">
                        <li class="flex justify-between items-center">
                            <span class="flex items-center gap-1 text-amber-800"><i class="fas fa-money-bill-wave"></i> Efectivo</span>
                            <span class="font-semibold text-amber-900">Bs. {{ number_format($totalEfectivo,2) }}</span>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="flex items-center gap-1 text-amber-800"><i class="fas fa-credit-card"></i> Tarjeta</span>
                            <span class="font-semibold text-amber-900">Bs. {{ number_format($totalTarjeta,2) }}</span>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="flex items-center gap-1 text-amber-800"><i class="fas fa-qrcode"></i> QR</span>
                            <span class="font-semibold text-amber-900">Bs. {{ number_format($totalQR,2) }}</span>
                        </li>
                    </ul>
                </div>

                {{-- Botones --}}
                <div class="flex flex-col gap-2">
                    {{-- Cerrar Caja --}}
                    <form action="{{ route('ventas.cerrarCaja') }}" method="POST">
                        @csrf
                        <button type="submit" class="w-full bg-yellow-200 text-amber-900 py-2 rounded-md hover:bg-yellow-300 shadow-sm text-sm font-semibold">
                            <i class="fas fa-lock mr-1"></i> Cerrar Caja
                        </button>
                    </form>

                    {{-- Exportar --}}
                    <div class="flex gap-2">
                        <a href="{{ route('ventas.caja.export.excel') }}" class="flex-1 bg-yellow-100 text-amber-900 py-2 rounded-md hover:bg-yellow-200 shadow-sm text-center text-sm font-semibold">
                            <i class="fas fa-file-excel mr-1"></i> Excel
                        </a>
                        <a href="{{ route('ventas.caja.export.pdf') }}" class="flex-1 bg-yellow-100 text-amber-900 py-2 rounded-md hover:bg-yellow-200 shadow-sm text-center text-sm font-semibold">
                            <i class="fas fa-file-pdf mr-1"></i> PDF
                        </a>
                    </div>

                    {{-- Volver --}}
                    <a href="{{ route('ventas.index') }}" class="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 shadow-sm text-center text-sm mt-2">
                        <i class="fas fa-arrow-left mr-1"></i> Volver
                    </a>
                </div>
            </div>
        </div>

        {{-- Panel Derecho: Cobrar orden --}}
        <div class="col-span-12 md:col-span-7 lg:col-span-8 p-2 md:p-4">
            <div class="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-amber-200">

                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <h2 class="font-semibold text-lg text-amber-900">Cobrar orden</h2>
                    <select id="pedidoSeleccionado" data-pedidos='@json($pedidosJS)' class="w-full md:w-1/2 border rounded-lg px-2 py-2 text-amber-800">
                        <option disabled selected>Selecciona un pedido</option>
                        @foreach ($pedidos as $pedido)
                            <option value="{{ $pedido->idPedido }}">
                                Mesa: {{ $pedido->mesa }} - Pedido #{{ $pedido->idPedido }}
                            </option>
                        @endforeach
                    </select>
                </div>

                {{-- Total a pagar --}}
                <div class="bg-amber-50 rounded-lg p-4 mb-6 shadow-inner">
                    <p class="text-sm text-amber-700">Total a pagar</p>
                    <p class="font-bold text-2xl text-amber-900" id="totalPagar">Bs. 0.00</p>
                </div>

                {{-- Tipo de pago y pago cliente --}}
                <div class="bg-white rounded-xl p-4 mb-4 shadow">
                    <div class="mb-4">
                        <label class="block text-sm text-amber-700">Tipo de pago</label>
                        <select class="w-full border rounded-lg px-2 py-2 mt-1 text-amber-800" id="tipoPago" name="tipo_pago">
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="QR">QR</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm text-amber-700">Pago del cliente</label>
                        <input type="number" class="w-full border rounded-lg px-2 py-2 mt-1 text-amber-900"
                               id="pagoCliente" name="pago_cliente" placeholder="0.00">
                    </div>

                    {{-- Cambio --}}
                    <div class="bg-gray-100 rounded-lg p-4 mb-0">
                        <p class="text-sm text-gray-600">Cambio</p>
                        <p class="font-semibold text-gray-800" id="cambio">Bs. 0.00</p>
                    </div>
                </div>

                {{-- Tabla de Orden --}}
                <div class="overflow-x-auto mb-6">
                    <table id="tablaOrden" class="w-full border-collapse rounded-lg overflow-hidden">
                        <thead class="bg-amber-700 text-white">
                        <tr>
                            <th class="px-4 py-2 text-left">Cantidad</th>
                            <th class="px-4 py-2 text-left">Platillo</th>
                            <th class="px-4 py-2 text-left">Comentarios</th>
                            <th class="px-4 py-2 text-left">Precio</th>
                            <th class="px-4 py-2 text-left">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-amber-200"></tbody>
                    </table>
                </div>

                {{-- Botones finales --}}
                <div class="flex flex-col md:flex-row justify-between mt-4 gap-2">
                    <a href="{{ route('ventas.caja') }}"
                       class="px-6 py-2 rounded-lg bg-yellow-100 text-amber-900 hover:bg-yellow-200 shadow text-center">
                        ✖ Cerrar
                    </a>

                    <form id="formCobrar" action="{{ route('ventas.cobrar') }}" method="POST" class="flex-1 md:flex-none">
                        @csrf
                        <input type="hidden" name="idPedido" id="pedidoIdSeleccionado">
                        <input type="hidden" name="montoTotal" id="montoTotalInput">
                        <input type="hidden" name="tipo_pago" id="tipoPagoInput">
                        <input type="hidden" name="pago_cliente" id="pagoClienteInput">

                        <button type="submit"
                                class="w-full px-6 py-2 rounded-lg bg-yellow-100 text-amber-900 hover:bg-yellow-200 shadow font-semibold">
                            ✔ Terminar orden
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
