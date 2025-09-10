{{-- resources/views/ventas/index.blade.php --}}
@extends('layouts.admin')

@section('content')
<div class="p-6 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 min-h-screen">

    {{-- Header --}}
    <div class="flex justify-between items-center mb-6 border-b pb-4">
        <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-amber-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="font-bold text-xl text-amber-900">☕ Gestión de Ventas</span>
        </div>
        <div class="text-sm text-amber-800 font-semibold">
            (Caiero) Juan Pérez
        </div>
    </div>

    <div class="grid grid-cols-12 gap-6">

        {{-- Productos --}}
        <div class="col-span-8">
            {{-- Categorías --}}
            <div class="flex flex-wrap space-x-2 mb-6">
                <button class="px-4 py-2 rounded-lg bg-amber-700 text-white shadow hover:bg-amber-800">Todo</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Cafés</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Capuchinos</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Lattes</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Tés</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Panqueques</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Empanadas fritas</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Pastelería</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Sándwiches</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Malteadas</button>
                <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200">Bebidas</button>
            </div>

            {{-- Cards de productos --}}
            <div class="grid grid-cols-3 gap-6">
                {{-- Producto 1 --}}
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200">
                    <div class="h-32 bg-gradient-to-tr from-amber-200 to-amber-400"></div>
                    <div class="p-4">
                        <h3 class="font-semibold text-lg text-amber-900">Capuchino Tradicional</h3>
                        <p class="text-sm text-amber-700">Bs. 15</p>
                        <button class="w-full mt-3 flex justify-center items-center gap-2 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Agregar
                        </button>
                    </div>
                </div>

                {{-- Producto 2 --}}
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200">
                    <div class="h-32 bg-gradient-to-tr from-orange-200 to-amber-300"></div>
                    <div class="p-4">
                        <h3 class="font-semibold text-lg text-amber-900">Malteada de Oreo</h3>
                        <p class="text-sm text-amber-700">Bs. 12</p>
                        <button class="w-full mt-3 flex justify-center items-center gap-2 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Agregar
                        </button>
                    </div>
                </div>

                {{-- Producto 3 --}}
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200">
                    <div class="h-32 bg-gradient-to-tr from-amber-300 to-orange-400"></div>
                    <div class="p-4">
                        <h3 class="font-semibold text-lg text-amber-900">Empanada Frita</h3>
                        <p class="text-sm text-amber-700">Bs. 25</p>
                        <button class="w-full mt-3 flex justify-center items-center gap-2 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {{-- Pedido actual --}}
        <div class="col-span-4">
            <div class="bg-white rounded-2xl shadow-lg p-6 border border-amber-200">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="font-bold text-lg text-amber-900">Pedido Actual</h2>
                    <select class="border rounded-lg px-2 py-1 text-sm text-amber-800">
                        <option>Mesa: 001</option>
                        <option>Mesa: 002</option>
                        <option>Mesa: 003</option>
                    </select>
                </div>

                {{-- Item del pedido --}}
                <div class="flex justify-between items-center mb-3">
                    <div class="flex items-center gap-2">
                        <button class="px-2 py-1 bg-amber-200 rounded hover:bg-amber-300">-</button>
                        <span>1</span>
                        <button class="px-2 py-1 bg-amber-200 rounded hover:bg-amber-300">+</button>
                        <span class="text-amber-900 font-semibold">Café Latte</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-amber-700">Bs. 4.50</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 11v6m4-6v6" />
                        </svg>
                    </div>
                </div>

                {{-- Total --}}
                <div class="flex justify-between border-t pt-2 mb-4">
                    <span class="font-semibold text-amber-900">Total</span>
                    <span class="font-bold text-amber-800">Bs. 4.50</span>
                </div>

                {{-- Comentarios --}}
                <div class="mb-4">
                    <label class="block text-sm text-amber-700">Comentarios</label>
                    <textarea class="w-full border rounded-lg p-2 mt-1 text-sm" placeholder="Ej: sin picante, poca sal..."></textarea>
                </div>

                {{-- Botones --}}
                <div class="space-y-3">
                    <button class="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Enviar a Cocina
                    </button>
                    <button class="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancelar Pedido
                    </button>
                </div>
            </div>

            {{-- Extras --}}
            <div class="mt-6 space-y-3">
                <button class="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 shadow">Ver historial</button>
                <button class="w-full bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 shadow">Cobrado del pedido</button>
            </div>
        </div>
    </div>
</div>
@endsection
