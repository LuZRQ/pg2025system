@extends('layouts.crud')

@section('content')
<div class="container mx-auto p-4">

    <!-- Cabecera -->
    <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <i class="fa-solid fa-file-pdf text-red-600"></i>
            {{ ucfirst(str_replace('_',' ',$reporte->tipo)) }}
        </h1>
        <p class="text-gray-600 mt-1">Periodo: {{ $reporte->periodo }}</p>
        <p class="text-gray-600">Generado por: {{ $reporte->generadoPor }}</p>
    </div>

   <!-- Botones de descarga -->
<div class="flex flex-wrap gap-4 mb-6">
    <a href="{{ route('reportes.downloadPDF', ['reporte' => $reporte->id]) }}" 
       class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow flex items-center gap-2">
        <i class="fas fa-file-pdf"></i> Descargar PDF
    </a>

    @if(in_array($reporte->tipo, ['ventas_dia','stock','productos_mes','ganancia_mes','alta_rotacion','baja_venta']))
        <a href="{{ route('reportes.downloadExcel', ['reporte' => $reporte->id]) }}" 
           class="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow flex items-center gap-2">
            <i class="fas fa-file-excel"></i> Descargar Excel
        </a>
    @endif
</div>


    <!-- PDF Viewer -->
    <div class="w-full h-[80vh] border rounded-xl shadow overflow-hidden">
        <iframe src="{{ asset('storage/' . $reporte->archivo) }}" 
                class="w-full h-full" frameborder="0"></iframe>
    </div>

</div>
@endsection
