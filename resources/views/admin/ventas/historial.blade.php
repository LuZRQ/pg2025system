@extends('layouts.crud')

@section('content')
    <div class="p-6 bg-gradient-to-br from-amber-50 via-white to-amber-100 min-h-screen">
        <h2 class="text-2xl font-bold text-amber-800 mb-6">📊 Historial de Ventas</h2>

        <!-- Filtros -->
        <div class="bg-white rounded-2xl shadow-md p-4 mb-6 border border-amber-200">
            <form method="GET" action="{{ route('ventas.historial') }}" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="text-sm font-semibold text-amber-700">Fecha desde</label>
                    <input type="date" name="fecha_desde"
                        class="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:ring-amber-400 focus:border-amber-400">
                </div>
                <div>
                    <label class="text-sm font-semibold text-amber-700">Fecha hasta</label>
                    <input type="date" name="fecha_hasta"
                        class="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:ring-amber-400 focus:border-amber-400">
                </div>
                <div>
                    <label class="text-sm font-semibold text-amber-700">Mesa / Pedido</label>
                    <input type="text" name="mesa" placeholder="Ej: Mesa 001 o Pedido #6"
                        class="w-full mt-1 rounded-lg border-gray-300 shadow-sm focus:ring-amber-400 focus:border-amber-400">
                </div>

                <div class="flex items-end">
                    <button type="submit"
                        class="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg shadow-md transition">
                        Filtrar
                    </button>
                </div>
            </form>
        </div>

        <!-- Tabla Historial -->
        <div class="bg-white shadow-lg rounded-2xl overflow-hidden border border-amber-200">
            <table class="min-w-full text-sm text-left text-gray-700">
                <thead class="bg-amber-600 text-white">
                    <tr>
                        <th class="px-4 py-3">#</th>
                        <th class="px-4 py-3">Pedido / Mesa</th>

                        <th class="px-4 py-3">Fecha</th>
                        <th class="px-4 py-3">Total</th>
                        <th class="px-4 py-3">Método Pago</th>
                        <th class="px-4 py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    @foreach ($ventas as $venta)
                        <tr class="hover:bg-amber-50 transition">
                            <td class="px-4 py-3 font-semibold text-gray-900">{{ $venta->id }}</td>
                            <td class="px-4 py-3">{{ $venta->pedido->idPedido }} - {{ $venta->pedido->mesa }}</td>

                            <td class="px-4 py-3">{{ $venta->fecha }}</td>
                            <td class="px-4 py-3 font-bold text-amber-700">${{ number_format($venta->total, 2) }}</td>
                            <td class="px-4 py-3">{{ $venta->metodo_pago }}</td>
                            <td class="px-4 py-3 text-center space-x-2">
                                <!-- Ver -->
                                <a href="{{ route('ventas.show', $venta->id) }}"
                                    class="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800">
                                    <i class="fas fa-eye"></i>
                                </a>
                                <!-- Editar -->
                                <a href="{{ route('ventas.edit', $venta->id) }}"
                                    class="inline-flex items-center px-2 py-1 text-sm text-amber-600 hover:text-amber-800">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <!-- Eliminar -->
                                <form action="{{ route('ventas.destroy', $venta->id) }}" method="POST" class="inline">
                                    @csrf @method('DELETE')
                                    <button type="submit" onclick="return confirm('¿Seguro deseas eliminar esta venta?')"
                                        class="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                                <!-- Descargar Factura -->
                                <a href="{{ route('ventas.factura', $venta->id) }}"
                                    class="inline-flex items-center px-2 py-1 text-sm text-green-600 hover:text-green-800">
                                    <i class="fas fa-download"></i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <!-- Paginación -->
            <div class="p-4 border-t bg-gray-50">
                {{ $ventas->links() }}
            </div>
        </div>
    </div>
@endsection
