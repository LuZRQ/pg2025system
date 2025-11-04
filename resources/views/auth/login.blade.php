@extends('layouts.publicdos')

@section('title', 'Iniciar Sesión • Garabato Café')


@section('content')
<section class="d-flex align-items-center justify-content-center"
    style="min-height: 100vh; width: 100%; background-image: url('{{ asset('img/fondo1.jpeg') }}'); background-size: cover; background-position: center; background-repeat: no-repeat; background-attachment: fixed; margin: 0; padding: 0;">

    <div class="card shadow-lg p-4 rounded-4"
        style="max-width: 400px; width: 90%; background: rgba(46, 30, 1, 0.6); color: white; transition: background 0.3s ease;">

        {{-- Logo --}}
        <div class="text-center mb-4">
            <img src="{{ asset('img/fondo3.png') }}" alt="Garabato Café" class="rounded-circle shadow"
                style="width:100px; height:100px; object-fit:cover; border: 3px solid white; background: rgba(247, 237, 220, 0.9);">
        </div>

        <h4 class="text-center mb-4 fw-bold">Iniciar Sesión</h4>

        @php
            $key = Str::lower(old('ci', '')) . '|' . request()->ip();
            $seconds = RateLimiter::availableIn($key);
            $disabled = $seconds > 0;
        @endphp

        {{-- Mensaje de bloqueo dinámico --}}
        @if ($disabled)
            <div id="lock-message" class="alert text-center mb-3 p-2 rounded"
                style="background-color: #ffebcc; color: #7a3e00; font-weight: 600;">
                Demasiados intentos fallidos. Intenta de nuevo en
                <span id="countdown" style="font-family: monospace; font-size: 1.1em;">
                    {{ gmdate('H:i:s', $seconds) }}
                </span>
            </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf

            {{-- CI --}}
            <div class="mb-3">
                <label for="ci" class="form-label fw-bold">Número de CI</label>
                <input type="text" name="ci" id="ci" class="form-control" value="{{ old('ci') }}"
                    required pattern="\d{1,8}" title="Ingresa solo números" @if ($disabled) disabled @endif>
                @error('ci')
                    <small class="text-warning">{{ $message }}</small>
                @enderror
            </div>

        <div class="mb-3">
    <label for="contrasena" class="form-label fw-bold">Contraseña</label>
    <div class="input-group">
        <input type="password" name="contrasena" id="contrasena" class="form-control" required maxlength="20"
            @if ($disabled) disabled @endif>

        <button class="btn btn-outline-secondary" type="button" id="togglePassword"
            style="background: transparent; border-color: #f0dd97;">
            <i class="fas fa-eye" style="color: #f0dd97;"></i>
        </button>
    </div>
    @error('contrasena')
        <small class="text-warning">{{ $message }}</small>
    @enderror
</div>

            {{-- CAPTCHA oculto inicialmente --}}
            <div id="captcha-div" class="mb-3" style="display: none;">
                <label class="form-label fw-bold">Verificación</label>
                {!! NoCaptcha::display() !!}
                @error('g-recaptcha-response')
                    <small class="text-warning">{{ $message }}</small>
                @enderror
            </div>

            <button type="submit" class="btn w-100 fw-bold text-dark border border-black"
                style="background-color: #f0dd97; transition: background 0.3s ease;"
                @if ($disabled) disabled @endif>
                Entrar
            </button>
        </form>
    </div>
</section>

{{-- Scripts --}}
<script>
 const togglePasswordBtn = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#contrasena');

    togglePasswordBtn.addEventListener('click', function () {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

        // Cambiar ícono, manteniendo el color amarillo
        this.innerHTML = isPassword
            ? '<i class="fas fa-eye-slash" style="color: #f0dd97;"></i>'
            : '<i class="fas fa-eye" style="color: #f0dd97;"></i>';
    });

    // Bloqueo dinámico y CAPTCHA
    @if ($disabled)
        let remaining = {{ $seconds }};
        const countdown = document.getElementById('countdown');
        const ciInput = document.getElementById('ci');
        const passInput = document.getElementById('contrasena');
        const submitBtn = document.querySelector('button[type="submit"]');
        const lockMessage = document.getElementById('lock-message');
        const captchaDiv = document.getElementById('captcha-div');

        const interval = setInterval(() => {
            if (remaining <= 0) {
                clearInterval(interval);
                countdown.innerText = "¡Ahora puedes intentar de nuevo!";
                lockMessage.style.backgroundColor = "#d4edda";
                lockMessage.style.color = "#155724";

                ciInput.disabled = false;
                passInput.disabled = false;
                submitBtn.disabled = false;

                captchaDiv.style.display = 'block';
            } else {
                let h = Math.floor(remaining / 3600).toString().padStart(2, '0');
                let m = Math.floor((remaining % 3600) / 60).toString().padStart(2, '0');
                let s = (remaining % 60).toString().padStart(2, '0');
                countdown.innerText = `${h}:${m}:${s}`;

                let ratio = remaining / {{ $seconds }};
                lockMessage.style.backgroundColor = `rgba(255, 235, 204, ${0.5 + 0.5*ratio})`;
                lockMessage.style.color = `rgba(122, 62, 0, ${0.7 + 0.3*ratio})`;

                remaining--;
            }
        }, 1000);
    @endif
</script>
@endsection
