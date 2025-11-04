@php
    $backRoute = route('productos.index');
    $title = 'Detalles del Producto';
@endphp
@extends('layouts.crud')

@section('content')
<div class="bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen p-6 rounded-lg shadow">

    <div class="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6">

        {{-- Nombre --}}
        <div>
            <label class="block font-medium text-stone-700 mb-1">Nombre:</label>
            <p>{{ $producto->nombre }}</p>
        </div>

        {{-- Precio principal (base) --}}
        <div>
            <label class="block font-medium text-stone-700 mb-1">Precio base:</label>
            <p>
                @if($producto->precio)
                    Bs. {{ number_format($producto->precio, 2) }}
                @else
                    <span class="text-stone-500 italic">No definido (usa variantes)</span>
                @endif
            </p>
        </div>

        {{-- Categoría --}}
        <div>
            <label class="block font-medium text-stone-700 mb-1">Categoría:</label>
            <p>{{ $producto->categoria->nombreCategoria ?? 'Sin categoría' }}</p>
        </div>

        {{-- Stock --}}
        <div>
            <label class="block font-medium text-stone-700 mb-1">Stock total:</label>
            <p>
                @if($producto->variantes->count() > 0)
                    {{ $producto->variantes->sum('stock') }}
                    <span class="text-sm text-stone-500">(suma de variantes)</span>
                @else
                    {{ $producto->stock }}
                @endif
            </p>
        </div>

        {{-- Estado --}}
        <div>
            <label class="block font-medium text-stone-700 mb-1">Estado:</label>
            <p>{{ $producto->estado == 1 ? 'Activo' : 'Inactivo' }}</p>
        </div>

        {{-- Imagen --}}
        <div class="mt-4">
            <label class="block font-medium text-stone-700 mb-1">Imagen:</label>
            @if ($producto->imagen)
                <img src="{{ asset('storage/' . $producto->imagen) }}" alt="{{ $producto->nombre }}"
                     class="w-32 h-32 rounded shadow border border-stone-300">
            @else
                <p class="text-stone-500 italic">Sin imagen</p>
            @endif
        </div>

        {{-- Descripción --}}
        <div class="md:col-span-2">
            <label class="block font-medium text-stone-700 mb-1">Descripción:</label>
            <p>{{ $producto->descripcion ?? 'Sin descripción' }}</p>
        </div>

        {{-- Variantes --}}
        @if($producto->variantes->count() > 0)
            <div class="md:col-span-2 mt-4">
                <label class="block font-medium text-stone-700 mb-2">Variantes:</label>
                <div class="overflow-x-auto">
                    <table class="min-w-full border border-stone-300 text-sm">
                        <thead class="bg-stone-100">
                            <tr>
                                <th class="border px-3 py-2 text-left">Tipo</th>
                                <th class="border px-3 py-2 text-left">Precio</th>
                                <th class="border px-3 py-2 text-left">Stock</th>
                                <th class="border px-3 py-2 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($producto->variantes as $var)
                                <tr>
                                    <td class="border px-3 py-1">{{ ucfirst($var->tipo) }}</td>
                                    <td class="border px-3 py-1">Bs. {{ number_format($var->precio, 2) }}</td>
                                    <td class="border px-3 py-1">{{ $var->stock }}</td>
                                    <td class="border px-3 py-1">
                                        {{ $var->estado ? 'Activo' : 'Inactivo' }}
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        @endif

    </div>

    <div class="mt-6">
        <a href="{{ route(request('redirect', 'productos.index')) }}"
           class="px-6 py-2 bg-stone-300 text-stone-800 font-medium rounded-lg hover:bg-stone-400 shadow">
            Volver
        </a>
    </div>

</div>
@endsection