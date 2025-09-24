<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Recibo')</title>

    {{-- Tailwind CSS --}}
    <script src="https://cdn.tailwindcss.com"></script>

    {{-- Google Fonts (para tipografía bonita) --}}
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&family=Pacifico&display=swap" rel="stylesheet">

    {{-- Font Awesome --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />

    <style>
        body {
            font-family: 'Roboto Mono', monospace;
        }
        .ticket-title {
            font-family: 'Pacifico', cursive;
        }
        /* Opcional: personalizar scrollbar para slider */
        input[type="range"]::-webkit-slider-thumb {
            background-color: #4A5568; /* gris oscuro */
        }
    </style>

    @stack('styles')
</head>
<body class="bg-gray-100 min-h-screen">
    <nav class="bg-yellow-900 text-white p-4 shadow">
        <div class="container mx-auto">
            <a href="{{ url('/') }}" class="font-bold text-lg">Sistema de Ventas</a>
        </div>
    </nav>

    <main class="container mx-auto my-6">
        @yield('content')
    </main>

    @stack('scripts')
</body>
</html>
