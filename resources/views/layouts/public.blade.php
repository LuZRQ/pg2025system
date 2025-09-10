<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>@yield('title', 'Garabato Café')</title>

    {{-- Bootstrap --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    {{-- Bootstrap Icons --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    {{-- Google Fonts --}}
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body class="bg-white" style="background-color: #13339c77;">
    
    {{-- Navbar directo en el layout --}}
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="{{ route('home') }}">
                <img src="{{ asset('img/fondo3.png') }}" alt="Garabato Café Logo" height="40" class="me-2">
                <span class="fw-bold">Garabato Café</span>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" href="{{ route('home') }}">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/#menu') }}">Menú</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/#nosotros') }}">Nosotros</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/#direccion') }}">Dirección</a>
                    </li>
                   
                    {{-- Botón Login / Logout --}}
                    <li class="nav-item ms-3">
                        @auth
                            <form action="{{ route('logout') }}" method="POST" class="d-inline">
                                @csrf
                                <button type="submit" class="btn btn-danger">
                                    <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                                </button>
                            </form>
                        @else
                            <a href="{{ route('login') }}" class="btn btn-warning">
                                <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
                            </a>
                        @endauth
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    {{-- Contenido dinámico --}}
    <main class="pt-1">
        @yield('content')
    </main>

    {{-- Footer directo en el layout --}}
    <footer class="bg-black text-light mt-5 py-4">
        <div class="container text-center">
            
            <!-- Texto -->
            <div class="small mb-3">
                © Garabato Café {{ date('Y') }} - Todos los derechos reservados.
            </div>
            
            <!-- Redes -->
            <div class="d-flex justify-content-center gap-4 fs-5">
                <a class="text-light opacity-75 hover-opacity" href="#" aria-label="Instagram">
                    <i class="bi bi-instagram"></i>
                </a>
                <a class="text-light opacity-75 hover-opacity" href="#" aria-label="Facebook">
                    <i class="bi bi-facebook"></i>
                </a>
                <a class="text-light opacity-75 hover-opacity" href="#" aria-label="TikTok">
                    <i class="bi bi-tiktok"></i>
                </a>
            </div>
        </div>
    </footer>

    {{-- Bootstrap JS --}}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- JS -->
    <script src="{{ asset('js/script.js') }}"></script>

    <!-- Estilo opcional para hover -->
    <style>
        .hover-opacity:hover {
            opacity: 1 !important;
        }
    </style>
</body>

</html>
