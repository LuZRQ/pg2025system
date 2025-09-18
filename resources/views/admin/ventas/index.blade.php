{{-- resources/views/ventas/index.blade.php --}}
@extends('layouts.admin')

@section('content')
<div class="p-4 sm:p-6 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 min-h-screen">

    {{-- Header --}}
    <div class="flex flex-col sm:flex-row justify-center items-center text-center mb-6 border-b pb-4">
        <div class="flex items-center space-x-3">
            <i class="fa-solid fa-mug-hot text-amber-700 text-2xl"></i>
            <span class="font-bold text-xl sm:text-2xl text-amber-900">Gestión de Ventas</span>
            <i class="fa-solid fa-money-bill-wave text-green-600 text-2xl"></i>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {{-- Productos --}}
        <div class="lg:col-span-8">
            {{-- Categorías --}}
            <div class="flex flex-wrap gap-2 mb-6">
                <button class="px-4 py-2 rounded-lg bg-amber-700 text-white shadow hover:bg-amber-800"
                    onclick="filtrarProductos('all')">Todo</button>
                @foreach ($categorias as $categoria)
                    <button class="px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200"
                        onclick="filtrarProductos('{{ $categoria->idCategoria }}')">
                        {{ $categoria->nombreCategoria }}
                    </button>
                @endforeach
            </div>

            {{-- Cards de productos --}}
            <div id="catalogo" class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                @foreach ($productos as $producto)
                    <div class="producto-card bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200"
                        data-categoria="{{ $producto->categoriaId }}">
                        <div
                            class="h-24 sm:h-32 bg-gradient-to-tr from-amber-200 to-amber-400 flex items-center justify-center">
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold text-base sm:text-lg text-amber-900">{{ $producto->nombre }}</h3>
                            <p class="text-sm text-amber-700">Bs. {{ number_format($producto->precio, 2) }}</p>
                            <button
                                onclick="agregarAlPedido({{ $producto->idProducto }}, '{{ $producto->nombre }}', {{ $producto->precio }})"
                                class="w-full mt-3 flex justify-center items-center gap-2 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                                Agregar
                            </button>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- Pedido actual --}}
        <div class="lg:col-span-4">
            <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-amber-200">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                    <h2 class="font-bold text-lg text-amber-900">Pedido Actual</h2>
                    {{-- 10 mesas --}}
                    <select class="border rounded-lg px-2 py-1 text-sm text-amber-800">
                        @for ($i = 1; $i <= 10; $i++)
                            <option>Mesa: {{ str_pad($i, 3, '0', STR_PAD_LEFT) }}</option>
                        @endfor
                    </select>
                </div>

                <div id="pedido-items"></div>

                {{-- Total --}}
                <div class="flex justify-between border-t pt-2 mb-4">
                    <span class="font-semibold text-amber-900">Total</span>
                    <span id="pedido-total" class="font-bold text-amber-800">Bs. 0.00</span>
                </div>

                {{-- Comentarios --}}
                <div class="mb-4">
                    <label class="block text-sm text-amber-700">Comentarios</label>
                    <textarea id="comentario-text" class="w-full border rounded-lg p-2 mt-1 text-sm" placeholder="Ej: sin picante, poca sal..."></textarea>
                </div>

                {{-- Botones --}}
                <div class="space-y-3">
                    <button type="button"
                        class="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                        onclick="enviarPedido()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Enviar a Cocina
                    </button>
                    <button type="button"
                        class="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                        onclick="cancelarPedido()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancelar Pedido
                    </button>
                </div>

                {{-- Formulario oculto --}}
                <form id="form-enviar" action="{{ route('ventas.enviarACocina') }}" method="POST" class="hidden">
                    @csrf
                    <input type="hidden" name="mesa" id="mesa">
                    <input type="hidden" name="comentarios" id="comentarios-hidden">
                    <input type="hidden" name="productos" id="productos">
                </form>
            </div>
            {{-- Extras --}}
 <div class="mt-6 space-y-3">
    {{-- Botón historial visible para Mesero y Cajero --}}
    <a href="{{ route('ventas.historial') }}"
       class="block w-full text-center bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 shadow">
        Ver historial
    </a>

    {{-- Botón cobrar solo para Cajero --}}
    @if (Auth::user()->rol?->nombre === 'Cajero')
        <a href="{{ route('ventas.caja') }}"
           class="block w-full text-center bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 shadow">
            Cobrar del pedido
        </a>
    @endif
</div>

        </div>
        
    </div>

    {{-- Pedidos en cocina --}}
    <div class="mt-10 bg-white shadow rounded-2xl p-4 sm:p-6 border border-amber-200">
        <h2 class="font-bold text-lg text-amber-900 mb-4">📋 Pedidos Listos en Cocina</h2>

        <div id="pedidos-listos" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            @forelse($pedidos as $pedido)
                <div class="border rounded-lg p-4 shadow-sm">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-semibold text-amber-800">Mesa: {{ $pedido->mesa }}</span>
                        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Listo</span>
                    </div>
                    <ul class="text-sm text-amber-700 mb-3">
                        @foreach ($pedido->detalles as $detalle)
                            <li>- {{ $detalle->cantidad }} x {{ $detalle->producto->nombre }}</li>
                        @endforeach
                    </ul>
                    <div class="flex justify-end">
                        @if (Auth::user()->rol?->nombre === 'Cajero')
                            <button class="bg-amber-700 text-white px-3 py-1 rounded-lg hover:bg-amber-800 text-sm">Cobrar</button>
                        @endif
                    </div>
                </div>
            @empty
                <p class="text-gray-500">No hay pedidos listos todavía.</p>
            @endforelse
        </div>
    </div>
</div>

<script>
let pedido = [];
const rolUsuario = @json(Auth::user()->rol?->nombre ?? '');

// Filtrar productos por categoría
function filtrarProductos(categoriaId) {
    document.querySelectorAll('.producto-card').forEach(card => {
        card.style.display = (categoriaId === 'all' || card.dataset.categoria == categoriaId) ? 'block' : 'none';
    });
}

function agregarAlPedido(id, nombre, precio) {
    let item = pedido.find(p => p.idProducto === id);
    if(item) item.cantidad++;
    else pedido.push({idProducto:id, nombre, precio, cantidad:1});
    renderPedido();
}

function cambiarCantidad(id, delta) {
    let item = pedido.find(p => p.idProducto === id);
    if(item) {
        item.cantidad += delta;
        if(item.cantidad <= 0) pedido = pedido.filter(p => p.idProducto !== id);
    }
    renderPedido();
}

function eliminarItem(id) {
    pedido = pedido.filter(p => p.idProducto !== id);
    renderPedido();
}

function renderPedido() {
    let contenedor = document.getElementById('pedido-items');
    contenedor.innerHTML = '';
    let total = 0;
    pedido.forEach(item => {
        total += item.precio * item.cantidad;
        contenedor.innerHTML += `
        <div class="flex justify-between items-center mb-3">
            <div class="flex items-center gap-2">
                <button onclick="cambiarCantidad(${item.idProducto}, -1)" class="px-2 py-1 bg-amber-200 rounded hover:bg-amber-300">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.idProducto}, 1)" class="px-2 py-1 bg-amber-200 rounded hover:bg-amber-300">+</button>
                <span class="text-amber-900 font-semibold">${item.nombre}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-amber-700">Bs. ${(item.precio*item.cantidad).toFixed(2)}</span>
                <svg onclick="eliminarItem(${item.idProducto})" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 11v6m4-6v6" />
                </svg>
            </div>
        </div>`;
    });
    document.getElementById('pedido-total').innerText = 'Bs. ' + total.toFixed(2);
}

// Enviar pedido a cocina
function enviarPedido() {
    if(pedido.length===0){ alert("No hay productos en el pedido"); return; }

    const mesa = document.querySelector("select").value.replace("Mesa: ", "");
    const comentarios = document.getElementById("comentario-text").value;

    document.getElementById('mesa').value = mesa;
    document.getElementById('comentarios-hidden').value = comentarios;
    document.getElementById('productos').value = JSON.stringify(pedido);

    document.getElementById('form-enviar').submit();

    alert("✅ Pedido enviado correctamente a cocina.");
    cancelarPedido();
}

function cancelarPedido() {
    pedido = [];
    renderPedido();
}
</script>
@endsection
