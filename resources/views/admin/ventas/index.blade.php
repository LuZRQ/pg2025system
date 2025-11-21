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
                    <div class="flex justify-center mt-8 mb-8">
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
                    <div class="mt-4 mb-6">
                        <a href="{{ route('ventas.pedido.reimprimir') }}" target="_blank"
                            class="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                            Reimprimir Último Pedido
                        </a>
                    </div>
                @endif
                {{-- Historial y caja para Cajero/Dueño --}}
                @if ($rol === 'Cajero' || $rol === 'Dueno')
                    <div class="mt-6 space-y-3 mb-6">


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

        {{-- Pedidos actuales (solo Mesero) --}}
        @if ($rol === 'Mesero')
            <div class="mt-6 mb-10">
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
                                    <!-- Mesero -->


                                   <h3 class="text-lg font-semibold {{ $text }}">
    Pedido N° {{ $pedido->numero_diario ?? $pedido->idPedido }} - Mesa {{ $pedido->mesa }}
</h3>

                                    <span
                                        class="px-2 py-1 text-xs font-semibold rounded-full bg-white/80 border border-white {{ $text }} {{ $glow }}">
                                        {{ ucfirst($pedido->estado) }}
                                    </span>
                                </div>
<p class="text-xs text-gray-500 mb-2">
    👤 Mesero: {{ $pedido->usuario->nombre ?? 'Desconocido' }}
</p>
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

{{-- ===========================
     PEDIDOS LISTOS (HOY)
=========================== --}}
@php
    // Filtra los pedidos de hoy que tengan el estado 'listo' en el pedido o en los productos
    $pedidosListosHoy = $pedidos->filter(fn($p) =>
        \Carbon\Carbon::parse($p->fechaCreacion)->isToday() && // Solo pedidos de hoy
        (
            $p->estado == 'listo' || // Si el pedido tiene estado 'listo'
            $p->detalles->where('estado', 'listo')->count() > 0 // O si algún producto dentro del pedido tiene estado 'listo'
        )
    );
@endphp

<div class="mt-10 bg-white shadow rounded-2xl p-4 sm:p-6 border border-amber-200">
    <h2 class="font-bold text-lg text-amber-900 mb-4">
        📋 Pedidos Listos en Cocina (Hoy)
    </h2>

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
                        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            Listo
                        </span>
                    </div>

                    <span class="text-sm text-amber-600 block mb-2">Mesa {{ $pedido->mesa }}</span>

                    {{-- Mesero --}}
                    <p class="text-xs text-gray-500 mb-2">
                        👤 Mesero: {{ $pedido->usuario->nombre ?? 'Desconocido' }}
                    </p>

                    {{-- Detalles de los productos listos --}}
                    @if($pedido->detalles->where('estado', 'listo')->count() > 0)
                        <h4 class="text-sm text-green-700 font-semibold">Listos:</h4>
                        <ul class="text-sm text-green-800 mb-3">
                            @foreach($pedido->detalles->where('estado', 'listo') as $detalle)
                                <li>- {{ $detalle->cantidad }} x {{ $detalle->producto->nombre }}</li>
                            @endforeach
                        </ul>
                    @else
                        <p class="text-sm text-gray-500">No hay productos listos aún.</p>
                    @endif

                    {{-- Detalles pendientes --}}
                    @if($pedido->detalles->where('estado', 'pendiente')->count() > 0)
                        <h4 class="text-sm text-red-600 font-semibold">Pendientes:</h4>
                        <ul class="text-sm text-red-700 mb-3">
                            @foreach($pedido->detalles->where('estado', 'pendiente') as $detalle)
                                <li>- {{ $detalle->cantidad }} x {{ $detalle->producto->nombre }}</li>
                            @endforeach
                        </ul>
                    @else
                        <p class="text-sm text-gray-500">Todos los productos han sido procesados.</p>
                    @endif

                    {{-- BOTÓN ABRIR MODAL --}}
                    <button 
                        class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg w-full mt-2"
                        onclick="abrirModal({{ $pedido->idPedido }})">
                        ➕ Agregar productos
                    </button>

                    {{-- Botón cancelar --}}
                    <form action="{{ route('ventas.cancelar.pedido', $pedido->idPedido) }}" 
                          method="POST"
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

        <p class="mt-3 text-sm text-gray-600">
            Total pedidos listos hoy: {{ $pedidosListosHoy->count() }}
        </p>
    @endif
</div>



{{-- ===========================
        MODAL AGREGAR PRODUCTOS
=========================== --}}
<div id="modal-agregar-productos"
     class="hidden fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

    <div class="bg-white w-full max-w-5xl rounded-xl shadow-lg p-6 border border-amber-300">

        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-amber-900">Agregar productos al pedido</h2>
            <button type="button" onclick="cerrarModal()" class="text-red-600 font-bold text-lg">✖</button>
        </div>

        <form id="form-agregar-productos" method="POST" action="">
            @csrf

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {{-- ======================
                     CATALOGO PRODUCTOS
                ====================== --}}
                <div>
                    <label class="font-semibold text-amber-800">Categoría</label>
                    <select id="modal-categoria" class="w-full mb-3 border rounded-lg px-2 py-1">
                        <option value="all">Todas</option>
                        @foreach($categorias as $cat)
                            <option value="{{ $cat->idCategoria }}">{{ $cat->nombreCategoria }}</option>
                        @endforeach
                    </select>

                    <div id="modal-lista-productos"
                         class="space-y-2 max-h-[420px] overflow-y-auto">

                        @foreach ($productos as $producto)
                            <div class="p-3 border rounded-lg shadow-sm flex justify-between items-center"
                                 data-categoria="{{ $producto->categoriaId }}">

                                <div>
                                    <p class="font-semibold">{{ $producto->nombre }}</p>
                                    <p class="text-sm text-amber-700">
                                        Bs. {{ number_format($producto->precio, 2) }}
                                    </p>

                                    @if($producto->variantes && $producto->variantes->count())
                                        <select class="variante-modal w-full border rounded-lg mt-2 text-sm"
                                                data-producto="{{ $producto->idProducto }}">
                                            <option value="" selected>
                                                -- Seleccionar variante (opcional) --
                                            </option>
                                            @foreach($producto->variantes as $v)
                                                <option value="{{ $v->idVariante }}"
                                                        data-precio="{{ $v->precio }}"
                                                        data-tipo="{{ $v->tipo }}">
                                                    {{ ucfirst($v->tipo) }} - Bs {{ number_format($v->precio,2) }}
                                                </option>
                                            @endforeach
                                        </select>
                                    @endif
                                </div>

                                <div class="flex flex-col items-end gap-2">
                                    <input type="number" min="1" value="1"
                                           class="input-cantidad w-16 text-center border rounded"
                                           data-producto="{{ $producto->idProducto }}" />

                                    <button type="button"
                                            class="px-3 py-1 bg-amber-600 text-white rounded btn-add-modal"
                                            data-id="{{ $producto->idProducto }}"
                                            data-nombre="{{ $producto->nombre }}"
                                            data-precio="{{ $producto->precio }}">
                                        ➕ Agregar
                                    </button>
                                </div>
                            </div>
                        @endforeach

                    </div>
                </div>

                {{-- ======================
                     LISTA TEMPORAL
                ====================== --}}
                <div>
                    <h3 class="font-bold mb-2 text-amber-900">Productos nuevos</h3>

                    <div id="modal-productos-agregados" class="space-y-2">
                        <p class="text-gray-500">Aún no agregaste productos.</p>
                    </div>

                    <div class="mt-4">
                        <button type="button" onclick="vaciarLista()" 
                                class="px-3 py-2 bg-gray-300 rounded mr-2">
                            Vaciar
                        </button>

                        <button id="btnEnviarNuevos" type="submit" 
                                class="px-3 py-2 bg-green-600 text-white rounded">
                            Enviar a Cocina
                        </button>
                    </div>

                </div>

            </div>
        </form>

    </div>

</div>


{{-- ===========================
        SCRIPT DEL MODAL
=========================== --}}
<script>

     //////// ESTO ES DEL PEDIDO NUEVO PRINCIPAL////
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
//////// ESTO ES DEL MODAL DE AGREGAR MAS PRODUCTOS ////////
let pedidoIdActual = null;
let nuevosProductos = [];

function abrirModal(pedidoId) {
    pedidoIdActual = pedidoId;
    nuevosProductos = [];

    const form = document.getElementById('form-agregar-productos');
    form.action = `/ventas/agregar-productos/${pedidoId}`;

    renderListaNuevos();
    document.getElementById('modal-agregar-productos').classList.remove('hidden');
}

function cerrarModal() {
    document.getElementById('modal-agregar-productos').classList.add('hidden');
}

function vaciarLista() {
    nuevosProductos = [];
    renderListaNuevos();
}

document.getElementById("modal-categoria").addEventListener("change", function () {
    const cat = this.value;
    document.querySelectorAll("#modal-lista-productos > div").forEach(card => {
        card.classList.toggle("hidden", !(cat === "all" || card.dataset.categoria == cat));
    });
});


document.querySelectorAll('.btn-add-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const nombre = btn.dataset.nombre;
        const precioBase = parseFloat(btn.dataset.precio);

        const inputCant = document.querySelector(`.input-cantidad[data-producto="${id}"]`);
        const cantidad = Math.max(1, parseInt(inputCant.value) || 1);

        const selectVar = document.querySelector(`select.variante-modal[data-producto="${id}"]`);
        let variante_id = null, variante_tipo = null, precio = precioBase;

        if (selectVar && selectVar.value) {
            const opt = selectVar.options[selectVar.selectedIndex];
            variante_id = opt.value;
            variante_tipo = opt.dataset.tipo;
            precio = parseFloat(opt.dataset.precio);
        }

        const idx = nuevosProductos.findIndex(
            p => p.idProducto == id && (p.variante_id ?? '') == (variante_id ?? '')
        );

        if (idx !== -1) {
            nuevosProductos[idx].cantidad += cantidad;
        } else {
            nuevosProductos.push({
                idProducto: id,
                nombre,
                precio,
                cantidad,
                variante_id,
                variante_tipo
            });
        }

        renderListaNuevos();
    });
});


function renderListaNuevos() {
    const cont = document.getElementById('modal-productos-agregados');
    cont.innerHTML = '';
    const btnEnviar = document.getElementById('btnEnviarNuevos');

    if (!nuevosProductos.length) {
        cont.innerHTML = `<p class="text-gray-500">Aún no agregaste productos.</p>`;
        btnEnviar.disabled = false;
        return;
    }

    let total = 0;

    nuevosProductos.forEach((p, i) => {
        const sub = p.precio * p.cantidad;
        total += sub;

        cont.insertAdjacentHTML('beforeend', `
            <div class="flex items-center justify-between border rounded-lg p-3">
                <div>
                    <div class="font-semibold">${p.nombre} ${p.variante_tipo ? '('+p.variante_tipo+')' : ''}</div>
                    <div class="text-sm text-amber-700">
                        Bs ${p.precio.toFixed(2)} x ${p.cantidad} = Bs ${sub.toFixed(2)}
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <button type="button" onclick="cambiarCantidad(${i}, -1)">➖</button>
                    <span id="cant-${i}">${p.cantidad}</span>
                    <button type="button" onclick="cambiarCantidad(${i}, 1)">➕</button>
                    <button type="button" onclick="eliminarNuevo(${i})" class="text-red-600">✖</button>
                </div>
            </div>
        `);
    });

    cont.insertAdjacentHTML('beforeend', `
        <div class="border-t pt-3 text-right font-bold text-amber-900">
            Total nuevos: Bs ${total.toFixed(2)}
        </div>
    `);

    const form = document.getElementById('form-agregar-productos');

    form.onsubmit = () => {
        document.querySelectorAll('input[name^="productos"]').forEach(n => n.remove());

        nuevosProductos.forEach((p, i) => {
            const fields = {
                [`productos[${i}][idProducto]`]: p.idProducto,
                [`productos[${i}][cantidad]`]: p.cantidad,
                [`productos[${i}][precio]`]: p.precio,
                [`productos[${i}][variante_id]`]: p.variante_id ?? ''
            };

            for (const name in fields) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = fields[name];
                form.appendChild(input);
            }
        });
        return true;
    };
}


function cambiarCantidad(i, delta) {
    nuevosProductos[i].cantidad += delta;
    if (nuevosProductos[i].cantidad < 1) nuevosProductos[i].cantidad = 1;
    renderListaNuevos();
}

function eliminarNuevo(i) {
    nuevosProductos.splice(i, 1);
    renderListaNuevos();
}
</script>


@endsection
