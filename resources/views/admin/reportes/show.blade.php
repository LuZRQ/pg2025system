@extends('layouts.crud') {{-- Ajusta si tu layout tiene otro nombre --}}

@section('content')
<div class="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-6">

    {{-- Encabezado --}}
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-brown-800 flex items-center gap-2">
            <i class="fa-solid fa-file-lines text-brown-600"></i>
            Detalles del Reporte
        </h2>

        <a href="{{ route('reportes.index') }}"
           class="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow">
            ← Volver
        </a>
    </div>

    {{-- Información del reporte --}}
    <div class="space-y-4 text-gray-700">

        <div>
            <span class="font-semibold text-brown-700">Tipo de Reporte:</span>
            <p>{{ $reporte->tipo }}</p>
        </div>

        <div>
            <span class="font-semibold text-brown-700">Periodo:</span>
            <p>{{ $reporte->periodo ?? '-' }}</p>
        </div>

        <div>
            <span class="font-semibold text-brown-700">Generado Por:</span>
            <p>{{ $reporte->generadoPor }}</p>
        </div>

        <div>
            <span class="font-semibold text-brown-700">Fecha de Generación:</span>
            <p>{{ $reporte->fechaGeneracion }}</p>
        </div>
    </div>

    {{-- Botones de descarga --}}
    @if($reporte->archivo)
        <div class="mt-8 flex gap-4">
            {{-- Descargar PDF --}}
            <a href="{{ asset('storage/reportes/' . $reporte->archivo) }}"
               class="px-5 py-2 bg-amber-800 hover:bg-amber-600 text-white font-semibold rounded-lg shadow flex items-center gap-2">
                <i class="fa-solid fa-download"></i>
                Descargar PDF
            </a>

            {{-- Si más adelante quieres Excel, duplicas este botón con otro archivo --}}
        </div>
    @else
        <div class="mt-8">
            <p class="text-gray-500 flex items-center gap-2">
                <i class="fa-regular fa-circle-xmark text-red-500"></i>
                No se adjuntó archivo a este reporte.
            </p>
        </div>
    @endif

</div>
@endsection
