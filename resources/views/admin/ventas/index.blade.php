<x-app-layout>
    <x-slot name="title">Gestión de Ventas</x-slot>


    <div class="bg-gradient-to-b from-amber-50 to-orange-100 min-h-screen p-6">

        <!-- Encabezado -->
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-stone-800 flex items-center gap-2">
                <i class="fas fa-coffee text-brown-700"></i> Gestión de Ventas
            </h1>
        </div>

        <!-- Layout 70 /30-->
        <div class="grid grid-cols-1 lg:grid-cols-10 gap-6">

            <!-- 70% Productos parte izquierda -->
            <div class="lg:col-span-7">

                <!-- Categorías -->
                <div class="flex flex-wrap gap-2 mb-6">
                    <button class="px-4 py-2 rounded-lg bg-brown-700 text-white shadow hover:bg-brown-800">Todo</button>
                    <button class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Cafés</button>
                    <button
                        class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Capuchinos</button>
                    <button class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Lattes</button>
                    <button class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Tés</button>
                    <button
                        class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Panqueques</button>
                    <button class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Empanadas
                        fritas</button>
                    <button
                        class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Pastelería</button>
                    <button
                        class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Sándwiches</button>
                    <button
                        class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Malteadas</button>
                    <button class="px-4 py-2 rounded-lg bg-brown-100 text-brown-700 hover:bg-brown-200">Bebidas</button>
                </div>

                <!-- Cards productos -->
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <!-- Producto -->
                    <div
                        class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform">
                        <div class="h-40 bg-amber-100 flex items-center justify-center">
                            <span class="text-stone-400">Imagen</span>
                        </div>
                        <div class="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 class="font-semibold text-stone-800">Capuchino Tradicional</h2>
                                <p class="text-stone-600">Bs. 15</p>
                            </div>
                            <button
                                class="mt-3 w-full px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 flex items-center justify-center gap-2 shadow">
                                <i class="fas fa-plus"></i> Agregar
                            </button>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform">
                        <div class="h-40 bg-amber-100 flex items-center justify-center">
                            <span class="text-stone-400">Imagen</span>
                        </div>
                        <div class="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 class="font-semibold text-stone-800">Malteada de Oreo</h2>
                                <p class="text-stone-600">Bs. 12</p>
                            </div>
                            <button
                                class="mt-3 w-full px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 flex items-center justify-center gap-2 shadow">
                                <i class="fas fa-plus"></i> Agregar
                            </button>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform">
                        <div class="h-40 bg-amber-100 flex items-center justify-center">
                            <span class="text-stone-400">Imagen</span>
                        </div>
                        <div class="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 class="font-semibold text-stone-800">Empanada Frita</h2>
                                <p class="text-stone-600">Bs. 25</p>
                            </div>
                            <button
                                class="mt-3 w-full px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 flex items-center justify-center gap-2 shadow">
                                <i class="fas fa-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 30% Pedido actual posicion parte derecha-->
            <div class="lg:col-span-3">
                <div class="bg-white rounded-xl shadow-lg p-5 flex flex-col h-full">
                    <!-- Cabecera -->
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-bold text-lg text-stone-800">Pedido Actual</h3>
                        <select class="border rounded px-2 py-1 text-stone-700 focus:ring-2 focus:ring-amber-400">
                            <option>Mesa: 001</option>
                            <option>Mesa: 002</option>
                            <option>Mesa: 003</option>
                        </select>
                    </div>

                    <!-- Producto pedido -->
                    <div class="flex justify-between items-center mb-3 border-b pb-2">
                        <div class="flex items-center gap-2">
                            <button class="px-2 bg-brown-200 rounded hover:bg-brown-300">-</button>
                            <span>1</span>
                            <button class="px-2 bg-brown-200 rounded hover:bg-brown-300">+</button>
                            <span class="ml-2">Café Latte</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-medium">Bs. 4.50</span>
                            <button class="text-red-500 hover:text-red-600"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>

                    <!-- Total -->
                    <div class="flex justify-between font-semibold text-stone-800 mb-3">
                        <span>Total</span>
                        <span>Bs. 4.50</span>
                    </div>

                    <!-- Comentarios -->
                    <div class="mb-4">
                        <label class="text-sm text-stone-600">Comentarios</label>
                        <textarea class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400"
                            placeholder="Ej: sin picante, poca sal..."></textarea>
                    </div>

                    <!-- Botones principales -->
                    <button
                        class="w-full mb-2 px-4 py-2 bg-brown-700 text-white rounded-lg shadow hover:bg-brown-800 flex items-center justify-center gap-2">
                        <i class="fas fa-paper-plane"></i> Enviar a Cocina
                    </button>
                    <button
                        class="w-full mb-2 px-4 py-2 bg-brown-300 text-brown-900 rounded-lg shadow hover:bg-brown-400 flex items-center justify-center gap-2">
                        <i class="fas fa-times"></i> Cancelar Pedido
                    </button>


                </div>
            </div>
            <!-- Botones secundarios -->
            <button class="w-full mb-2 px-4 py-2 bg-stone-200 text-stone-800 rounded-lg shadow hover:bg-stone-300">
                Ver historial
            </button>
            <button class="w-full px-4 py-2 bg-amber-500 text-white rounded-lg shadow hover:bg-amber-600">
                Cobrado del pedido
            </button>
        </div>
    </div>
</x-app-layout>
