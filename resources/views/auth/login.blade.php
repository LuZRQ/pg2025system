@extends('layouts.publicdos')

@section('title', 'Iniciar Sesión • Garabato Café')

@section('content')
<section class="d-flex align-items-center justify-content-center"
    style="
        min-height: 100vh;
        width: 100%;
        background-image: url('{{ asset('img/fondo1.jpeg') }}');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        margin: 0;
        padding: 0;
    ">

    <div class="card shadow-lg p-4 rounded-4"
         style="
            max-width: 400px;
            width: 90%;
            background: rgba(46, 30, 1, 0.507); 
            color: white;
        ">

        {{-- Logo --}}
        <div class="text-center mb-4">
            <img src="{{ asset('img/fondo3.png') }}" alt="Garabato Café"
                 class="rounded-circle shadow"
                 style="width:100px; height:100px; object-fit:cover; border: 3px solid white;background: rgba(247, 237, 220, 0.863);">
        </div>

        <h4 class="text-center mb-4 fw-bold">Iniciar Sesión</h4>

        <form method="POST" action="{{ route('login') }}">
            @csrf

            <div class="mb-3">
                <label for="ci" class="form-label fw-bold">Número de CI</label>
                <input type="text" name="ci" id="ci" class="form-control" value="{{ old('ci') }}" required>
                @error('ci') <small class="text-warning">{{ $message }}</small> @enderror
            </div>

            <div class="mb-3">
                <label for="contrasena" class="form-label fw-bold">Contraseña</label>
                <input type="password" name="contrasena" id="contrasena" class="form-control" required>
                @error('contrasena') <small class="text-warning">{{ $message }}</small> @enderror
            </div>

           

            <button type="submit" class="btn w-100 fw-bold text-dark border border-black" style=" background-color: #f0dd97;">
                Entrar
            </button>
        </form>
    </div>
</section>
@endsection
