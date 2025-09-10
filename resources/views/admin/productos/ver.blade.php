@extends('layouts.crud')

@section('content')
<div class="bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen p-6 rounded-lg shadow">
    <h1 class="text-2xl font-bold text-stone-800 mb-6">Detalles del Producto</h1>

    <div class="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label class="block font-medium text-stone-700 mb-1">Nombre:</label>
            <p>{{ $producto->nombre }}</p>
        </div>
        <div>
            <label class="block font-medium text-stone-700 mb-1">Precio:</label>
            <p>Bs. {{ number_format($producto->precio, 2) }}</p>
        </div>
        <div>
            <label class="block font-medium text-stone-700 mb-1">Categoría:</label>
            <p>{{ $producto->categoria->nombreCategoria ?? 'Sin categoría' }}</p>
        </div>
        <div>
            <label class="block font-medium text-stone-700 mb-1">Stock:</label>
            <p>{{ $producto->stock }}</p>
        </div>
        <div class="md:col-span-2">
            <label class="block font-medium text-stone-700 mb-1">Descripción:</label>
            <p>{{ $producto->descripcion ?? 'Sin descripción' }}</p>
        </div>
    </div>

    <div class="mt-6">
        <a href="{{ route('productos.index') }}" class="px-6 py-2 bg-stone-300 text-stone-800 font-medium rounded-lg hover:bg-stone-400 shadow">
            Volver
        </a>
    </div>
</div>


<img src="{{ asset('images/' . $producto->imagen) }}" alt="{{ $producto->nombre }}" class="w-12 h-12 rounded">

@endsection
