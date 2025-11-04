@extends('layouts.admin')

@section('content')
@php
    $rol = Auth::user()->rol->nombre ?? '';
@endphp


<div class="bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen p-6 rounded-lg shadow">

    {{-- 🔍 Formulario de búsqueda --}}
    <form method="GET" action="{{ route('productos.index') }}" 
          class="flex flex-wrap items-center gap-3 mb-6">
        <input type="text" name="search" placeholder="Buscar producto..." 
               value="{{ request('search') }}"
               class="flex-1 px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none">

        <select name="categoria" 
                class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400">
            <option value="">Todas las categorías</option>
            @foreach ($categorias as $categoria)
                <option value="{{ $categoria->idCategoria }}" 
                        {{ request('categoria') == $categoria->idCategoria ? 'selected' : '' }}>
                    {{ $categoria->nombreCategoria }}
                </option>
            @endforeach
        </select>

        <select name="estado" 
                class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400">
            <option value="">Todos los estados</option>
            <option value="1" {{ request('estado') === '1' ? 'selected' : '' }}>Activo</option>
            <option value="0" {{ request('estado') === '0' ? 'selected' : '' }}>Inactivo</option>
        </select>

        <button type="submit" 
                class="px-5 py-2 bg-stone-700 text-white rounded-lg shadow hover:bg-stone-800">
            Buscar
        </button>
    </form>

    {{-- 🧭 Botones de acción --}}
    <div class="flex items-center gap-4 mb-6 flex-wrap">
        <a href="{{ route('productos.crear') }}"
           class="flex items-center gap-2 px-4 py-2 bg-amber-200 text-stone-800 font-medium rounded-lg hover:bg-amber-300 shadow">
            <i class="fas fa-plus"></i> Nuevo producto
        </a>

        <a href="{{ route('categorias.index') }}"
           class="flex items-center gap-2 px-4 py-2 bg-amber-100 text-stone-800 font-medium rounded-lg hover:bg-amber-200 shadow">
            <i class="fas fa-tags"></i> Nueva categoría
        </a>
    </div>

    {{-- 📱 Vista móvil --}}
    {{-- 📱 Vista móvil --}}
<div class="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
    @forelse ($productos as $producto)
        <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <div class="flex items-center gap-3 mb-2">
                {{-- Imagen --}}
                @if ($producto->imagen)
                    <img src="{{ asset('storage/' . $producto->imagen) }}" 
                         alt="{{ $producto->nombre }}"
                         class="w-12 h-12 object-cover rounded border border-stone-300 shadow-sm">
                @else
                    <div class="w-12 h-12 bg-stone-200 rounded flex items-center justify-center text-xs text-stone-500 border">
                        Sin imagen
                    </div>
                @endif

                {{-- Nombre + Precio o Variantes --}}
                <div>
                    <h3 class="font-semibold text-gray-800">{{ $producto->nombre }}</h3>

                    @if($producto->variantes->count() > 0)
                        <p class="text-xs text-gray-600 mt-0.5">
                            <span class="font-semibold">{{ $producto->variantes->count() }} variantes</span>
                        </p>
                        <ul class="text-[0.7rem] text-stone-600 mt-1 list-disc list-inside space-y-0.5">
                            @foreach($producto->variantes->take(2) as $v)
                                <li>{{ ucfirst($v->tipo) }} — Bs. {{ number_format($v->precio, 2) }}</li>
                            @endforeach
                            @if($producto->variantes->count() > 2)
                                <li class="italic text-stone-400">+{{ $producto->variantes->count() - 2 }} más...</li>
                            @endif
                        </ul>
                    @else
                        <p class="text-xs text-gray-500 mt-0.5">Bs. {{ number_format($producto->precio, 2) }}</p>
                    @endif
                </div>
            </div>

            {{-- Categoría --}}
            <p class="text-xs mb-1">
                Categoría: 
                <span class="px-2 py-1 rounded-full bg-amber-100 text-stone-800 text-[0.65rem]">
                    {{ $producto->categoria->nombreCategoria ?? 'Sin categoría' }}
                </span>
            </p>

            {{-- Estado --}}
            <p class="text-xs mb-2">
                Estado:
                @if ($producto->estado)
                    <span class="px-2 py-1 rounded-full bg-green-100 text-green-800 text-[0.65rem]">Activo</span>
                @else
                    <span class="px-2 py-1 rounded-full bg-red-100 text-red-800 text-[0.65rem]">Inactivo</span>
                @endif
            </p>

            {{-- ⚙️ Acciones --}}
            <div class="flex items-center gap-3 mt-2">
                <a href="{{ route('productos.ver', $producto->idProducto) }}" 
                   class="text-stone-600 hover:text-stone-800" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </a>

                @if ($rol === 'Dueno')
                    <a href="{{ route('productos.editar', $producto->idProducto) }}" 
                       class="text-blue-600 hover:text-blue-800" title="Editar">
                        <i class="fas fa-edit"></i>
                    </a>

                    <form action="{{ route('productos.eliminar', $producto->idProducto) }}" 
                          method="POST" 
                          class="form-eliminar" title="Eliminar">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </form>
                @endif
            </div>
        </div>
    @empty
        <p class="text-center text-gray-500 col-span-2">No se encontraron productos.</p>
    @endforelse
</div>


    {{-- 💻 Tabla en escritorio --}}
    <div class="hidden lg:block overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full text-left border-collapse">
          <thead class="bg-stone-100 text-stone-700 text-sm uppercase">
    <tr>
        <th class="px-4 py-2">Imagen</th>
        <th class="px-4 py-2">Nombre</th>
        <th class="px-4 py-2">Precio / Variantes</th>
        <th class="px-4 py-2">Categoría</th>
        <th class="px-4 py-2">Estado</th>
        <th class="px-4 py-2">Acciones</th>
    </tr>
</thead>
<tbody class="text-stone-700">
    @forelse ($productos as $producto)
        <tr class="border-t hover:bg-stone-50 transition">
            {{-- 🖼 Imagen --}}
            <td class="px-4 py-2 text-center">
                @if ($producto->imagen)
                    <img src="{{ asset('storage/' . $producto->imagen) }}" 
                         alt="{{ $producto->nombre }}"
                         class="w-12 h-12 object-cover rounded border border-stone-300 shadow-sm">
                @else
                    <div class="w-12 h-12 bg-stone-200 rounded flex items-center justify-center text-xs text-stone-500 border">
                        Sin imagen
                    </div>
                @endif
            </td>

            {{-- 📦 Nombre --}}
            <td class="px-4 py-2 font-medium">{{ $producto->nombre }}</td>

            {{-- 💰 Precio o variantes --}}
            <td class="px-4 py-2">
                @if($producto->variantes->count() > 0)
                    <div class="text-sm">
                        <span class="font-semibold">{{ $producto->variantes->count() }} variantes</span>
                        <ul class="mt-1 text-xs text-stone-600 list-disc list-inside space-y-0.5">
                            @foreach($producto->variantes->take(2) as $v)
                                <li>{{ ucfirst($v->tipo) }} — Bs. {{ number_format($v->precio, 2) }}</li>
                            @endforeach
                            @if($producto->variantes->count() > 2)
                                <li class="italic text-stone-400">+{{ $producto->variantes->count() - 2 }} más...</li>
                            @endif
                        </ul>
                    </div>
                @else
                    Bs. {{ number_format($producto->precio, 2) }}
                @endif
            </td>

            {{-- 🏷 Categoría --}}
            <td class="px-4 py-2">
                <span class="px-3 py-1 text-xs rounded-full bg-amber-100 text-stone-800">
                    {{ $producto->categoria->nombreCategoria ?? 'Sin categoría' }}
                </span>
            </td>

            {{-- ⚙ Estado --}}
            <td class="px-4 py-2">
                @if ($producto->estado)
                    <span class="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">Activo</span>
                @else
                    <span class="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">Inactivo</span>
                @endif
            </td>

            {{-- ✏️ Acciones --}}
            <td class="px-4 py-2 flex items-center gap-3">
                <a href="{{ route('productos.ver', $producto->idProducto) }}" 
                   class="text-stone-600 hover:text-stone-800" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </a>

                @if ($rol === 'Dueno')
                    <a href="{{ route('productos.editar', $producto->idProducto) }}" 
                       class="text-blue-600 hover:text-blue-800" title="Editar">
                        <i class="fas fa-edit"></i>
                    </a>

                    <form action="{{ route('productos.eliminar', $producto->idProducto) }}" 
                          method="POST" 
                          class="form-eliminar" title="Eliminar">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </form>
                @endif
            </td>
        </tr>
    @empty
        <tr>
            <td colspan="6" class="text-center py-4 text-gray-500">No se encontraron productos.</td>
        </tr>
    @endforelse
</tbody>

        </table>
    </div>

</div>
@endsection