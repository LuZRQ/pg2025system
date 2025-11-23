@extends('layouts.admin')

@section('content')
<div class="p-6 bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen">
{{-- ==================== FILTROS ==================== --}}
<div class="flex flex-wrap gap-2 mb-8 justify-center">
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
        Listo
    </a>
</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        @forelse ($pedidos as $pedido)

            @php
                // Filtrar productos visibles para cocina (solo pendientes o en preparación)
                $nuevos = $pedido->detalles
                    ->where('es_nuevo', 1)
                    ->whereIn('estado', ['pendiente', 'en preparación', 'listo']);

                $detallesCocina = $nuevos->isNotEmpty()
                    ? $nuevos
                    : $pedido->detalles->whereIn('estado', ['pendiente', 'en preparación', 'listo']);

                // Saltar pedidos sin productos activos y que no estén cancelados o cobrados
                if ($detallesCocina->isEmpty() && !in_array($pedido->estado, ['cancelado', 'cobrado'])) continue;

                $cardColor = match($pedido->estado) {
                    'pendiente' => 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
                    'en preparación' => 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
                    'listo' => 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
                    'cancelado' => 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300',
                    'cobrado' => 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
                    default => 'bg-white border-gray-200',
                };
            @endphp

            <div class="rounded-2xl p-5 shadow-lg transition transform hover:scale-[1.03] {{ $cardColor }}">

                {{-- CABECERA DEL PEDIDO --}}
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <p class="font-bold text-lg text-gray-800 tracking-wide flex items-center gap-1">
                            <i class="fas fa-receipt text-amber-700"></i>
                            Pedido N° {{ $pedido->numero_diario ?? $pedido->idPedido }}
                        </p>
                        <p class="text-sm text-gray-600 flex items-center gap-1">
                            <i class="fas fa-chair text-gray-500"></i>
                            Mesa {{ $pedido->mesa ?? 'N/A' }}
                        </p>
                        <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <i class="fas fa-user text-gray-500"></i>
                            {{ $pedido->usuario->nombre ?? 'Desconocido' }}
                        </p>
                    </div>
   <div class="text-right flex flex-col items-end gap-1">
        <p class="text-xs text-gray-500 flex items-center gap-1">
            <i class="fas fa-clock text-gray-500"></i> {{ $pedido->fechaCreacion->format('H:i') }}
        </p>

        {{-- Badge de estado --}}
        <span class="text-xs font-semibold px-2 py-1 rounded-full uppercase
            @if($pedido->estado=='pendiente') bg-red-100 text-red-700
            @elseif($pedido->estado=='en preparación') bg-yellow-100 text-yellow-700
            @elseif($pedido->estado=='listo') bg-green-100 text-green-700
            @elseif($pedido->estado=='cancelado') bg-gray-300 text-gray-800
            @elseif($pedido->estado=='cobrado') bg-blue-100 text-blue-700
            @endif">
            {{ $pedido->estado }}
        </span>
    </div>
                </div>

                <hr class="my-3 border-gray-300">

                {{-- LISTA DE PRODUCTOS --}}
                @if($detallesCocina->isNotEmpty())
                <ul class="space-y-3">
                    @foreach ($detallesCocina as $detalle)
                        @php
                            $variante = $detalle->producto->variantes->firstWhere('idVariante', $detalle->variante_id);
                        @endphp

                        <li class="rounded-lg px-4 py-3 shadow-sm border
                            @if($detalle->estado=='pendiente') bg-red-50 border-red-200
                            @elseif($detalle->estado=='en preparación') bg-yellow-50 border-yellow-200
                            @elseif($detalle->estado=='listo') bg-green-50 border-green-200
                            @endif transition hover:shadow-md">

                            <div class="flex justify-between items-center">
                                <div>
                                    <span class="font-semibold text-gray-800">
                                        {{ $detalle->cantidad }}x {{ $detalle->producto->nombre }}
                                    </span>

                                    @if ($variante)
                                        <span class="ml-2 text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                                            {{ ucfirst($variante->tipo) }}
                                        </span>
                                    @endif
                                </div>

                                <span class="px-2 py-1 text-xs rounded-full font-semibold
                                    @if($detalle->estado=='pendiente') bg-red-200 text-red-800
                                    @elseif($detalle->estado=='en preparación') bg-yellow-200 text-yellow-800
                                    @elseif($detalle->estado=='listo') bg-green-200 text-green-800
                                    @endif">
                                    {{ ucfirst($detalle->estado) }}
                                </span>
                            </div>

                            {{-- BOTONES DE ACCIÓN: SOLO SI EL PEDIDO NO ESTÁ CANCELADO NI COBRADO --}}
                            @if(!in_array($pedido->estado, ['cancelado', 'cobrado']))
                            <div class="flex gap-2 mt-3">
                                @if($detalle->estado === 'pendiente')
                                    <form action="{{ route('detalle.cambiarEstado', $detalle->idDetallePedido) }}" method="POST" class="flex-1">
                                        @csrf
                                        <input type="hidden" name="estado" value="en preparación">
                                        <button type="submit" class="w-full px-3 py-1 text-xs text-white rounded-full shadow-md bg-yellow-700 hover:bg-yellow-800 flex items-center justify-center gap-1">
                                            <i class="fas fa-utensils"></i> Preparar
                                        </button>
                                    </form>

                                @elseif($detalle->estado === 'en preparación')
                                    <form action="{{ route('detalle.cambiarEstado', $detalle->idDetallePedido) }}" method="POST" class="flex-1">
                                        @csrf
                                        <input type="hidden" name="estado" value="listo">
                                        <button type="submit" class="w-full px-3 py-1 text-xs text-white rounded-full shadow-md bg-green-700 hover:bg-green-800 flex items-center justify-center gap-1">
                                            <i class="fas fa-check"></i> Finalizar
                                        </button>
                                    </form>

                                @elseif($detalle->estado === 'listo')
                                    <span class="text-xs text-green-700 font-semibold bg-green-100 p-1.5 rounded-full w-full text-center">
                                        ✔ Terminado
                                    </span>
                                @endif
                            </div>
                            @endif

                        </li>
                    @endforeach
                </ul>
                @endif

                {{-- COMENTARIOS DEL PEDIDO --}}
                @if ($pedido->comentarios)
                    <div class="text-xs text-gray-800 bg-amber-100 rounded-md p-2 mt-3 shadow-inner flex items-center gap-2">
                        <i class="fas fa-comment-dots text-amber-700"></i>
                        <span class="font-semibold">Comentario:</span> {{ $pedido->comentarios }}
                    </div>
                @endif

            </div>

        @empty
            <p class="text-center text-gray-500 mt-4 text-lg">No hay pedidos para cocina.</p>
        @endforelse

    </div>
</div>
@endsection
