{{-- resources/views/cocina/index.blade.php --}}
@extends('layouts.admin')

@section('content')
<div class="p-6 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen">

    {{-- Header --}}
    <div class="flex justify-center mb-6 border-b pb-4">
        <h1 class="font-bold text-2xl text-amber-900">👨‍🍳 Módulo de Pedidos de Cocina</h1>
    </div>

    {{-- Filtros --}}
    <div class="flex space-x-3 mb-8 justify-center">
        <button class="px-4 py-2 rounded-lg bg-amber-700 text-white shadow hover:bg-amber-800">Todos</button>
        <button class="px-4 py-2 rounded-lg bg-gray-100 text-amber-800 hover:bg-amber-200">Pendientes</button>
        <button class="px-4 py-2 rounded-lg bg-gray-100 text-amber-800 hover:bg-amber-200">En preparación</button>
        <button class="px-4 py-2 rounded-lg bg-gray-100 text-amber-800 hover:bg-amber-200">Completado</button>
    </div>

    {{-- Pedidos --}}
    <div class="grid grid-cols-3 gap-6">
        
        {{-- Pedido 1 --}}
        <div class="bg-white border border-amber-200 rounded-xl shadow-lg p-4">
            <div class="flex justify-between items-center mb-2">
                <p class="font-semibold text-amber-900">#001</p>
                <div class="text-right text-sm text-gray-600">
                    <p>14:30</p>
                    <p class="text-red-600 font-semibold">25:30</p>
                </div>
            </div>
            <p class="text-sm text-gray-700 mb-2">Mesa 5</p>
            <p class="text-xs text-gray-500 mb-2">Mesero: Ana López</p>

            <ul class="text-sm text-amber-900 space-y-1 mb-2">
                <li>2x Café Americano <span class="float-right">Bs. 60</span></li>
                <li>1x Sandwich Club <span class="float-right">Bs. 85</span></li>
            </ul>

            <p class="text-xs italic text-gray-600 mb-3">Café sin azúcar</p>

            <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-red-600">Pendiente</span>
                <button class="px-4 py-1 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">Listo</button>
            </div>
        </div>

        {{-- Pedido 2 --}}
        <div class="bg-white border border-amber-200 rounded-xl shadow-lg p-4">
            <div class="flex justify-between items-center mb-2">
                <p class="font-semibold text-amber-900">#002</p>
                <div class="text-right text-sm text-gray-600">
                    <p>14:45</p>
                    <p class="text-yellow-600 font-semibold">10:15</p>
                </div>
            </div>
            <p class="text-sm text-gray-700 mb-2">Para llevar</p>
            <p class="text-xs text-gray-500 mb-2">Mesero: Carlos Ruiz</p>

            <ul class="text-sm text-amber-900 space-y-1 mb-2">
                <li>1x Capuccino <span class="float-right">Bs. 45</span></li>
                <li>2x Croissant <span class="float-right">Bs. 70</span></li>
            </ul>

            <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-yellow-600">En preparación</span>
                <button class="px-4 py-1 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">Listo</button>
            </div>
        </div>

        {{-- Pedido 3 --}}
        <div class="bg-gray-100 border border-amber-200 rounded-xl shadow p-4">
            <div class="flex justify-between items-center mb-2">
                <p class="font-semibold text-gray-800">#003</p>
                <div class="text-right text-sm text-gray-600">
                    <p>14:15</p>
                    <p class="text-green-600 font-semibold">Completa</p>
                </div>
            </div>
            <p class="text-sm text-gray-700 mb-2">Mesa 2</p>
            <p class="text-xs text-gray-500 mb-2">Mesero: María Sánchez</p>

            <ul class="text-sm text-gray-800 space-y-1 mb-4">
                <li>1x Pastel de Zanahoria</li>
            </ul>

            <span class="text-sm font-semibold text-green-700">Completado</span>
        </div>
    </div>
</div>
@endsection
