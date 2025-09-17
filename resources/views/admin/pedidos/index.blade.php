{{-- resources/views/cocina/index.blade.php --}}
@extends('layouts.admin')

@section('content')
    <div class="p-6 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen">

        {{-- Header --}}
        <div class="flex justify-center mb-6 border-b pb-4">
            <h1 class="font-bold text-2xl text-amber-900">👨‍🍳 Módulo de Pedidos de Cocina</h1>
        </div>
@auth
    <p>Usuario logueado: {{ Auth::user()->nombre }} (CI: {{ Auth::user()->ciUsuario }})</p>
@endauth

@guest
    <p>No hay usuario logueado 🚨</p>
@endguest

        {{-- Filtros --}}
        <div class="flex space-x-3 mb-8 justify-center">
            <a href="{{ route('pedidos.index') }}"
                class="px-4 py-2 rounded-lg {{ request('estado') ? 'bg-gray-100 text-amber-800 hover:bg-amber-200' : 'bg-amber-700 text-white shadow hover:bg-amber-800' }}">
                Todos
            </a>
            <a href="{{ route('pedidos.index', ['estado' => 'pendiente']) }}"
                class="px-4 py-2 rounded-lg {{ request('estado') == 'pendiente' ? 'bg-amber-700 text-white shadow hover:bg-amber-800' : 'bg-gray-100 text-amber-800 hover:bg-amber-200' }}">
                Pendientes
            </a>
            <a href="{{ route('pedidos.index', ['estado' => 'en preparación']) }}"
                class="px-4 py-2 rounded-lg {{ request('estado') == 'en preparación' ? 'bg-amber-700 text-white shadow hover:bg-amber-800' : 'bg-gray-100 text-amber-800 hover:bg-amber-200' }}">
                En preparación
            </a>
            <a href="{{ route('pedidos.index', ['estado' => 'listo']) }}"
                class="px-4 py-2 rounded-lg {{ request('estado') == 'listo' ? 'bg-amber-700 text-white shadow hover:bg-amber-800' : 'bg-gray-100 text-amber-800 hover:bg-amber-200' }}">
                Completado
            </a>
        </div>


        {{-- Pedidos --}}
        <div class="grid grid-cols-3 gap-6">
            @forelse($pedidos as $pedido)
                <div class="bg-white border border-amber-200 rounded-xl shadow-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <p class="font-semibold text-amber-900">#{{ $pedido->idPedido }}</p>
                        <div class="text-right text-sm text-gray-600">
                            <p>{{ $pedido->fechaCreacion->format('H:i') }}</p>
                        </div>
                    </div>
                    <p class="text-sm text-gray-700 mb-2">
                        {{ $pedido->direccion ?? 'Mesa ' . ($pedido->mesa ?? 'N/A') }}
                    </p>
                    <p class="text-xs text-gray-500 mb-2">Mesero: {{ $pedido->usuario->nombre ?? 'Desconocido' }}</p>

                    <ul class="text-sm text-amber-900 space-y-1 mb-2">
                        @foreach ($pedido->detalles as $detalle)
                            <li>{{ $detalle->cantidad }}x {{ $detalle->producto->nombre }} <span class="float-right">Bs.
                                    {{ number_format($detalle->subtotal, 2) }}</span></li>
                        @endforeach

                    </ul>

                    <p class="text-xs italic text-gray-600 mb-3">{{ $pedido->comentarios ?? '' }}</p>

                    <div class="flex justify-between items-center">
                        <span
                            class="text-sm font-semibold
                            {{ $pedido->estado == 'pendiente' ? 'text-red-600' : ($pedido->estado == 'en preparación' ? 'text-yellow-600' : 'text-green-700') }}">
                            {{ ucfirst($pedido->estado) }}
                        </span>

                        @if ($pedido->estado != 'listo')
                            <form action="{{ route('pedidos.cambiarEstado', $pedido->idPedido) }}" method="POST">
                                @csrf
                                <input type="hidden" name="estado"
                                    value="{{ $pedido->estado == 'pendiente' ? 'en preparación' : 'listo' }}">
                                <button class="px-4 py-1 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">
                                    {{ $pedido->estado == 'pendiente' ? 'En Preparación' : 'Listo' }}
                                </button>
                            </form>
                        @endif
                    </div>

                </div>
            @empty
                <p class="text-gray-500">No hay pedidos en curso.</p>
            @endforelse
        </div>

    </div>
@endsection
