@php
 $backRoute = route('categorias.index');
    $title = 'Nuevs categoria';
@endphp
@extends('layouts.crud')

@section('content')
<div class="bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen p-6 rounded-lg shadow">
    <h1 class="text-2xl font-bold text-amber-900 mb-6">➕ Crear Nueva Categoría</h1>

    @if ($errors->any())
        <div class="mb-4 p-4 bg-red-100 text-red-800 rounded-lg shadow">
            <ul class="list-disc list-inside">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('categorias.store') }}" method="POST" class="bg-white p-6 rounded-lg shadow-md border border-amber-200">
        @csrf
        <div class="mb-4">
            <label for="nombreCategoria" class="block text-sm font-semibold text-amber-900 mb-2">
                Nombre de la Categoría
            </label>
            <input type="text" name="nombreCategoria" id="nombreCategoria"
                   value="{{ old('nombreCategoria') }}"
                   class="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none">
        </div>
<div class="mb-4">
    <label for="descripcion" class="block text-sm font-semibold text-amber-900 mb-2">
        Descripción
    </label>
    <textarea name="descripcion" id="descripcion" rows="3"
              class="w-full border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              placeholder="Opcional">{{ old('descripcion') }}</textarea>
</div>

        <div class="flex gap-4">
            <button type="submit"
                    class="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                Guardar Categoría
            </button>
            <a href="{{ route('categorias.index') }}"
               class="px-5 py-2 bg-stone-300 text-stone-700 rounded-lg hover:bg-stone-400 transition-colors">
               Cancelar
            </a>
        </div>
    </form>
</div>
@endsection