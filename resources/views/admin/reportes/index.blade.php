{{-- resources/views/reportes/index.blade.php --}}
@extends('layouts.admin')

@section('content')
    {{-- Header --}}
    <div class="flex justify-center mb-6 border-b border-amber-200 pb-4">
        <h1 class="font-bold text-2xl md:text-3xl text-amber-900">📊 Módulo de Reportes</h1>
    </div>

    {{-- Métricas principales --}}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {{-- Total Ventas --}}
        <div class="relative bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
            <p class="text-sm text-gray-500">Total Ventas del Día</p>
            <h2 class="text-2xl font-bold text-amber-900">Bs. {{ number_format($totalVentasDia, 2) }}</h2>
            <div class="absolute top-4 right-4 bg-amber-100 p-3 rounded-full">
                <i class="fas fa-sack-dollar text-amber-900"></i>
            </div>
        </div>

        {{-- Pedidos Atendidos --}}
        <div class="relative bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
            <p class="text-sm text-gray-500">Pedidos Atendidos del Día</p>
            <h2 class="text-2xl font-bold text-amber-900">{{ $pedidosAtendidosDia }}</h2>
            <div class="absolute top-4 right-4 bg-amber-100 p-3 rounded-full">
                <i class="fas fa-file-alt text-amber-900"></i>
            </div>
        </div>

        {{-- Producto Más Vendido --}}
        <div class="relative bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
            <p class="text-sm text-gray-500">Producto Más Vendido del Día</p>
            <h2 class="text-lg font-semibold text-amber-900">{{ $productoMasVendido->nombre ?? '-' }}</h2>
            <p class="text-sm text-gray-600">{{ $productoMasVendido->cantidad ?? 0 }} unidades</p>
            <div class="absolute top-4 right-4 bg-amber-100 p-3 rounded-full">
                <i class="fas fa-crown text-amber-900"></i>
            </div>
        </div>
    </div>

    {{-- Gráficos --}}
    {{-- Gráficos --}}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        {{-- Ventas por Semana --}}
        <div class="bg-white p-6 rounded-2xl shadow border border-amber-200">
            <h3 class="font-semibold text-amber-900 mb-4">Ventas Últimos 7 Días</h3>
            <div class="h-64 relative">
                <canvas id="chartVentasSemana"></canvas>
                @if (count($ventasSemana) === 0)
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                        <i class="fas fa-chart-line text-4xl mb-2"></i>
                        <p>No hay ventas registradas recientemente.</p>
                    </div>
                @endif
            </div>
        </div>

        {{-- Top 5 Productos --}}
        <div class="bg-white p-6 rounded-2xl shadow border border-amber-200">
            <h3 class="font-semibold text-amber-900 mb-4">Top 5 Productos del Día</h3>
            <div class="h-64 relative">
                <canvas id="chartTop5"></canvas>
                @if (count($top5Productos) === 0)
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                        <i class="fas fa-box-open text-4xl mb-2"></i>
                        <p>Aún no hay productos vendidos hoy.</p>
                    </div>
                @endif
            </div>
        </div>

    </div>


    {{-- Deja este dataset oculto tal cual --}}
    <div id="data-reportes" data-top5='@json($top5Productos)' data-ventas-semana='@json($ventasSemana)'>
    </div>


    {{-- Alertas de Stock --}}
    <div class="bg-white p-6 rounded-2xl shadow border border-amber-200 mb-10">
        <h3 class="font-semibold text-amber-900 mb-4">Alertas de Stock Crítico</h3>
        <div class="space-y-3">
            @forelse($stockCritico as $p)
                <div class="flex items-center gap-3 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                    <span class="text-red-600"><i class="fas fa-exclamation-triangle"></i></span>
                    <p class="text-gray-700">{{ $p->nombre }} está en stock crítico ({{ $p->stock }})</p>
                </div>
            @empty
                <p class="text-gray-500">No hay productos con stock crítico hoy.</p>
            @endforelse
        </div>
    </div>

    {{-- Reportes para Descargar --}}
    <div class="flex flex-wrap gap-4 mt-4">
        {{-- Ventas PDF/Excel --}}
        <a href="{{ route('reportes.ventasPDF') }}"
            class="px-6 py-2 bg-amber-900 hover:bg-amber-700 text-white font-medium rounded-lg shadow flex items-center gap-2">
            <i class="fas fa-download"></i> Ventas (PDF)
        </a>
        <a href="{{ route('reportes.ventasDiaExcel') }}"
            class="px-6 py-2 bg-amber-700 hover:bg-amber-500 text-white font-medium rounded-lg shadow flex items-center gap-2">
            <i class="fas fa-file-excel"></i> Ventas (Excel)
        </a>

        {{-- Stock PDF/Excel --}}
        <a href="{{ route('reportes.stockPDF') }}"
            class="px-6 py-2 bg-amber-900 hover:bg-amber-700 text-white font-medium rounded-lg shadow flex items-center gap-2">
            <i class="fas fa-download"></i> Stock (PDF)
        </a>
        <a href="{{ route('reportes.stockExcel') }}"
            class="px-6 py-2 bg-amber-700 hover:bg-amber-500 text-white font-medium rounded-lg shadow flex items-center gap-2">
            <i class="fas fa-file-excel"></i> Stock (Excel)
        </a>

        {{-- Resumen mensual PDF/Excel --}}
        {{-- Resumen mensual PDF/Excel --}}
        <a href="{{ route('reportes.ventasMesPDF') }}"
            class="px-6 py-2 bg-amber-900 hover:bg-amber-700 text-white font-medium rounded-lg shadow flex items-center gap-2">
            <i class="fas fa-download"></i> Resumen Mensual (PDF)
        </a>
        <a href="{{ route('reportes.ventasMesExcel') }}"
            class="px-6 py-2 bg-amber-700 hover:bg-amber-500 text-white font-medium rounded-lg shadow flex items-center gap-2">
            <i class="fas fa-file-excel"></i> Resumen Mensual (Excel)
        </a>

    </div>

    <div class="max-w-7xl mx-auto px-6 py-10">

        <!-- Título -->
        <h2 class="text-2xl font-bold text-brown-800 mb-2 flex items-center gap-2">
            <i class="fa-solid fa-file-lines text-brown-600"></i>
            Buscar Reportes Históricos
        </h2>
        <p class="text-sm text-gray-600 mb-6">
            Encuentra reportes generados anteriormente por rango de fechas.
        </p>

        <!-- Filtros -->
        <form method="GET" action="{{ route('reportes.index') }}" class="bg-brown-50 rounded-xl p-6 shadow-md mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

                <!-- Categorías -->
                <div>
                    <label class="block text-sm font-medium text-brown-700 mb-1">Categoría</label>
                    <select name="categoria"
                        class="w-full rounded-lg border-gray-300 focus:ring focus:ring-brown-300 text-sm">
                        <option value="">Todas las categorías</option>
                        <option value="resumen">Resumen Semanal</option>
                        <option value="cierre">Cierre Mensual</option>
                        <option value="inventario">Inventario</option>
                    </select>
                </div>

                <!-- Fecha desde -->
                <div>
                    <label class="block text-sm font-medium text-brown-700 mb-1">Desde</label>
                    <input type="date" name="desde" value="{{ request('desde') }}"
                        class="w-full rounded-lg border-gray-300 focus:ring focus:ring-brown-300 text-sm">
                </div>

                <!-- Fecha hasta -->
                <div>
                    <label class="block text-sm font-medium text-brown-700 mb-1">Hasta</label>
                    <input type="date" name="hasta" value="{{ request('hasta') }}"
                        class="w-full rounded-lg border-gray-300 focus:ring focus:ring-brown-300 text-sm">
                </div>

                <!-- Botón -->
                <div>
                    <button type="submit"
                        class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brown-600 to-brown-500 hover:from-brown-700 hover:to-brown-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        Buscar
                    </button>
                </div>
            </div>
        </form>

        <!-- Tabla -->
        <div class="overflow-x-auto bg-white rounded-xl shadow-md">
            <table class="w-full text-sm text-left border-collapse">
                <thead class="bg-gradient-to-r from-brown-700 to-brown-600 text-white">
                    <tr>
                        <th class="px-4 py-3 font-semibold">Fecha del Reporte</th>
                        <th class="px-4 py-3 font-semibold">Tipo de Reporte</th>
                        <th class="px-4 py-3 font-semibold text-center">Acción</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    @forelse($reportes as $reporte)
                        <tr class="hover:bg-brown-50 transition">
                            <td class="px-4 py-3 text-gray-700">{{ $reporte->fecha }}</td>
                            <td class="px-4 py-3 text-gray-700">{{ $reporte->tipo }}</td>
                            <td class="px-4 py-3 text-center">
                                <a href="{{ route('reportes.show', $reporte->id) }}"
                                    class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-brown-500 hover:bg-brown-600 rounded-md shadow-sm transition">
                                    <i class="fa-solid fa-eye"></i> Ver
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3" class="px-4 py-6 text-center text-gray-500">
                                <i class="fa-regular fa-circle-xmark text-gray-400 mr-2"></i>
                                No se encontraron reportes en el rango seleccionado.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

    </div>
@endsection
