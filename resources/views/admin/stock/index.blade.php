@extends('layouts.admin')
@php
    use Illuminate\Support\Str;
    $rol = trim(Str::ascii(Str::lower(auth()->user()->rol->nombre)));
@endphp


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
    @php
        $totalGeneralVendidos = 0;
    @endphp

    @foreach ($productos as $producto)
        @php
            // 🔹 Calcular stock general y vendidos (según tenga variantes o no)
            if ($producto->variantes->count() > 0) {
                $stockInicialProducto = $producto->stock;
                $totalVendidos = $producto->variantes->sum(fn($v) => $v->stock_inicial - $v->stock);
                $restanteGeneral = $stockInicialProducto - $totalVendidos;
            } else {
                $stockInicialProducto = $producto->stock ?? $producto->stock;
                $totalVendidos = $producto->vendidos_dia ?? ($producto->stock_inicial - $producto->stock);
                $restanteGeneral = $producto->stock_inicial;
            }

            $totalGeneralVendidos += $totalVendidos;

            $estadoClass = $restanteGeneral <= 0 ? 'bg-red-100 text-red-800'
                            : ($restanteGeneral < 5 ? 'bg-red-100 text-red-800'
                            : ($restanteGeneral < 10 ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'));
            $estadoTexto = $restanteGeneral <= 0 ? 'Agotado'
                            : ($restanteGeneral < 5 ? 'Crítico'
                            : ($restanteGeneral < 10 ? 'Bajo' : 'Disponible'));
        @endphp

        <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 class="font-semibold text-gray-800 text-lg">{{ $producto->nombre }}</h3>
            <p class="text-sm text-gray-600">
                Categoría: {{ $producto->categoria->nombreCategoria ?? 'Sin categoría' }}
            </p>

            {{-- Stock general --}}
            <p class="text-xs mt-2">
                Inicial: {{ $stockInicialProducto }} — 
                Vendidos: {{ $totalVendidos }} — 
                Restante: {{ $restanteGeneral }} — 
                <span class="px-1 rounded text-xs {{ $estadoClass }}">{{ $estadoTexto }}</span>
            </p>

            {{-- Variantes --}}
            @foreach($producto->variantes as $variante)
                @php
                    $vendidosVar = $variante->stock_inicial - $variante->stock;
                    $estadoVarClass = $variante->stock <= 0 ? 'bg-red-100 text-red-800' 
                                        : ($variante->stock < 5 ? 'bg-red-100 text-red-800' 
                                        : ($variante->stock < 10 ? 'bg-yellow-100 text-yellow-800' 
                                        : 'bg-green-100 text-green-800'));
                    $estadoVarTexto = $variante->stock <= 0 ? 'Agotado' 
                                        : ($variante->stock < 5 ? 'Crítico' 
                                        : ($variante->stock < 10 ? 'Bajo' : 'Disponible'));
                @endphp
                <p class="text-xs mt-1 pl-2 border-l-2 border-stone-300">
                    ↳ <span class="font-semibold">{{ ucfirst($variante->tipo) }}</span> — 
                    Inicial: {{ $variante->stock_inicial }} — 
                    Vendidos: {{ $vendidosVar }} — 
                    Restante: {{ $variante->stock }} — 
                    <span class="px-1 rounded text-xs {{ $estadoVarClass }}">{{ $estadoVarTexto }}</span> — 
                    Precio: Bs. {{ number_format($variante->precio, 2) }}
                </p>
            @endforeach

            {{-- Botones --}}
            <div class="flex space-x-2 mt-3">
                @if($rol === 'dueno')
                    <a href="{{ route('productos.editar', ['idProducto' => $producto->idProducto, 'redirect' => 'stock.index']) }}"
                        class="px-3 py-1 bg-amber-500 text-white rounded shadow hover:bg-amber-600">
                        <i class="fas fa-edit"></i>
                    </a>
                @endif
                @if(in_array($rol, ['dueno', 'cocina']))
                    <a href="{{ route('productos.ver', ['idProducto' => $producto->idProducto, 'redirect' => 'stock.index']) }}"
                        class="px-3 py-1 bg-stone-500 text-white rounded shadow hover:bg-stone-600">
                        <i class="fas fa-eye"></i>
                    </a>
                @endif
            </div>
        </div>
    @endforeach

    {{-- 🔹 Resumen total --}}
    <div class="col-span-1 sm:col-span-2 bg-stone-50 p-3 rounded-lg border text-center mt-4">
        <span class="font-semibold text-stone-700">Total vendidos hoy:</span>
        <span class="text-stone-900 font-bold">{{ $totalGeneralVendidos }}</span>
    </div>
</div>

{{-- Tabla para desktop --}}
<div class="hidden lg:block overflow-x-auto bg-white rounded-lg shadow-lg mt-4">
    @php
        $totalGeneralVendidos = 0;
    @endphp
    <table class="w-full text-left border-collapse">
        <thead class="bg-stone-100 text-stone-700 text-sm uppercase">
            <tr>
                <th class="px-4 py-2">Producto</th>
                <th class="px-4 py-2">Categoría</th>
                <th class="px-4 py-2">Stock Inicial</th>
                <th class="px-4 py-2">Vendidos</th>
                <th class="px-4 py-2">Restante</th>
                <th class="px-4 py-2">Estado</th>
                <th class="px-4 py-2">Precio</th>
                <th class="px-4 py-2">Acciones</th>
            </tr>
        </thead>
        <tbody class="text-stone-700">
            @foreach($productos as $producto)
                @php
                    if ($producto->variantes->count() > 0) {
                        $stockInicialProducto = $producto->stock;
                        $totalVendidos = $producto->variantes->sum(fn($v) => $v->stock_inicial - $v->stock);
                        $restanteGeneral = $stockInicialProducto - $totalVendidos;
                    } else {
                        $stockInicialProducto = $producto->stock ?? $producto->stock;
                        $totalVendidos = $producto->vendidos_dia ?? ($producto->stock_inicial - $producto->stock);
                        $restanteGeneral = $producto->stock_inicial;
                    }

                    $totalGeneralVendidos += $totalVendidos;

                    $estadoClass = $restanteGeneral <= 0 ? 'bg-red-100 text-red-800'
                                    : ($restanteGeneral < 5 ? 'bg-red-100 text-red-800'
                                    : ($restanteGeneral < 10 ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'));
                    $estadoTexto = $restanteGeneral <= 0 ? 'Agotado'
                                    : ($restanteGeneral < 5 ? 'Crítico'
                                    : ($restanteGeneral < 10 ? 'Bajo' : 'Disponible'));
                @endphp

                {{-- Fila resumen producto --}}
                <tr class="bg-stone-50 font-semibold">
                    <td class="px-4 py-2">{{ $producto->nombre }}</td>
                    <td class="px-4 py-2">{{ $producto->categoria->nombreCategoria ?? 'Sin categoría' }}</td>
                    <td class="px-4 py-2">{{ $stockInicialProducto }}</td>
                    <td class="px-4 py-2">{{ $totalVendidos }}</td>
                    <td class="px-4 py-2">{{ $restanteGeneral }}</td>
                    <td class="px-4 py-2">
                        <span class="px-2 py-1 text-xs rounded-full {{ $estadoClass }}">{{ $estadoTexto }}</span>
                    </td>
                    <td class="px-4 py-2">--</td>
                    <td class="px-4 py-2 flex items-center gap-3">
                        @if($rol === 'dueno')
                            <a href="{{ route('productos.editar', ['idProducto' => $producto->idProducto, 'redirect' => 'stock.index']) }}"
                                class="px-4 py-2 bg-amber-500 text-white rounded shadow hover:bg-amber-600">
                                <i class="fas fa-edit"></i>
                            </a>
                        @endif
                        @if(in_array($rol, ['dueno', 'cocina']))
                            <a href="{{ route('productos.ver', ['idProducto' => $producto->idProducto, 'redirect' => 'stock.index']) }}"
                                class="px-4 py-2 bg-stone-500 text-white rounded shadow hover:bg-stone-600">
                                <i class="fas fa-eye"></i>
                            </a>
                        @endif
                    </td>
                </tr>

                {{-- Variantes --}}
                @foreach($producto->variantes as $variante)
                    @php
                        $vendidosVar = $variante->stock_inicial - $variante->stock;
                        $estadoVarClass = $variante->stock <= 0 ? 'bg-red-100 text-red-800' 
                                            : ($variante->stock < 5 ? 'bg-red-100 text-red-800' 
                                            : ($variante->stock < 10 ? 'bg-yellow-100 text-yellow-800' 
                                            : 'bg-green-100 text-green-800'));
                        $estadoVarTexto = $variante->stock <= 0 ? 'Agotado' 
                                            : ($variante->stock < 5 ? 'Crítico' 
                                            : ($variante->stock < 10 ? 'Bajo' : 'Disponible'));
                    @endphp
                    <tr class="hover:bg-stone-50">
                        <td class="px-4 py-2 pl-6">↳ {{ ucfirst($variante->tipo) }}</td>
                        <td class="px-4 py-2">--</td>
                        <td class="px-4 py-2">{{ $variante->stock_inicial }}</td>
                        <td class="px-4 py-2">{{ $vendidosVar }}</td>
                        <td class="px-4 py-2">{{ $variante->stock }}</td>
                        <td class="px-4 py-2">
                            <span class="px-2 py-1 text-xs rounded-full {{ $estadoVarClass }}">{{ $estadoVarTexto }}</span>
                        </td>
                        <td class="px-4 py-2">Bs. {{ number_format($variante->precio, 2) }}</td>
                        <td class="px-4 py-2"></td>
                    </tr>
                @endforeach
            @endforeach
        </tbody>
        <tfoot class="bg-stone-100 text-stone-700 font-semibold">
            <tr>
                <td colspan="8" class="px-4 py-3 text-right">
                    Total vendidos hoy: <span class="text-stone-900 font-bold">{{ $totalGeneralVendidos }}</span>
                </td>
            </tr>
        </tfoot>
    </table>
</div>

</div>
@endsection