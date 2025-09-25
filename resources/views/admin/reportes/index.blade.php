{{-- resources/views/reportes/index.blade.php --}}
@extends('layouts.admin')

@section('content')
    <div class="p-6 bg-amber-50 min-h-screen">

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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {{-- Ventas por Semana --}}
            <div class="bg-white p-6 rounded-2xl shadow border border-amber-200">
                <h3 class="font-semibold text-amber-900 mb-4">Ventas Últimos 7 Días</h3>
                <section id="G5" class="h-64"></section>
            </div>

            {{-- Top 5 Productos --}}
            <div class="bg-white p-6 rounded-2xl shadow border border-amber-200">
                <h3 class="font-semibold text-amber-900 mb-4">Top 5 Productos del Día</h3>
                <section id="GRTORTA" class="h-64"></section>
            </div>
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
            <a href="{{ route('reportes.resumenPDF') }}"
                class="px-6 py-2 bg-amber-900 hover:bg-amber-700 text-white font-medium rounded-lg shadow flex items-center gap-2">
                <i class="fas fa-download"></i> Resumen Mensual (PDF)
            </a>
            <a href="{{ route('reportes.resumenExcel') }}"
                class="px-6 py-2 bg-amber-700 hover:bg-amber-500 text-white font-medium rounded-lg shadow flex items-center gap-2">
                <i class="fas fa-file-excel"></i> Resumen Mensual (Excel)
            </a>
        </div>


    </div>

       <div id="data-reportes"
     data-top5='@json($top5Productos)'
     data-ventas-semana='@json($ventasSemana)'>
</div>

@endsection
