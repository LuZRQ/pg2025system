{{-- resources/views/ventas/index.blade.php --}}
@extends('layouts.admin')

@section('content')
    @php
        $rol = Auth::user()->rol?->nombre;
    @endphp

    <div class="p-4 sm:p-6 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 min-h-screen">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {{-- COLUMNA CATALOGO / MESERO --}}
            @if ($rol === 'Mesero')
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
                                        {{ request('categoria') == $categoria->idCategoria ? 'selected' : '' }}>
                                        {{ $categoria->nombreCategoria }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        {{-- Input de búsqueda --}}
                        <div class="flex-1">
                            <input name="buscar" id="buscar-producto" type="text" value="{{ request('buscar') }}"
                                placeholder="Buscar producto..."
                                class="w-full border rounded-lg px-3 py-2 text-sm shadow-sm text-amber-800 focus:ring-2 focus:ring-amber-400"
                                onkeydown="if(event.key === 'Enter') this.form.submit()">
                        </div>
                    </form>

                    {{-- 🛍️ Catálogo de productos --}}
                    <div id="catalogo" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">

                        @forelse ($productos as $producto)
                           <div class="producto-card bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-amber-200 transform hover:scale-[1.02] transition-all duration-200 ease-in-out"
    data-categoria="{{ $producto->categoriaId }}">
    
    {{-- Imagen --}}
    <div class="h-28 sm:h-32 bg-gradient-to-tr from-amber-200 to-amber-400 flex items-center justify-center overflow-hidden">
        <img src="{{ $producto->imagen ? asset('storage/' . $producto->imagen) : asset('images/default.png') }}"
            alt="{{ $producto->nombre }}" class="h-full w-full object-cover">
    </div>

    {{-- Contenido --}}
    <div class="p-4">
        <h3 class="font-semibold text-base sm:text-lg text-amber-900 truncate"
            title="{{ $producto->nombre }}">
            {{ $producto->nombre }}
        </h3>

        <p class="text-sm text-amber-700 mb-2">
            Bs. {{ number_format($producto->precio, 2) }}
        </p>

        {{-- 🔽 Mostrar el select de variantes si existen --}}
        @if ($producto->variantes && $producto->variantes->count() > 0)
            <select class="select-variante w-full mb-2 border rounded-lg px-2 py-1 text-sm text-amber-800"
                data-producto-id="{{ $producto->idProducto }}">
                <option value="" disabled selected>Seleccione variante</option>
                @foreach ($producto->variantes as $variante)
                    <option value="{{ $variante->idVariante }}" data-precio="{{ $variante->precio }}">
                        {{ ucfirst($variante->tipo) }} - Bs. {{ number_format($variante->precio, 2) }}
                    </option>
                @endforeach
            </select>
        @endif

        {{-- Botón agregar --}}
      <button
    class="btn-agregar w-full flex justify-center items-center gap-2 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors"
    data-id="{{ $producto->idProducto }}"
    data-nombre="{{ $producto->nombre }}"
    data-precio="{{ $producto->precio }}"
    data-stock="{{ $producto->stock_inicial }}" {{-- stock del producto --}}
    @if ($producto->variantes && $producto->variantes->count() > 0)
        data-tiene-variantes="true"
       data-variantes="{{ json_encode($producto->variantes->map(fn($v) => [
    'idVariante' => $v->idVariante,
    'nombre' => ucfirst($v->tipo),
    'precio' => $v->precio,
    'stock' => $v->stock,
])) }}"

    @endif
>
    Agregar
</button>

    </div>
</div>

                        @empty
                            <p
                                class="col-span-full text-center text-amber-800 bg-amber-50 border border-amber-200 rounded-lg py-4">
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
{{-- COLUMNA PEDIDO / ACCIONES --}}
<div class="{{ $rol === 'Mesero' ? 'lg:col-span-4' : 'lg:col-span-12' }}">

    @if ($rol === 'Mesero')
        <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-amber-200">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 class="font-bold text-lg text-amber-900">Pedido Actual</h2>

        <select id="select-mesa" class="border rounded-lg px-2 py-1 text-sm text-amber-800">
            @for ($i = 1; $i <= 10; $i++)
                <option>Mesa: {{ str_pad($i, 3, '0', STR_PAD_LEFT) }}</option>
            @endfor
        </select>
    </div>

    {{-- 🧾 Encabezado visual para UX --}}
    <div class="flex justify-between text-sm text-amber-700 font-semibold border-b pb-1 mb-2">
        <span>Producto</span>
        <span>Cant.</span>
    </div>

    {{-- 🧩 Aquí se insertan los ítems dinámicos --}}
    <div id="pedido-items" class="space-y-2"></div>

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




                @if (session('ultimoPedidoId') && $rol !== 'Cliente' && $rol !== 'Cocina')
                    <div class="mt-4">
                        <a href="{{ route('ventas.pedido.reimprimir') }}" target="_blank"
                            class="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                            Reimprimir Último Pedido
                        </a>
                    </div>
                @endif
                {{-- Historial y caja para Cajero/Dueño --}}
                @if ($rol === 'Cajero' || $rol === 'Dueno')
                    <div class="mt-6 space-y-3">


                        <a href="{{ route('ventas.historial') }}"
                            class="block w-full text-center bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 shadow">
                            Ver historial
                        </a>

                        <a href="{{ route('ventas.caja') }}"
                            class="block w-full text-center bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 shadow">
                            Control de caja
                        </a>
                        {{-- Botón Reimprimir para Cajero/Dueño --}}

                    </div>
                @endif
            </div>

        </div>

        {{-- Pedidos actuales (solo Mesero) --}}
        @if ($rol === 'Mesero')
            <div class="mb-10">
                <h2 class="text-xl font-semibold text-stone-700 mb-3">Pedidos en curso (Hoy)</h2>

              @php
    $hoy = \Carbon\Carbon::today();
    $pedidosHoy = $pedidosActuales->filter(fn($p) => \Carbon\Carbon::parse($p->fechaCreacion)->isToday());
@endphp


                @if ($pedidosHoy->isEmpty())
                    <p class="text-stone-500">No tienes pedidos en curso hoy.</p>
                @else
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-orange-50 to-yellow-100">

                        @foreach ($pedidosHoy as $pedido)
                            @php
                                switch ($pedido->estado) {
                                    case 'pendiente':
                                        $bg = 'from-red-50 to-red-100';
                                        $border = 'border-red-400';
                                        $text = 'text-red-600';
                                        $icon = 'fa-circle-exclamation';
                                        $glow = 'drop-shadow-[0_0_6px_rgba(255,0,0,0.4)]';
                                        break;
                                    case 'pagado':
                                        $bg = 'from-green-50 to-green-100';
                                        $border = 'border-green-400';
                                        $text = 'text-green-600';
                                        $icon = 'fa-circle-check';
                                        $glow = 'drop-shadow-[0_0_6px_rgba(0,255,0,0.4)]';
                                        break;
                                    case 'listo':
                                        $bg = 'from-blue-50 to-blue-100';
                                        $border = 'border-blue-300';
                                        $text = 'text-blue-600';
                                        $icon = 'fa-clipboard-check';
                                        $glow = '';
                                        break;
                                    default:
                                        $bg = 'from-gray-50 to-gray-100';
                                        $border = 'border-gray-300';
                                        $text = 'text-gray-700';
                                        $icon = 'fa-box';
                                        $glow = '';
                                }
                            @endphp

                            <div
                                class="relative bg-gradient-to-br {{ $bg }} {{ $border }} border rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                                <!-- Icono decorativo -->
                                <div class="absolute -top-4 -right-4 text-4xl opacity-15 select-none">
                                    <i class="fa-solid {{ $icon }}"></i>
                                </div>

                                <!-- Cabecera -->
                                <div class="flex items-center justify-between mb-3">
                                   <h3 class="text-lg font-semibold {{ $text }}">
    Pedido N° {{ $pedido->numero_diario ?? $pedido->idPedido }} - Mesa {{ $pedido->mesa }}
</h3>

                                    <span
                                        class="px-2 py-1 text-xs font-semibold rounded-full bg-white/80 border border-white {{ $text }} {{ $glow }}">
                                        {{ ucfirst($pedido->estado) }}
                                    </span>
                                </div>

                                <!-- Lista de productos -->
                                <ul class="text-sm text-gray-700 mb-4 space-y-1">
                                    @foreach ($pedido->detalles as $detalle)
                                        <li class="flex items-center gap-2">
                                            <i class="fa-solid fa-utensils text-gray-400"></i>
                                            <span>{{ $detalle->producto->nombre }}
                                                <span class="text-gray-500">(x{{ $detalle->cantidad }})</span>
                                            </span>
                                        </li>
                                    @endforeach
                                </ul>

                                <!-- Fecha -->
                                <div class="text-xs text-gray-500 flex items-center gap-2">
                                    <i class="fa-regular fa-calendar-days"></i>
                                    <span>{{ \Carbon\Carbon::parse($pedido->fechaCreacion)->format('d/m/Y H:i') }}</span>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @endif

                {{-- Contador de pedidos de hoy --}}
                <p class="mt-3 text-sm text-gray-600">
                    Total pedidos del día: {{ $pedidosHoy->count() }}
                </p>
            </div>
        @endif

        {{-- Pedidos listos (todos pueden verlos) --}}
@php
    $hoy = \Carbon\Carbon::today();
    $pedidosListosHoy = $pedidos->filter(fn($p) => \Carbon\Carbon::parse($p->fechaCreacion)->isToday());
@endphp


<div class="mt-10 bg-white shadow rounded-2xl p-4 sm:p-6 border border-amber-200">
    <h2 class="font-bold text-lg text-amber-900 mb-4">📋 Pedidos Listos en Cocina (Hoy)</h2>

    @if($pedidosListosHoy->isEmpty())
        <p class="text-gray-500">No hay pedidos listos hoy.</p>
    @else
        <div id="pedidos-listos" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            @foreach($pedidosListosHoy as $pedido)
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

                    {{-- Botón cancelar pedido --}}
                    <form action="{{ route('ventas.cancelar.pedido', $pedido->idPedido) }}" method="POST"
                          onsubmit="return confirm('¿Seguro que deseas cancelar este pedido?');">
                        @csrf
                        @method('PUT')
                        <input type="hidden" name="estado" value="cancelado">
                        <button type="submit"
                            class="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg">
                            Cancelar pedido
                        </button>
                    </form>
                </div>
            @endforeach
        </div>

        {{-- Contador de pedidos listos hoy --}}
        <p class="mt-3 text-sm text-gray-600">
            Total pedidos listos hoy: {{ $pedidosListosHoy->count() }}
        </p>
    @endif
</div>


    </div>

    <script>
        // Filtrar por categoría
        document.getElementById('select-categoria')?.addEventListener('change', function() {
            const categoriaSeleccionada = this.value;
            document.querySelectorAll('.producto-card').forEach(card => {
                card.style.display =
                    (categoriaSeleccionada === 'all' || card.dataset.categoria === categoriaSeleccionada) ?
                    'block' :
                    'none';
            });
        });

        // Buscar producto
        document.getElementById('buscar-producto')?.addEventListener('input', function() {
            const texto = this.value.toLowerCase();
            document.querySelectorAll('.producto-card').forEach(card => {
                const nombre = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = nombre.includes(texto) ? 'block' : 'none';
            });
        });


</script>


@endsection
