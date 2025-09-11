<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Panel de Administración' }}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    @vite('resources/css/app.css')
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <!-- Dentro de <head> -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>

<body class="bg-gradient-to-b from-stone-100 to-white text-gray-800 font-sans" x-data="{ open: false }">
    <!-- Menú lateral -->
    <div class="fixed inset-y-0 left-0 z-40 w-64 transform bg-gradient-to-b from-stone-800 to-stone-900 text-white shadow-lg transition-transform duration-300"
        :class="{ '-translate-x-full': !open, 'translate-x-0': open }">

        <!-- Botón para cerrar / abrir -->
        <div class="absolute top-4 right-[-60px]">
            <button @click="open = !open"
                class="flex items-center space-x-1 bg-stone-700 text-white px-3 py-2 rounded-full shadow hover:bg-stone-600">
                <!-- Icono café -->
                <i class="fas fa-coffee text-amber-200"></i>
                <span>></span>
            </button>
        </div>

        <!-- Perfil -->
        <div class="flex items-center space-x-3 px-4 py-4 border-b border-stone-700">
            <div class="w-10 h-10 rounded-full bg-stone-600 flex items-center justify-center text-xl font-bold">
                {{ Auth::user()->nombre[0] ?? 'U' }}
            </div>
            <div>
                <p class="font-semibold">{{ Auth::user()->nombre ?? 'Usuario' }} {{ Auth::user()->apellido ?? '' }}</p>
                <p class="text-xs text-amber-200">{{ Auth::user()->rol->nombre ?? 'Rol' }}</p>
            </div>
        </div>

        <!-- Menú -->
        <nav class="px-4 py-4 space-y-3 text-sm font-medium">
            <p class="uppercase text-xs text-stone-400 mb-2">Menú principal</p>
            <!-- Menú -->


            <a href="{{ route('ventas.index') }}" class="block py-2 hover:text-amber-300">Gestión de Ventas</a>
            <a href="{{ route('productos.index') }}" class="block py-2 hover:text-amber-300">Gestión de Productos</a>
            <a href="{{ route('stock.index') }}" class="block py-2 hover:text-amber-300">Control de Stock</a>
            <a href="{{ route('pedidos.index') }}" class="block py-2 hover:text-amber-300">Pedidos de Cocina</a>
            <a href="#" class="block py-2 hover:text-amber-300">Gestión de Reportes</a>

            <a href="#" class="block py-2 hover:text-amber-300">Gestión de Auditoría</a>

            <a href="{{ route('usuarios.index') }}" class="block py-2 font-semibold text-amber-400">Usuarios y Roles</a>
        </nav>

        <!-- Cerrar sesión -->
        <div class="absolute bottom-0 w-full p-4 border-t border-stone-700">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button class="w-full py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg shadow">
                    Cerrar Sesión
                </button>
            </form>
        </div>
    </div>


    <!-- Navbar -->
    <header class="bg-stone-800 text-white shadow-md flex-1 p-2 w-full">
        <div class="container mx-auto px-4 py-3 flex items-center justify-center">
            <h1 class="text-lg text-center font-bold">{{ $title ?? 'Panel de Administración' }}</h1>
        </div>
    </header>

    <!-- Contenido principal -->
    <main class="flex-1 p-6 w-full">
        @yield('content')
    </main>

    @vite('resources/js/app.js')
    <script src="{{ asset('js/crudDelete.js') }}"></script>

</body>

</html>
