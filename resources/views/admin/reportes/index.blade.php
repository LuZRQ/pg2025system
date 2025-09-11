{{-- resources/views/reportes/index.blade.php --}}
@extends('layouts.admin')

@section('content')
<div class="p-6 bg-amber-100 min-h-screen">

    {{-- Header --}}
    <div class="flex justify-center mb-6 border-b pb-4">
        <h1 class="font-bold text-2xl text-amber-900">📊 Módulo de Reportes</h1>
    </div>

    {{-- Métricas principales --}}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {{-- Total Ventas --}}
        <div class="relative bg-white p-6 rounded-xl shadow-lg border border-green-200">
            <p class="text-sm text-gray-500">Total Ventas</p>
            <h2 class="text-2xl font-bold text-green-700">Bs. 12,458.90</h2>
            <p class="text-green-600 text-sm font-medium mt-2">+12.5% vs mes anterior</p>

            {{-- Ícono --}}
            <div class="absolute top-4 right-4 bg-green-100 p-3 rounded-full">
               <i class="fas fa-sack-dollar text-green-700"></i>


            </div>
        </div>

        {{-- Pedidos Atendidos --}}
        <div class="relative bg-white p-6 rounded-xl shadow-lg border border-blue-200">
            <p class="text-sm text-gray-500">Pedidos Atendidos</p>
            <h2 class="text-2xl font-bold text-blue-700">847</h2>
            <p class="text-green-600 text-sm font-medium mt-2">+8.2% vs mes anterior</p>

            {{-- Ícono --}}
            <div class="absolute top-4 right-4 bg-blue-100 p-3 rounded-full">
              <i class="fas fa-file-alt text-blue-700"></i>

            </div>
        </div>

        {{-- Producto Más Vendido --}}
        <div class="relative bg-white p-6 rounded-xl shadow-lg border border-yellow-200">
            <p class="text-sm text-gray-500">Producto Más Vendido</p>
            <h2 class="text-lg font-semibold text-yellow-700">Frappé Caramelo</h2>
            <p class="text-sm text-gray-600">324 unidades</p>

            {{-- Ícono --}}
            <div class="absolute top-4 right-4 bg-yellow-100 p-3 rounded-full">
               <i class="fas fa-crown text-yellow-600"></i>

            </div>
        </div>
    </div>

    {{-- Gráficos --}}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div class="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h3 class="font-semibold text-gray-700 mb-4">Ventas por Día</h3>
            <div class="h-48 flex items-center justify-center text-gray-400">
                <span class="italic">[Gráfico de barras]</span>
            </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h3 class="font-semibold text-gray-700 mb-4">Top 5 Productos</h3>
            <div class="h-48 flex items-center justify-center text-gray-400">
                <span class="italic">[Gráfico de pastel]</span>
            </div>
        </div>
    </div>

    {{-- Generar reportes --}}
    <div class="bg-white p-6 rounded-xl shadow border border-gray-200 mb-10">
        <h3 class="font-semibold text-gray-700 mb-4">Generar Reportes</h3>
        <div class="flex flex-wrap gap-4">
            <button class="px-6 py-2 bg-amber-900 hover:bg-amber-700 text-white font-medium rounded-lg shadow"><i class="fas fa-download text-white-600"></i>


 Reporte de Ventas</button>
            <button class="px-6 py-2 bg-amber-900 hover:bg-amber-700 text-white font-medium rounded-lg shadow"><i class="fas fa-download text-white-600"></i>
 Reporte de Pedidos</button>
            <button class="px-6 py-2 bg-amber-900 hover:bg-amber-700 text-white font-medium rounded-lg shadow"><i class="fas fa-download text-white-600"></i>
 Reporte de Stock</button>
            <button class="px-6 py-2 bg-amber-900 hover:bg-amber-700 text-white font-medium rounded-lg shadow"><i class="fas fa-download text-white-600"></i>
 Resumen Mensual</button>
        </div>
    </div>

    {{-- Alertas --}}
    <div class="bg-white p-6 rounded-xl shadow border border-gray-200 mb-10">
        <h3 class="font-semibold text-gray-700 mb-4">Alertas</h3>
        <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <span class="text-red-600"><i class="fas fa-exclamation-triangle text-red-600"></i>
</span>
                <p class="text-gray-700">El stock de capuchino está en estado crítico</p>
            </div>
            <div class="flex items-center gap-3 p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <span class="text-green-600"><i class="fas fa-chart-line text-green-600"></i>
</span>
                <p class="text-gray-700">Los frappés aumentaron en popularidad esta semana</p>
            </div>
            <div class="flex items-center gap-3 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <span class="text-yellow-600"><i class="fas fa-chart-line text-red-600 rotate-180"></i>
</span>
                <p class="text-gray-700">Se detectó una baja en la venta de sándwiches del 15%</p>
            </div>
        </div>
    </div>

    {{-- Reportes históricos --}}
    <div class="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 class="font-semibold text-gray-700 mb-4">Buscar Reportes Históricos</h3>
        <p class="text-sm text-gray-500 mb-4">Encuentra reportes generados anteriormente por rango de fechas</p>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <select class="border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>Todas las categorías</option>
            </select>
            <input type="date" class="border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <input type="date" class="border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <button class="px-6 py-2 bg-indigo-900 hover:bg-indigo-500 text-white font-medium rounded-lg shadow">Buscar</button>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full border-collapse">
                <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="px-4 py-2 border">Fecha del Reporte</th>
                        <th class="px-4 py-2 border">Tipo de Reporte</th>
                        <th class="px-4 py-2 border">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-gray-800">
                        <td class="px-4 py-2 border">2025-04-05</td>
                        <td class="px-4 py-2 border">Resumen Semanal</td>
                        <td class="px-4 py-2 border text-blue-600 font-medium"><a href="#">Ver</a></td>
                    </tr>
                    <tr class="text-gray-800">
                        <td class="px-4 py-2 border">2025-04-01</td>
                        <td class="px-4 py-2 border">Cierre Mensual</td>
                        <td class="px-4 py-2 border text-blue-600 font-medium"><a href="#">Ver</a></td>
                    </tr>
                    <tr class="text-gray-800">
                        <td class="px-4 py-2 border">2025-03-21</td>
                        <td class="px-4 py-2 border">Resumen Semanal</td>
                        <td class="px-4 py-2 border text-blue-600 font-medium"><a href="#">Ver</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection
