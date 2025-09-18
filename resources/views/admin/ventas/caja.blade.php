{{-- resources/views/caja/index.blade.php --}}
@extends('layouts.crud')

@section('content')
<div class="p-6 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen">

    {{-- Header --}}
    <div class="flex justify-center mb-6 border-b pb-4">
        <h1 class="font-bold text-2xl text-amber-900">💰 Control de Caja</h1>
    </div>

    <div class="grid grid-cols-12 gap-6">

        {{-- Panel Izquierdo: Control de Caja --}}
        <div class="col-span-5">
            <div class="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
                <h2 class="font-semibold text-lg text-amber-900 mb-4">Control de Caja</h2>

                {{-- Fondos --}}
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

                {{-- Resumen de Ventas --}}
                <h3 class="font-semibold text-md text-amber-900 mb-2">Resumen de Ventas</h3>
                <ul class="space-y-2 mb-6">
                    <li class="flex justify-between items-center">
                        <span class="flex items-center gap-2 text-amber-800">
                            💵 Efectivo
                        </span>
                        <span class="font-semibold text-amber-900">Bs. 1,200.00</span>
                    </li>
                    <li class="flex justify-between items-center">
                        <span class="flex items-center gap-2 text-amber-800">
                            💳 Tarjeta
                        </span>
                        <span class="font-semibold text-amber-900">Bs. 850.00</span>
                    </li>
                    <li class="flex justify-between items-center">
                        <span class="flex items-center gap-2 text-amber-800">
                            📲 QR
                        </span>
                        <span class="font-semibold text-amber-900">Bs. 295.00</span>
                    </li>
                </ul>

                {{-- Botones de acción --}}
                <div class="flex flex-col gap-3">
                    <button class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 shadow">
                        🔒 Cerrar Resumen de Caja
                    </button>
                    <div class="flex gap-3">
                        <button class="w-1/2 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 shadow">📊 Excel</button>
                        <button class="w-1/2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 shadow">📄 PDF</button>
                    </div>
                </div>
            </div>
        </div>

        {{-- Panel Derecho: Cobrar orden --}}
        <div class="col-span-7">
            <div class="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="font-semibold text-lg text-amber-900">Cobrar orden</h2>
                    <select class="border rounded-lg px-2 py-1 text-sm text-amber-800">
                        <option>Mesa: 001</option>
                        <option>Mesa: 002</option>
                        <option>Mesa: 003</option>
                    </select>
                </div>

                {{-- Total a pagar --}}
                <div class="bg-amber-50 rounded-lg p-4 mb-6 shadow-inner">
                    <p class="text-sm text-amber-700">Total a pagar</p>
                    <p class="font-bold text-2xl text-amber-900">Bs. 215.00</p>
                </div>

                {{-- Tipo de pago --}}
                <div class="mb-4">
                    <label class="block text-sm text-amber-700">Tipo de pago</label>
                    <select class="w-full border rounded-lg px-2 py-2 mt-1 text-amber-800">
                        <option>Efectivo</option>
                        <option>Tarjeta</option>
                        <option>QR</option>
                    </select>
                </div>

                {{-- Pago del cliente --}}
                <div class="mb-4">
                    <label class="block text-sm text-amber-700">Pago del cliente</label>
                    <input type="number" class="w-full border rounded-lg px-2 py-2 mt-1 text-amber-900" placeholder="0.00">
                </div>

                {{-- Cambio --}}
                <div class="bg-gray-100 rounded-lg p-4 mb-6">
                    <p class="text-sm text-gray-600">Cambio</p>
                    <p class="font-semibold text-gray-800">Bs. 0.00</p>
                </div>

                {{-- Tabla de Orden --}}
                <div class="overflow-x-auto mb-6">
                    <table class="w-full border-collapse rounded-lg overflow-hidden">
                        <thead class="bg-amber-700 text-white">
                            <tr>
                                <th class="px-4 py-2 text-left">Cantidad</th>
                                <th class="px-4 py-2 text-left">Platillo</th>
                                <th class="px-4 py-2 text-left">Comentarios</th>
                                <th class="px-4 py-2 text-left">Precio</th>
                                <th class="px-4 py-2 text-left">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-amber-200">
                            <tr>
                                <td class="px-4 py-2">2</td>
                                <td class="px-4 py-2">Café Americano</td>
                                <td class="px-4 py-2">Sin azúcar</td>
                                <td class="px-4 py-2">Bs. 45.00</td>
                                <td class="px-4 py-2">Bs. 90.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2">1</td>
                                <td class="px-4 py-2">Sandwich Club</td>
                                <td class="px-4 py-2">Extra queso</td>
                                <td class="px-4 py-2">Bs. 125.00</td>
                                <td class="px-4 py-2">Bs. 125.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {{-- Botones finales --}}
                <div class="flex justify-between">
                    <button class="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow">✖ Cerrar</button>
                    <button class="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow">✔ Terminar orden</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
