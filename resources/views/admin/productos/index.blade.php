@extends('layouts.admin')

@section('content')
    <div class="bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen p-6 rounded-lg shadow">
        <h1 class="text-2xl font-bold text-stone-800 mb-6">Gestión de productos</h1>

        <!-- Filtros y búsqueda -->
        <!-- Filtros y búsqueda -->
        <form method="GET" action="{{ route('productos.index') }}" class="flex flex-wrap items-center gap-3 mb-6">
            <input type="text" name="search" placeholder="Buscar producto..." value="{{ request('search') }}"
                class="flex-1 px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">

            <select name="categoria" class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400">
                <option value="">Todas las categorías</option>
                @foreach ($categorias as $categoria)
                    <option value="{{ $categoria->idCategoria }}"
                        {{ request('categoria') == $categoria->idCategoria ? 'selected' : '' }}>
                        {{ $categoria->nombreCategoria }}
                    </option>
                @endforeach
            </select>

            <select name="estado" class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400">
                <option value="">Todos los estados</option>
                <option value="1" {{ request('estado') === '1' ? 'selected' : '' }}>Activo</option>
                <option value="0" {{ request('estado') === '0' ? 'selected' : '' }}>Inactivo</option>
            </select>

            <button type="submit" class="px-5 py-2 bg-stone-700 text-white rounded-lg shadow hover:bg-stone-800">
                Buscar
            </button>
        </form>


        <!-- Botón crear producto -->
        <div class="flex items-center gap-4 mb-6">
            <a href="{{ route('productos.crear') }}"
                class="flex items-center gap-2 px-4 py-2 bg-amber-200 text-stone-800 font-medium rounded-lg hover:bg-amber-300 shadow">
                <span>➕</span> Nuevo producto
            </a>
        </div>

        <!-- Tabla -->
        <div class="overflow-x-auto bg-white rounded-lg shadow">
            <table class="w-full text-left border-collapse">
                <thead class="bg-stone-100 text-stone-700 text-sm uppercase">
                    <tr>
                        <th class="px-4 py-2">Imagen</th>
                        <th class="px-4 py-2">Nombre</th>
                        <th class="px-4 py-2">Precio</th>
                        <th class="px-4 py-2">Categoría</th>
                        <th class="px-4 py-2">Estado</th>
                        <th class="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody class="text-stone-700">
                    @foreach ($productos as $producto)
                        <tr class="border-t hover:bg-stone-50">
                                  <!-- Imagen -->
            <td class="px-4 py-2">
                @if($producto->imagen)
                    <img src="{{ asset('images/' . $producto->imagen) }}" 
                         alt="{{ $producto->nombre }}" 
                         class="w-12 h-12 object-cover rounded">
                @else
                    <div class="w-12 h-12 bg-stone-200 rounded flex items-center justify-center text-xs text-stone-500">
                        Sin imagen
                    </div>
                @endif
            </td>
                            <td class="px-4 py-2 font-medium">{{ $producto->nombre }}</td>
                            <td class="px-4 py-2">Bs. {{ number_format($producto->precio, 2) }}</td>
                            <td class="px-4 py-2">
                                <span class="px-3 py-1 text-xs rounded-full bg-amber-100 text-stone-800">
                                    {{ $producto->categoria->nombreCategoria ?? 'Sin categoría' }}
                                </span>
                            </td>
                            <td class="px-4 py-2">
                                @if ($producto->estado ?? true)
                                    <!-- Suponiendo que tienes campo estado -->
                                    <span class="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Activo</span>
                                @else
                                    <span class="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">Inactivo</span>
                                @endif
                            </td>
                            <td class="px-4 py-2 flex items-center gap-3">
                                <!-- Ver -->
                                <a href="{{ route('productos.ver', $producto->idProducto) }}"
                                    class="text-stone-600 hover:text-stone-800">
                                    <i class="fas fa-eye"></i>
                                </a>
                                <!-- Editar -->
                                <a href="{{ route('productos.editar', $producto->idProducto) }}"
                                    class="text-blue-600 hover:text-blue-800">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <!-- Eliminar -->
                                <form action="{{ route('productos.eliminar', $producto->idProducto) }}" method="POST"
                                    onsubmit="return confirm('¿Seguro que quieres eliminar este producto?');">
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
