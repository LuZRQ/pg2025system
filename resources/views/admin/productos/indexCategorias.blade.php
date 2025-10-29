@php
    $backRoute = route('productos.index');
    $title = 'Categorias';
@endphp
@extends('layouts.crud')

@section('content')
<div class="bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-6">
       
       <a href="{{ route('categorias.create') }}" 
   class="flex items-center gap-2 px-4 py-2 bg-amber-200 text-stone-800 font-medium rounded-lg hover:bg-amber-300 shadow">
   <span>➕</span> Crear Categoría
</a>

    </div>

    @if(session('exito'))
        <div class="mb-4 p-4 bg-green-100 text-green-800 rounded-lg shadow">
            {{ session('exito') }}
        </div>
    @endif

    
    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full text-left border-collapse">
            <thead class="bg-stone-100 text-stone-700 text-sm uppercase">
                <tr>
                    <th class="px-4 py-2">ID</th>
                    <th class="px-4 py-2">Nombre de la Categoría</th>
                    <th class="px-4 py-2">Descripción</th>
                    <th class="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody class="text-stone-700">
                @foreach ($categorias as $categoria)
                    <tr class="border-t hover:bg-stone-50">
                        <td class="px-4 py-2">{{ $categoria->idCategoria }}</td>
                        <td class="px-4 py-2 font-medium">{{ $categoria->nombreCategoria }}</td>
                        <td class="px-4 py-2">{{ $categoria->descripcion ?? '-' }}</td>
                        <td class="px-4 py-2 flex items-center gap-3">
                            <form action="{{ route('categorias.destroy', $categoria->idCategoria) }}" method="POST"
                                  onsubmit="return confirm('¿Seguro que quieres eliminar esta categoría?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:text-red-800">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection