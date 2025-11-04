@php
    $backRoute = route('productos.index');
    $title = 'Nuevo Producto';
@endphp

@extends('layouts.crud')

@section('content')
<div class="bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen p-6 rounded-lg shadow">

    <form action="{{ route('productos.guardar') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            {{-- 🏷️ Nombre --}}
            <div>
                <label class="block mb-2 font-medium text-stone-700">Nombre</label>
                <input type="text" name="nombre" value="{{ old('nombre') }}"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                @error('nombre')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
{{-- Precio base (solo si no hay variantes) --}}
<div>
    <label class="block mb-2 font-medium text-stone-700">Precio base (opcional)</label>
    <input type="number" step="0.01" min="1" name="precio" value="{{ old('precio') }}"
        placeholder="Precio si no tiene variantes"
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
    <p class="text-xs text-stone-500 mt-1">
                    *Opcional si el producto no tiene variantes con precios distintos.
                </p>
        @error('precio')
        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
    @enderror
</div>

          

            {{-- 📦 Stock inicial --}}
            <div>
                <label class="block mb-2 font-medium text-stone-700">Stock Inicial</label>
                <input type="number" name="stock" value="{{ old('stock') }}" min="0"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                @error('stock')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- 🗂️ Categoría --}}
            <div>
                <label class="block mb-2 font-medium text-stone-700">Categoría</label>
                <select name="categoriaId"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                    <option value="">Seleccione una categoría</option>
                    @foreach ($categorias as $categoria)
                        <option value="{{ $categoria->idCategoria }}"
                            {{ old('categoriaId') == $categoria->idCategoria ? 'selected' : '' }}>
                            {{ $categoria->nombreCategoria }}
                        </option>
                    @endforeach
                </select>
                @error('categoriaId')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- ⚙️ Estado --}}
            <div>
                <label class="block mb-2 font-medium text-stone-700">Estado</label>
                <select name="estado"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                    <option value="1" {{ old('estado', 1) == 1 ? 'selected' : '' }}>Activo</option>
                    <option value="0" {{ old('estado', 1) == 0 ? 'selected' : '' }}>Inactivo</option>
                </select>
                @error('estado')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- 🖼️ Imagen --}}
            <div>
                <label class="block mb-2 font-medium text-stone-700">Imagen</label>
                <input type="file" name="imagen"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                @error('imagen')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- 📝 Descripción --}}
            <div class="md:col-span-2">
                <label class="block mb-2 font-medium text-stone-700">Descripción</label>
                <textarea name="descripcion" rows="3"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">{{ old('descripcion') }}</textarea>
                @error('descripcion')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- 🌈 Variantes dinámicas --}}
            <div class="md:col-span-2">
                <label class="block mb-2 font-medium text-stone-700">Variantes (Tipo y Precio)</label>
                <div id="variantes-wrapper" class="space-y-2">
                    <div class="flex gap-2 items-center variante-item">
                        <select name="variantes[0][tipo]"
                            class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                            <option value="caliente">Caliente</option>
                            <option value="frio">Frío</option>
                        </select>
                        <input type="number" step="0.01" min="0" name="variantes[0][precio]" 
                            placeholder="Precio" 
                            class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                        <input type="number" min="0" name="variantes[0][stock]" 
                            placeholder="Stock" 
                            class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                        <button type="button" class="bg-red-500 text-white px-2 rounded remove-variante">Eliminar</button>
                    </div>
                </div>

                <button type="button" id="add-variante" 
                    class="mt-2 px-4 py-2 bg-amber-200 rounded hover:bg-amber-300 text-stone-800">
                    ➕ Agregar Variante
                </button>
                <p class="text-xs text-stone-500 mt-1">Puedes dejar sin variantes si el producto tiene un precio único.</p>
            </div>

        </div>

        {{-- 🔘 Botones --}}
        <div class="mt-6 flex gap-4">
            <button type="submit"
                class="px-6 py-2 bg-amber-200 text-stone-800 font-medium rounded-lg hover:bg-amber-300 shadow">
                Guardar
            </button>
            <a href="{{ route('productos.index') }}"
                class="px-6 py-2 bg-stone-300 text-stone-800 font-medium rounded-lg hover:bg-stone-400 shadow">
                Cancelar
            </a>
        </div>
    </form>
</div>

{{-- 🧠 Script para agregar/remover variantes dinámicas --}}
@push('scripts')
<script>
    let index = 1;
    const wrapper = document.getElementById('variantes-wrapper');

    document.getElementById('add-variante').addEventListener('click', () => {
        const div = document.createElement('div');
        div.classList.add('flex', 'gap-2', 'items-center', 'variante-item');
        div.innerHTML = `
            <select name="variantes[${index}][tipo]" 
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                <option value="caliente">Caliente</option>
                <option value="frio">Frío</option>
            </select>
            <input type="number" step="0.01" min="0" name="variantes[${index}][precio]" 
                placeholder="Precio" 
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
            <input type="number" min="0" name="variantes[${index}][stock]" 
                placeholder="Stock" 
                class="px-2 py-1 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
            <button type="button" class="bg-red-500 text-white px-2 rounded remove-variante">Eliminar</button>
        `;
        wrapper.appendChild(div);
        index++;
    });

    document.addEventListener('click', e => {
        if (e.target.classList.contains('remove-variante')) {
            e.target.closest('.variante-item').remove();
        }
    });
</script>
@endpush

@endsection