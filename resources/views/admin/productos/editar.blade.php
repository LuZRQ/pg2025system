@extends('layouts.crud')

@section('content')
    <div class="bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen p-6 rounded-lg shadow">
        <h1 class="text-2xl font-bold text-stone-800 mb-6">Editar Producto</h1>

        <form action="{{ route('productos.actualizar', $producto->idProducto) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nombre -->
                <div>
                    <label class="block mb-2 font-medium text-stone-700">Nombre</label>
                    <input type="text" name="nombre" value="{{ old('nombre', $producto->nombre) }}"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                    @error('nombre')
                        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Precio -->
                <div>
                    <label class="block mb-2 font-medium text-stone-700">Precio</label>
                    <input type="number" step="0.01" name="precio" value="{{ old('precio', $producto->precio) }}"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                    @error('precio')
                        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Stock -->
                <div>
                    <label class="block mb-2 font-medium text-stone-700">Stock Inicial</label>
                    <input type="number" name="stock" value="{{ old('stock', $producto->stock) }}" min="0"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                    @error('stock')
                        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Categoría -->
                <div>
                    <label class="block mb-2 font-medium text-stone-700">Categoría</label>
                    <select name="categoriaId"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                        <option value="">Seleccione una categoría</option>
                        @foreach ($categorias as $categoria)
                            <option value="{{ $categoria->idCategoria }}"
                                {{ old('categoriaId', $producto->categoriaId) == $categoria->idCategoria ? 'selected' : '' }}>
                                {{ $categoria->nombreCategoria }}
                            </option>
                        @endforeach
                    </select>
                    @error('categoriaId')
                        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Estado -->
                <div>
                    <label class="block mb-2 font-medium text-stone-700">Estado</label>
                    <select name="estado"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                        <option value="1" {{ old('estado', $producto->estado) == 1 ? 'selected' : '' }}>Activo
                        </option>
                        <option value="0" {{ old('estado', $producto->estado) == 0 ? 'selected' : '' }}>Inactivo
                        </option>
                    </select>
                    @error('estado')
                        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Imagen -->
                <div>
                    <label class="block mb-2 font-medium text-stone-700">Imagen</label>
                    <input type="file" name="imagen"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">
                    @if ($producto->imagen)
                        <img src="{{ asset('images/' . $producto->imagen) }}" alt="{{ $producto->nombre }}"
                            class="w-20 h-20 mt-2 rounded">
                    @endif
                    @error('imagen')
                        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Descripción -->
                <div class="md:col-span-2">
                    <label class="block mb-2 font-medium text-stone-700">Descripción</label>
                    <textarea name="descripcion" rows="3"
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">{{ old('descripcion', $producto->descripcion) }}</textarea>
                    @error('descripcion')
                        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>


            </div>

            <div class="mt-6 flex gap-4">
                <button type="submit"
                    class="px-6 py-2 bg-amber-200 text-stone-800 font-medium rounded-lg hover:bg-amber-300 shadow">
                    Actualizar
                </button>

                <a href="{{ route(request('redirect', 'productos.index')) }}"
                    class="px-6 py-2 bg-stone-300 text-stone-800 font-medium rounded-lg hover:bg-stone-400 shadow">
                    Cancelar
                </a>
            </div>

        </form>
    </div>
@endsection
