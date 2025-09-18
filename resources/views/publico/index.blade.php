@extends('layouts.public')

@section('title', 'Inicio • Garabato Café')

@section('content')

    {{-- Hero --}}
    <section class="hero-cover d-flex align-items-center"
        style="background-image: url('{{ asset('img/fondo1.jpeg') }}');
         background-size: cover;
         background-position: center;
         height: 350px;">
        {{-- Alto fijo --}}
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <div class="hero-card bg-dark bg-opacity-75 rounded-4 shadow-lg p-5 text-center">
                        <h2 class="display-6 mb-3 text-white" style="font-family: 'Playfair Display', serif;">
                            ¿Ya eres cliente de <span class="text-warning">Garabato Café</span>?
                        </h2>
                        <p class="mb-4 text-light fs-5" style="font-family: 'Playfair Display', serif;">
                            Registrate para dejar tu opinión.
                        </p>
                        <div class="d-flex justify-content-center gap-3">
                            <a href="{{ route('register') }}" class="btn btn-outline-light px-4 py-2">
                                <i class="bi bi-person-vcard me-1"></i> Registrarse
                            </a>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


 {{-- Opiniones y formulario --}}
<section class="py-5 bg-amber-50">
    <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {{-- Formulario para clientes --}}
            @auth
                @if(Auth::user()->rol && Auth::user()->rol->nombre === 'Cliente')
                    <div class="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
                        <h3 class="text-xl font-bold text-amber-900 mb-4">¿Cómo fue tu experiencia?</h3>
                        <form method="POST" action="{{ route('opiniones.store') }}">
                            @csrf
                            <input type="hidden" name="rating" id="ratingInput">
                            
                            {{-- Emojis grandes --}}
                            <div class="flex gap-4 mb-4 text-3xl justify-center">
                                <button type="button" class="hover:scale-125 transition-transform" onclick="setRating(5)">😃</button>
                                <button type="button" class="hover:scale-125 transition-transform" onclick="setRating(4)">🙂</button>
                                <button type="button" class="hover:scale-125 transition-transform" onclick="setRating(3)">😐</button>
                                <button type="button" class="hover:scale-125 transition-transform" onclick="setRating(2)">☹️</button>
                                <button type="button" class="hover:scale-125 transition-transform" onclick="setRating(1)">😡</button>
                            </div>

                            <textarea name="comentario" class="w-full border rounded-lg p-2 mb-4" rows="3" placeholder="Escribe tu opinión..."></textarea>

                            <button type="submit" class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg shadow-md transition-colors">
                                Enviar
                            </button>
                        </form>
                    </div>
                @endif
            @endauth

 {{-- Opiniones recientes --}}
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    @forelse ($opiniones as $opinion)
        <div class="flex bg-amber-50 border border-amber-200 rounded-2xl shadow-lg p-4 items-start gap-4 hover:shadow-xl transition-shadow">
            
            {{-- Emoji grande a la izquierda --}}
            <div class="text-6xl animate-bounce">
                @switch($opinion->calificacion)
                    @case(5) 😃 @break
                    @case(4) 🙂 @break
                    @case(3) 😐 @break
                    @case(2) ☹️ @break
                    @case(1) 😡 @break
                    @default 😐
                @endswitch
            </div>

            {{-- Contenido del card --}}
            <div class="flex-1">
                {{-- Nombre del cliente --}}
                <div class="flex items-center justify-between mb-2">
                    <strong class="text-amber-900 text-lg">{{ $opinion->usuario->nombre ?? 'Anónimo' }}</strong>
                    
                    {{-- Estrellas doradas --}}
                    <span class="text-yellow-400 text-lg">
                        @for($i = 1; $i <= 5; $i++)
                            @if($i <= $opinion->calificacion)
                                ★
                            @else
                                ☆
                            @endif
                        @endfor
                    </span>
                </div>

                {{-- Comentario --}}
                <p class="text-gray-800 mb-1">{{ $opinion->comentario }}</p>

                {{-- Fecha --}}
                <small class="text-gray-500">{{ \Carbon\Carbon::parse($opinion->fecha)->format('d/m/Y H:i') }}</small>
            </div>
        </div>
    @empty
        <p class="text-gray-500">Aún no hay opiniones registradas.</p>
    @endforelse
</div>





    {{-- Menú --}}
    <section id="menu" class="py-5 bg-light">
        <div class="container">
            <h3 class="text-center section-title mb-4">✨ Nuestro Menú ✨</h3>

            {{-- Filtros dinámicos --}}
            <ul class="nav nav-pills justify-content-center gap-2 pill-filter mb-4">
                <li class="nav-item">
                    <a class="nav-link active" data-category="all" href="#">Todo</a>
                </li>
                @foreach ($categorias as $categoria)
                    <li class="nav-item">
                        <a class="nav-link" data-category="{{ $categoria->id }}"
                            href="#">{{ $categoria->nombre }}</a>
                    </li>
                @endforeach
            </ul>

            {{-- Cards de productos --}}
            <div class="row g-4" id="menu-items">
                @foreach ($productos as $p)
                    <div class="col-12 col-md-6 col-lg-4 menu-item" data-category="{{ $p->categoria_producto_id }}">
                        <div class="menu-card garabato-card rounded-4 p-3 h-100 shadow-sm">
                            {{-- Imagen --}}
                            <div class="ratio ratio-16x9 mb-3 rounded-3 overflow-hidden border garabato-img">
                                @if ($p->imagen)
                                    <img src="{{ asset('storage/' . $p->imagen) }}" class="w-100 h-100 object-fit-cover"
                                        alt="{{ $p->nombre }}">
                                @else
                                    <div class="d-flex align-items-center justify-content-center text-muted fs-3">🍴</div>
                                @endif
                            </div>

                            {{-- Texto --}}
                            <h5 class="mb-1 fw-bold">{{ $p->nombre }}</h5>
                            <p class="text-muted small mb-2">{{ $p->descripcion }}</p>
                            <div class="fw-bold text-coffee">Bs. {{ number_format($p->precio, 2, ',', '.') }}</div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>


    {{-- Nuestra Historia --}}
    <section id="nosotros" class="py-5 bg-light">
        <div class="container">
            <div class="row g-4 align-items-center">

                {{-- Texto --}}
                <div class="col-12 col-lg-6">
                    <div class="p-4 rounded-4 shadow-sm bg-white">
                        <h3 class="section-title mb-3">Nuestra Historia</h3>
                        <p class="text-muted">
                            Garabato Café nació de la pasión por el arte y el café.
                            Un espacio único en La Paz donde cada rincón está diseñado
                            para transportarte a un mundo ilustrado mientras disfrutas
                            de las mejores bebidas y aperitivos.
                        </p>

                        {{-- Iconos --}}
                        <div class="d-flex flex-wrap gap-4 mt-4 justify-content-center justify-content-lg-start">
                            <div class="text-center">
                                <div class="fs-3 text-coffee mb-1 icon-box">
                                    <i class="bi bi-emoji-sunglasses"></i>
                                </div>
                                <div class="small fw-semibold">Café de Especialidad</div>
                            </div>
                            <div class="text-center">
                                <div class="fs-3 text-coffee mb-1 icon-box">
                                    <i class="bi bi-brush"></i>
                                </div>
                                <div class="small fw-semibold">Arte Original</div>
                            </div>
                            <div class="text-center">
                                <div class="fs-3 text-coffee mb-1 icon-box">
                                    <i class="bi bi-heart"></i>
                                </div>
                                <div class="small fw-semibold">Ambiente Único</div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Imagen --}}
                <div class="col-12 col-lg-6">
                    <div class="position-relative ratio ratio-16x9 rounded-4 overflow-hidden shadow-lg">
                        <img src="{{ asset('img/fondo2.jpeg') }}" alt="Nuestra Historia"
                            class="w-100 h-100 object-fit-cover">
                        <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    {{-- Dirección + mapa --}}
    <section id="direccion" class="py-5 bg-light">
        <div class="container">
            <h3 class="text-center section-title mb-5">Encuéntranos</h3>
            <div class="row g-4 align-items-center">

                {{-- Texto dirección --}}
                <div class="col-12 col-lg-4">
                    <div class="p-4 bg-white rounded-4 shadow-sm h-100">
                        <h6 class="fw-bold text-coffee mb-1"><i class="bi bi-geo-alt-fill me-2"></i>Dirección</h6>
                        <p class="text-muted mb-4">Calle Pinilla esq. Av. 6 de Agosto – La Paz, Bolivia</p>

                        <h6 class="fw-bold text-coffee mb-1"><i class="bi bi-clock-fill me-2"></i>Horarios</h6>
                        <p class="text-muted mb-0">Lunes a Viernes <br> 4:00 PM – 10:00 PM</p>
                    </div>
                </div>

                {{-- Mapa/imagen --}}
                <div class="col-12 col-lg-8">
                    <div class="ratio ratio-16x9 rounded-4 shadow-lg overflow-hidden">

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.2931635680065!2d-68.1237883!3d-16.511290900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f215b8c2feb99%3A0xaa740c5381d35771!2sGarabato%20cafe!5e0!3m2!1ses-419!2sbo!4v1756215138006!5m2!1ses-419!2sbo"
                            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
