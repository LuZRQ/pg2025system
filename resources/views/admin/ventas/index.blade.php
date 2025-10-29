{{-- resources/views/ventas/index.blade.php --}}
@extends('layouts.admin')

@section('content')
@php
    $rol = Auth::user()->rol?->nombre;
@endphp

<div class="p-4 sm:p-6 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 min-h-screen">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {{-- COLUMNA CATALOGO / MESERO --}}
        @if($rol === 'Mesero')
        <div class="lg:col-span-8">
            {{-- 🔍 Filtros superiores --}}
            <form method="GET" action="{{ route('ventas.index') }}" id="filtroForm"
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

                {{-- Select de categorías --}}
                <div class="flex items-center gap-2 w-full sm:w-auto">
                    <label for="select-categoria" class="font-semibold text-amber-900 whitespace-nowrap">
                        Categoría:
                    </label>
                    <select name="categoria" id="select-categoria"
                        class="border rounded-lg px-3 py-2 text-sm text-amber-800 shadow-sm focus:ring-2 focus:ring-amber-400 w-full sm:w-auto"
                        onchange="document.getElementById('filtroForm').submit()">
                        <option value="all">Todas</option>
                        @foreach ($categorias as $categoria)
                            <option value="{{ $categoria->idCategoria }}"
                                {{ (request('categoria') == $categoria->idCategoria) ? 'selected' : '' }}>
                                {{ $categoria->nombreCategoria }}
                            </option>
                        @endforeach
                    </select>
                </div>

                {{-- Input de búsqueda --}}
                <div class="flex-1">
                    <input name="buscar" id="buscar-producto" type="text"
                        value="{{ request('buscar') }}"
                        placeholder="Buscar producto..."
                        class="w-full border rounded-lg px-3 py-2 text-sm shadow-sm text-amber-800 focus:ring-2 focus:ring-amber-400"
                        onkeydown="if(event.key === 'Enter') this.form.submit()">
                </div>
            </form>

            {{-- 🛍️ Catálogo de productos --}}
            <div id="catalogo" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                @forelse ($productos as $producto)
                    <div class="producto-card bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-amber-200 transform hover:scale-[1.02] transition-all duration-200 ease-in-out"
                        data-categoria="{{ $producto->categoriaId }}">
                        <div class="h-28 sm:h-32 bg-gradient-to-tr from-amber-200 to-amber-400 flex items-center justify-center overflow-hidden">
                            <img src="{{ $producto->imagen ? asset('storage/' . $producto->imagen) : asset('images/default.png') }}"
                                alt="{{ $producto->nombre }}" class="h-full w-full object-cover">
                        </div>

                        <div class="p-4">
                            <h3 class="font-semibold text-base sm:text-lg text-amber-900 truncate" title="{{ $producto->nombre }}">
                                {{ $producto->nombre }}
                            </h3>
                            <p class="text-sm text-amber-700">Bs. {{ number_format($producto->precio, 2) }}</p>
                            <button
                                class="btn-agregar w-full mt-3 flex justify-center items-center gap-2 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors"
                                data-id="{{ $producto->idProducto }}" data-nombre="{{ $producto->nombre }}"
                                data-precio="{{ $producto->precio }}">
                                Agregar
                            </button>
                        </div>
                    </div>
                @empty
                    <p class="col-span-full text-center text-amber-800 bg-amber-50 border border-amber-200 rounded-lg py-4">
                        No se encontraron productos.
                    </p>
                @endforelse
            </div>

            {{-- 📄 Paginación --}}
            <div class="flex justify-center mt-8 mb-20">
                {{ $productos->appends(request()->query())->links() }}
            </div>
        </div>
        @endif

        {{-- COLUMNA PEDIDO / ACCIONES --}}
<div class="{{ $rol === 'Mesero' ? 'lg:col-span-4' : 'lg:col-span-12' }}">

            @if($rol === 'Mesero')
            <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-amber-200">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                    <h2 class="font-bold text-lg text-amber-900">Pedido Actual</h2>

                    <select id="select-mesa" class="border rounded-lg px-2 py-1 text-sm text-amber-800">
                        @for ($i = 1; $i <= 10; $i++)
                            <option>Mesa: {{ str_pad($i, 3, '0', STR_PAD_LEFT) }}</option>
                        @endfor
                    </select>
                </div>

                <div id="pedido-items"></div>

                <div class="flex justify-between border-t pt-2 mb-4">
                    <span class="font-semibold text-amber-900">Total</span>
                    <span id="pedido-total" class="font-bold text-amber-800">Bs. 0.00</span>
                </div>

                <div class="mb-4">
                    <label class="block text-sm text-amber-700">Comentarios</label>
                    <textarea id="comentario-text" class="w-full border rounded-lg p-2 mt-1 text-sm"
                        placeholder="Ej: sin picante, poca sal..."></textarea>
                </div>

                <div class="space-y-3">
                    <button type="button" id="btn-enviar-pedido"
                        class="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        Enviar a Cocina
                    </button>

                    <button type="button" id="btn-cancelar-pedido"
                        class="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                        Cancelar Pedido
                    </button>
                </div>

                <form id="form-enviar" action="{{ route('ventas.enviarACocina') }}" method="POST" class="hidden">
                    @csrf
                    <input type="hidden" name="mesa" id="mesa">
                    <input type="hidden" name="comentarios" id="comentarios-hidden">
                    <input type="hidden" name="productos" id="productos">
                </form>
            </div>
            @endif

            {{-- Historial y caja para Cajero/Dueño --}}
            @if($rol === 'Cajero' || $rol === 'Dueno')
            <div class="mt-6 space-y-3">
                @if(session('ultimoPedidoId'))
                    <a href="{{ route('ventas.pedido.reimprimir') }}" target="_blank"
                       class="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                       Reimprimir Último Pedido
                    </a>
                @endif

                <a href="{{ route('ventas.historial') }}"
                    class="block w-full text-center bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 shadow">
                    Ver historial
                </a>

                <a href="{{ route('ventas.caja') }}"
                    class="block w-full text-center bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 shadow">
                    Control de caja
                </a>
            </div>
            @endif
        </div>

    </div>

    {{-- Pedidos listos --}}
    <div class="mt-10 bg-white shadow rounded-2xl p-4 sm:p-6 border border-amber-200">
        <h2 class="font-bold text-lg text-amber-900 mb-4">📋 Pedidos Listos en Cocina</h2>
        <div id="pedidos-listos" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            @forelse($pedidos as $pedido)
                <div class="border rounded-lg p-4 shadow-sm">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-semibold text-amber-800">
                            Pedido N° {{ $pedido->numero_diario ?? $pedido->idPedido }}
                        </span>
                        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Listo</span>
                    </div>
                    <span class="text-sm text-amber-600 block mb-2">Mesa {{ $pedido->mesa }}</span>
                    <ul class="text-sm text-amber-700 mb-3">
                        @foreach ($pedido->detalles as $detalle)
                            <li>- {{ $detalle->cantidad }} x {{ $detalle->producto->nombre }}</li>
                        @endforeach
                    </ul>
                </div>
            @empty
                <p class="text-gray-500">No hay pedidos listos todavía.</p>
            @endforelse
        </div>
    </div>
</div>

<script>
    // Filtrar por categoría
    document.getElementById('select-categoria')?.addEventListener('change', function () {
        const categoriaSeleccionada = this.value;
        document.querySelectorAll('.producto-card').forEach(card => {
            card.style.display =
                (categoriaSeleccionada === 'all' || card.dataset.categoria === categoriaSeleccionada)
                    ? 'block'
                    : 'none';
        });
    });

    // Buscar producto
    document.getElementById('buscar-producto')?.addEventListener('input', function () {
        const texto = this.value.toLowerCase();
        document.querySelectorAll('.producto-card').forEach(card => {
            const nombre = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = nombre.includes(texto) ? 'block' : 'none';
        });
    });
</script>

@endsection
