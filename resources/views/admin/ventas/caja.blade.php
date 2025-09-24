{{-- resources/views/caja/index.blade.php --}}
@extends('layouts.crud')

@section('content')
    <div class="p-6 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen">
        <div class="flex justify-center mb-6 border-b pb-4">
            <h1 class="font-bold text-2xl text-amber-900">💰 Control de Caja</h1>
        </div>

        <div class="grid grid-cols-12 gap-6">

            {{-- Panel Izquierdo: Resumen de Caja --}}
            <div class="col-span-5">
                <div class="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
                    <h2 class="font-semibold text-lg text-amber-900 mb-4">Control de Caja</h2>

                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="bg-amber-100 rounded-lg p-4 shadow">
                            <p class="text-sm text-amber-700">Fondo Inicial</p>
                            <p class="font-bold text-lg text-amber-900">Bs. 1,000.00</p>
                        </div>
                        <div class="bg-green-100 rounded-lg p-4 shadow">
                            <p class="text-sm text-green-700">Total en Caja</p>
                            <p class="font-bold text-lg text-green-900">Bs. 2,345.00</p>
                        </div>
                    </div>

                    <h3 class="font-semibold text-md text-amber-900 mb-2">Resumen de Ventas</h3>
                    <ul class="space-y-2 mb-6">
                        <li class="flex justify-between items-center">
                            <span class="flex items-center gap-2 text-amber-800">💵 Efectivo</span>
                            <span class="font-semibold text-amber-900">Bs. 1,200.00</span>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="flex items-center gap-2 text-amber-800">💳 Tarjeta</span>
                            <span class="font-semibold text-amber-900">Bs. 850.00</span>
                        </li>
                        <li class="flex justify-between items-center">
                            <span class="flex items-center gap-2 text-amber-800">📲 QR</span>
                            <span class="font-semibold text-amber-900">Bs. 295.00</span>
                        </li>
                    </ul>

                    <div class="flex flex-col gap-3">
                        <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 shadow">🔒 Cerrar
                            Resumen de Caja</button>
                        <div class="flex gap-3">
                            <button class="w-1/2 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 shadow">📊
                                Excel</button>
                            <button class="w-1/2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 shadow">📄
                                PDF</button>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Panel Derecho: Cobrar orden --}}
            <div class="col-span-7">

                <div class="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="font-semibold text-lg text-amber-900">Cobrar orden</h2>
                        <select id="pedidoSeleccionado" data-pedidos='@json($pedidosJS)'>
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

                    {{-- Tipo de pago --}}
                    <div class="mb-4">
                        <label class="block text-sm text-amber-700">Tipo de pago</label>
                        <select class="w-full border rounded-lg px-2 py-2 mt-1 text-amber-800" id="tipoPago"
                            name="tipo_pago"">
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="QR">QR</option>
                        </select>
                    </div>

                    {{-- Pago del cliente --}}
                    <div class="mb-4">
                        <label class="block text-sm text-amber-700">Pago del cliente</label>
                        <input type="number" class="w-full border rounded-lg px-2 py-2 mt-1 text-amber-900"
                            id="pagoCliente" name="pago_cliente" placeholder="0.00">
                    </div>

                    {{-- Cambio --}}
                    <div class="bg-gray-100 rounded-lg p-4 mb-6">
                        <p class="text-sm text-gray-600">Cambio</p>
                        <p class="font-semibold text-gray-800" id="cambio">Bs. 0.00</p>
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
                    <div class="flex justify-between mt-4">
                        {{-- Cerrar: solo limpia la vista o redirige a caja --}}
                        <a href="{{ route('ventas.caja') }}"
                            class="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow">
                            ✖ Cerrar
                        </a>

                       <form action="{{ route('ventas.cobrar') }}" method="POST">
    @csrf
    <input type="hidden" name="idPedido" id="pedidoIdSeleccionado">
    <input type="hidden" name="montoTotal" id="montoTotalInput">
    <input type="hidden" name="tipo_pago" id="tipoPagoInput">
    <input type="hidden" name="pago_cliente" id="pagoClienteInput">

    <button type="submit"
        class="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow">
        ✔ Terminar orden
    </button>
</form>

                    </div>

                </div>
            </div>
        @endsection
