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
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>

</head>

<body class="bg-gradient-to-b from-stone-100 to-white text-orange-800 font-sans" x-data="{ open: false }">
  
    <!-- Navbar -->
    <header class="bg-stone-800 text-white shadow-md flex-1 p-2 w-full">
       
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
             <a href="{{ route('usuarios.index') }}"
           class="px-4 py-2 bg-stone-600 hover:bg-stone-500 text-white rounded-lg shadow">
           ← Volver
        </a>
            <h1 class="text-lg font-bold">{{ $title ?? 'Panel de Administración' }}</h1>
        </div>
        
    </header>

    <!-- Contenido principal -->
    <main class="flex-1 p-6 w-full">
        @yield('content')
    </main>

    @vite('resources/js/app.js')
    
</body>

</html>
