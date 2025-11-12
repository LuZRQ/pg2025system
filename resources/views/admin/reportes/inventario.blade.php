@php
    $backRoute = route('reportes.index'); 
    $title = 'Reportes actuales'; 
@endphp
@extends('layouts.crud')

@section('content')
<div class="p-6 space-y-6">

    {{-- 🔹 Encabezado --}}
    <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-3">
            <img src="{{ asset('logo.png') }}" alt="Logo Empresa" class="h-10 w-10">
            <h1 class="text-2xl font-bold text-gray-800">Dashboard de Reportes</h1>
        </div>

        <nav class="flex gap-4">
            <a href="{{ route('ventas.index') }}" class="text-blue-600 hover:underline">Ventas</a>
            <a href="{{ route('reportes.inventario') }}" class="text-blue-600 hover:underline">Inventario</a>
            <a href="{{ route('reportes.index') }}" class="text-blue-600 hover:underline">Reportes</a>
        </nav>
    </div>

    {{-- 🔹 Filtro de fechas --}}
    <form method="GET" action="{{ route('reportes.inventario') }}" class="flex flex-wrap gap-4 items-end">
        <div>
            <label class="block text-sm font-medium text-gray-700">Rango de Tiempo</label>
            <select name="fecha_predefinida" class="border p-2 rounded">
                <option value="">-- Personalizado --</option>
                <option value="hoy" {{ request('fecha_predefinida') == 'hoy' ? 'selected' : '' }}>Hoy</option>
                <option value="semana" {{ request('fecha_predefinida') == 'semana' ? 'selected' : '' }}>Esta Semana</option>
                <option value="mes" {{ request('fecha_predefinida') == 'mes' ? 'selected' : '' }}>Este Mes</option>
                <option value="anio" {{ request('fecha_predefinida') == 'anio' ? 'selected' : '' }}>Este Año</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Desde</label>
            <input type="date" name="desde" value="{{ request('desde') }}" class="border p-2 rounded">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700">Hasta</label>
            <input type="date" name="hasta" value="{{ request('hasta') }}" class="border p-2 rounded">
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1">
            <i class="fas fa-magnifying-glass"></i> Filtrar
        </button>
    </form>

    {{-- 🔹 KPIs principales --}}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
            <p class="text-gray-500 text-sm">Total Ventas</p>
            <h2 class="text-xl font-bold text-gray-800">Bs. {{ $totalVentas ?? 0 }}</h2>
            <small class="text-gray-400">En el período seleccionado</small>
        </div>

        <div class="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
            <p class="text-gray-500 text-sm">Producto más vendido</p>
            <h2 class="text-xl font-bold text-gray-800">{{ $productoTop->nombre ?? '-' }}</h2>
            <small class="text-gray-400">{{ $productoTop->vendidos ?? 0 }} unidades</small>
        </div>

        <div class="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
            <p class="text-gray-500 text-sm">Productos críticos</p>
            <h2 class="text-xl font-bold text-red-600">{{ $productosCriticos ?? 0 }}</h2>
            <small class="text-gray-400">Stock ≤ 5 unidades</small>
        </div>

        <div class="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
            <p class="text-gray-500 text-sm">Productos activos</p>
            <h2 class="text-xl font-bold text-gray-800">{{ $productos->count() }}</h2>
            <small class="text-gray-400">Con stock disponible</small>
        </div>
    </div>

    {{-- 🔹 Tabla de inventario --}}
    <div class="bg-white shadow-md rounded-xl p-4 border border-gray-200 overflow-x-auto mt-6">
        <table class="min-w-full border-collapse">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border p-2 text-left">Producto</th>
                    <th class="border p-2 text-center">Categoría</th>
                    <th class="border p-2 text-center">Stock Inicial</th>
                    <th class="border p-2 text-center">Vendidos</th>
                    <th class="border p-2 text-center">Restante</th>
                    <th class="border p-2 text-center">Estado</th>
                </tr>
            </thead>
            <tbody>
                @foreach($productos as $producto)
                    {{-- Producto base --}}
                    <tr class="hover:bg-gray-50 transition">
                        <td class="border p-2 font-semibold">{{ $producto->nombre }}</td>
                        <td class="border p-2 text-center">{{ $producto->categoria->nombreCategoria ?? '-' }}</td>
                        <td class="border p-2 text-center font-semibold">{{ $producto->stock ?? 0 }}</td>
                        <td class="border p-2 text-center text-blue-700 font-semibold">{{ $producto->stock_inicial - $producto->stock ?? 0 }}</td>
                        <td class="border p-2 text-center text-green-700 font-semibold">{{ $producto->stock_inicial ?? 0 }}</td>
                        <td class="border p-2 text-center">
                            @if($producto->stock_inicial <= 5)
                                <span class="px-3 py-1 bg-red-500 text-white text-xs rounded-full">Crítico</span>
                            @else
                                <span class="px-3 py-1 bg-green-500 text-white text-xs rounded-full">Normal</span>
                            @endif
                        </td>
                    </tr>

                    {{-- Variantes --}}
                    @foreach($producto->variantes as $variante)
                        <tr class="bg-gray-50 hover:bg-gray-100 transition">
                            <td class="border p-2">— {{ $variante->tipoFormateado() }}</td>
                            <td class="border p-2 text-center">{{ $producto->categoria->nombreCategoria ?? '-' }}</td>
                            <td class="border p-2 text-center font-semibold">{{ $variante->stock_inicial ?? 0 }}</td>
                            <td class="border p-2 text-center text-blue-700 font-semibold">{{ $variante->stock_inicial - $variante->stock ?? 0 }}</td>
                            <td class="border p-2 text-center text-green-700 font-semibold">{{ $variante->stock ?? 0 }}</td>
                            <td class="border p-2 text-center">
                                @if($variante->stock <= 5)
                                    <span class="px-3 py-1 bg-red-500 text-white text-xs rounded-full">Crítico</span>
                                @else
                                    <span class="px-3 py-1 bg-green-500 text-white text-xs rounded-full">Normal</span>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                @endforeach
            </tbody>
        </table>
    </div>

    {{-- 🔹 Gráfico de ventas --}}
    <div class="bg-white shadow-md rounded-xl p-4 border border-gray-200 mt-6">
        <h3 class="text-lg font-semibold mb-4">Ventas por Producto</h3>
        <canvas id="ventasChart" height="100"></canvas>
    </div>

</div>


<canvas id="ventasPorProducto"></canvas>

<script>
    const ctx = document.getElementById('ventasPorProducto').getContext('2d');
    const ventasChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: {!! json_encode($productos->pluck('nombre')) !!},
            datasets: [{
                label: 'Unidades Vendidas',
                data: {!! json_encode($productos->pluck('vendidos')) !!},
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
</script>



@endsection

