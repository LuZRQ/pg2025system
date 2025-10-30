@extends('layouts.admin')

@section('content')
<div class="bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen p-6 rounded-lg shadow">

    {{-- Alertas de stock bajo --}}
    @foreach ($productos as $producto)
        @if ($producto->stock <= 5)
            <div class="mb-4">
                <div class="flex items-center gap-3 
                    {{ $producto->stock <= 3 ? 'bg-red-100 border-red-400 text-red-800 animate-pulse' : 'bg-yellow-100 border-yellow-400 text-yellow-800' }}
                    border-l-4 px-4 py-3 rounded shadow">
                    <i class="fas fa-exclamation-triangle text-xl"></i>
                    <span class="font-medium">¡Atención!</span>
                    El stock de <b>{{ $producto->nombre }}</b> está bajo ({{ $producto->stock }} unidades restantes).
                </div>
            </div>
        @endif
    @endforeach

    {{-- Formulario de búsqueda --}}
    <form method="GET" action="{{ route('stock.index') }}" class="flex flex-wrap items-center gap-3 mb-6">
        <input type="text" name="buscar" value="{{ request('buscar') }}" placeholder="Buscar producto..."
            class="flex-1 px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-sm">
        <select name="categoria"
            class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400 shadow-sm">
            <option value="">Todas las categorías</option>
            @foreach ($productos->pluck('categoria.nombreCategoria')->unique()->filter()->sort() as $categoria)
                <option value="{{ $categoria }}" {{ request('categoria') == $categoria ? 'selected' : '' }}>
                    {{ $categoria }}
                </option>
            @endforeach
        </select>

        <select name="estado"
            class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400 shadow-sm">
            <option value="">Todos los estados</option>
            <option value="rojo" {{ request('estado') == 'rojo' ? 'selected' : '' }}>🔴 Agotado</option>
            <option value="amarillo" {{ request('estado') == 'amarillo' ? 'selected' : '' }}>🟡 Bajo Stock</option>
            <option value="verde" {{ request('estado') == 'verde' ? 'selected' : '' }}>🟢 Disponible</option>
        </select>

        <button type="submit"
            class="px-5 py-2 bg-stone-700 text-white rounded-lg shadow hover:bg-stone-800 transition duration-200">
            Buscar
        </button>
    </form>

    {{-- Tarjetas móviles/tablet --}}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
        @foreach ($productos as $producto)
            @php
                $vendidos = $producto->stock_inicial - $producto->stock;
                $restante = $producto->stock;
            @endphp
            <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                <h3 class="font-semibold text-gray-800 text-lg">{{ $producto->nombre }}</h3>
                <p class="text-sm text-gray-600">Categoría: {{ $producto->categoria->nombreCategoria ?? 'Sin categoría' }}</p>
                <p class="text-sm text-gray-600">Stock Inicial: {{ $producto->stock_inicial }}</p>
                <p class="text-sm text-gray-600">Vendidos: {{ $vendidos }}</p>
                <p class="text-sm text-gray-600">Restante: {{ $restante }}</p>
                <p class="text-sm mt-1">
                    Estado:
                    <span class="px-2 py-1 rounded-full text-xs 
                        {{ $producto->getEstadoStock() === 'rojo' ? 'bg-red-100 text-red-800' : ($producto->getEstadoStock() === 'amarillo' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800') }}">
                        {{ ucfirst($producto->getEstadoStock()) }}
                    </span>
                </p>
                <div class="flex space-x-2 mt-3">
                    <a href="{{ route('productos.editar', ['idProducto' => $producto->idProducto, 'redirect' => 'stock.index']) }}"
                        class="px-3 py-1 bg-amber-500 text-white rounded shadow hover:bg-amber-600">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a href="{{ route('productos.ver', ['idProducto' => $producto->idProducto, 'redirect' => 'stock.index']) }}"
                        class="px-3 py-1 bg-stone-500 text-white rounded shadow hover:bg-stone-600">
                        <i class="fas fa-eye"></i>
                    </a>
                </div>
            </div>
        @endforeach
    </div>

    {{-- Tabla para desktop --}}
    <div class="hidden lg:block overflow-x-auto bg-white rounded-lg shadow-lg mt-4">
        <table class="w-full text-left border-collapse">
            <thead class="bg-stone-100 text-stone-700 text-sm uppercase">
                <tr>
                    <th class="px-4 py-2">Producto</th>
                    <th class="px-4 py-2">Categoría</th>
                    <th class="px-4 py-2">Stock Inicial</th>
                    <th class="px-4 py-2">Vendidos</th>
                    <th class="px-4 py-2">Restante</th>
                    <th class="px-4 py-2">Estado</th>
                    <th class="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody class="text-stone-700">
                @foreach ($productos as $producto)
                    @php
                        $vendidos = $producto->stock_inicial - $producto->stock;
                        $restante = $producto->stock;
                    @endphp
                    <tr class="border-t hover:bg-stone-50 transition-colors duration-200">
                        <td class="px-4 py-2 font-medium">{{ $producto->nombre }}</td>
                        <td class="px-4 py-2">{{ $producto->categoria->nombreCategoria ?? 'Sin categoría' }}</td>
                        <td class="px-4 py-2">{{ $producto->stock_inicial }}</td>
                        <td class="px-4 py-2">{{ $vendidos }}</td>
                        <td class="px-4 py-2">{{ $restante }}</td>
                        <td class="px-4 py-2">
                            @if ($producto->getEstadoStock() === 'rojo')
                                <span class="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 flex items-center gap-1">
                                    <i class="fas fa-circle text-red-500 text-[0.6rem]"></i> ¡Agotado!
                                </span>
                            @elseif ($producto->getEstadoStock() === 'amarillo')
                                <span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1">
                                    <i class="fas fa-circle text-yellow-500 text-[0.6rem]"></i> Bajo stock
                                </span>
                            @else
                                <span class="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                                    <i class="fas fa-circle text-green-500 text-[0.6rem]"></i> Disponible
                                </span>
                            @endif
                        </td>
                        <td class="px-4 py-2 flex items-center gap-3">
                            <a href="{{ route('productos.editar', ['idProducto' => $producto->idProducto, 'redirect' => 'stock.index']) }}"
                                class="px-4 py-2 bg-amber-500 text-white rounded shadow hover:bg-amber-600">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="{{ route('productos.ver', ['idProducto' => $producto->idProducto, 'redirect' => 'stock.index']) }}"
                                class="px-4 py-2 bg-stone-500 text-white rounded shadow hover:bg-stone-600">
                                <i class="fas fa-eye"></i>
                            </a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

</div>
@endsection
