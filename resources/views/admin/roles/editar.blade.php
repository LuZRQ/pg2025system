@extends('layouts.crud')

@section('content')
<div class="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-stone-800">Editar Rol</h2>
    </div>

    @if ($errors->any())
        <div class="mb-4 p-4 bg-rose-100 text-rose-800 rounded">
            <ul class="list-disc pl-5">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('roles.actualizar', $rol->idRol) }}" method="POST" class="space-y-4">
        @csrf
        @method('PUT')
        <div class="grid grid-cols-1 gap-4">
            <div>
                <label for="nombre" class="block text-sm font-medium text-stone-700">Nombre del Rol</label>
                <input type="text" name="nombre" id="nombre" value="{{ old('nombre', $rol->nombre) }}"
                       class="mt-1 block w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200">
            </div>

            <div>
                <label for="descripcion" class="block text-sm font-medium text-stone-700">Descripción</label>
                <textarea name="descripcion" id="descripcion" rows="3"
                          class="mt-1 block w-full border border-stone-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200">{{ old('descripcion', $rol->descripcion) }}</textarea>
            </div>
        </div>

        <div class="mt-6 flex justify-end">
            <button type="submit"
                    class="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-white font-semibold rounded-lg shadow">
                Actualizar Rol
            </button>
        </div>
    </form>
</div>
@endsection
