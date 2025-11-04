<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Panel de Administración' }}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    @vite('resources/css/app.css')
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body class="bg-gradient-to-b from-stone-100 to-white text-gray-800 font-sans">

<div x-data="{ open: true, mobileOpen: false }" class="flex h-screen">

  <!-- Sidebar escritorio -->
  <div 
    class="fixed top-0 left-0 h-screen flex flex-col bg-gradient-to-b from-stone-800 to-stone-900 text-white shadow-xl transition-all duration-300 ease-in-out z-40"
    :class="{ 'w-16': !open, 'w-64': open }"
  >
    <!-- Usuario y toggle -->
    <div class="flex items-center justify-between px-4 py-3">
      <div class="w-10 h-10 rounded-full bg-stone-600 flex items-center justify-center text-xl font-bold">
          {{ Auth::user()->nombre[0] ?? 'U' }}
      </div>

      <div x-show="open" class="ml-3 transition-all duration-300 overflow-hidden">
          <p class="font-semibold leading-tight">{{ Auth::user()->nombre ?? 'Usuario' }} {{ Auth::user()->apellido ?? '' }}</p>
          <p class="text-xs text-amber-200 leading-tight">{{ Auth::user()->rol->nombre ?? 'Rol' }}</p>
      </div>

      <button 
          @click="open = !open"
          class="ml-auto flex items-center justify-center w-8 h-8 rounded-md bg-stone-700 hover:bg-stone-600 transition"
          :class="{ 'rotate-180': !open }"
      >
          <i class="fa-solid fa-angles-left text-amber-200 text-sm transition-transform duration-300"></i>
      </button>
    </div>

    <!-- Menú -->
    <nav class="px-3 py-4 space-y-2 text-sm font-medium flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-800 mt-4">
      <p x-show="open" class="uppercase text-xs text-stone-400 mb-2 px-2 sticky top-0 bg-stone-900 py-1">
        Menú principal
      </p>

      @php
        $modulos = \App\Models\Modulo::all();
        $rolModulos = Auth::user()->rol->modulos->pluck('idModulo')->toArray();
      @endphp

      @foreach ($modulos as $modulo)
        @php
          $habilitado = in_array($modulo->idModulo, $rolModulos);
          $rutaValida = $modulo->ruta && Route::has($modulo->ruta);
        @endphp
        <a href="{{ $habilitado && $rutaValida ? route($modulo->ruta) : '#' }}"
           class="group flex items-center gap-3 py-2 px-2 rounded-md transition 
                  {{ $habilitado && $rutaValida 
                      ? 'hover:bg-stone-700 hover:text-amber-200' 
                      : 'text-stone-500 cursor-not-allowed opacity-60' }}">
          <div class="w-6 flex justify-center">
            <i class="fa-solid fa-circle text-[8px] text-stone-400 group-hover:text-amber-200"></i>
          </div>
          <span x-show="open" class="truncate">{{ $modulo->nombre }}</span>
        </a>
      @endforeach
    </nav>

    <!-- Logout -->
    <div class="p-4 border-t border-stone-700 sticky bottom-0 bg-gradient-to-t from-stone-900 to-stone-800">
      <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button class="flex items-center justify-center w-full py-2 bg-stone-700 hover:bg-stone-600 rounded-lg transition shadow">
          <i class="fa-solid fa-power-off text-amber-200 text-sm mr-2"></i>
          <span x-show="open">Cerrar sesión</span>
        </button>
      </form>
    </div>
  </div>



  <!-- Sidebar móvil -->
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden" 
    x-show="mobileOpen" 
    @click="mobileOpen = false"
    x-transition.opacity
  ></div>
  <div 
    class="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-stone-800 to-stone-900 text-white shadow-xl z-50 sm:hidden"
    x-show="mobileOpen"
    x-transition:enter="transition transform duration-300"
    x-transition:enter-start="-translate-x-full"
    x-transition:enter-end="translate-x-0"
    x-transition:leave="transition transform duration-300"
    x-transition:leave-start="translate-x-0"
    x-transition:leave-end="-translate-x-full"
  >
    <!-- Contenido reutilizado del sidebar -->
    <div class="flex items-center justify-between px-4 py-3">
      <div class="w-10 h-10 rounded-full bg-stone-600 flex items-center justify-center text-xl font-bold">
        {{ Auth::user()->nombre[0] ?? 'U' }}
      </div>
      <div class="ml-3">
        <p class="font-semibold leading-tight">{{ Auth::user()->nombre ?? 'Usuario' }} {{ Auth::user()->apellido ?? '' }}</p>
        <p class="text-xs text-amber-200 leading-tight">{{ Auth::user()->rol->nombre ?? 'Rol' }}</p>
      </div>
      <button @click="mobileOpen = false" class="ml-auto flex items-center justify-center w-8 h-8 rounded-md bg-stone-700 hover:bg-stone-600 transition">
        <i class="fa-solid fa-xmark text-amber-200"></i>
      </button>
    </div>

    <nav class="px-3 py-4 space-y-2 text-sm font-medium flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-stone-800 mt-4">
      @foreach ($modulos as $modulo)
        @php
          $habilitado = in_array($modulo->idModulo, $rolModulos);
          $rutaValida = $modulo->ruta && Route::has($modulo->ruta);
        @endphp
        <a href="{{ $habilitado && $rutaValida ? route($modulo->ruta) : '#' }}"
           class="group flex items-center gap-3 py-2 px-2 rounded-md transition 
                  {{ $habilitado && $rutaValida 
                      ? 'hover:bg-stone-700 hover:text-amber-200' 
                      : 'text-stone-500 cursor-not-allowed opacity-60' }}">
          <div class="w-6 flex justify-center">
            <i class="fa-solid fa-circle text-[8px] text-stone-400 group-hover:text-amber-200"></i>
          </div>
          <span>{{ $modulo->nombre }}</span>
        </a>
      @endforeach
    </nav>

    <div class="p-4 border-t border-stone-700 sticky bottom-0 bg-gradient-to-t from-stone-900 to-stone-800">
      <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button class="flex items-center justify-center w-full py-2 bg-stone-700 hover:bg-stone-600 rounded-lg transition shadow">
          <i class="fa-solid fa-power-off text-amber-200 text-sm mr-2"></i>
          <span>Cerrar sesión</span>
        </button>
      </form>
    </div>
  </div>


    <!-- Contenido principal -->
    <div 
      class="flex-1 flex flex-col min-h-screen transition-all duration-300"
      :class="{ 'ml-16': !open, 'ml-64': open }"
    >
      <!-- Header fijo arriba -->
  <header class="bg-stone-800 text-white shadow-md p-3 fixed top-0 right-0 w-full z-30 sm:pl-64">
      <div class="container mx-auto px-4 flex items-center justify-center">
        <h1 class="text-lg text-center font-bold">{{ $title ?? 'Panel de Administración' }}</h1>
        </div>
      </header>

      <!-- Main con scroll independiente -->
    <main class="flex-1 overflow-y-auto p-6 mt-[64px]">
        @foreach (['exito', 'error', 'info'] as $msg)
          @if (session($msg))
            <div class="position-fixed top-0 end-0 p-3" style="z-index: 1100">
              <div class="toast align-items-center text-dark border-0 show shadow-lg animate__animated animate__fadeInDown"
                   style="background: {{ $msg == 'exito' ? 'linear-gradient(135deg, #fffbe6, #f7f305e6)' : ($msg == 'error' ? 'linear-gradient(135deg, #f8d7da, #f5a4a8)' : 'linear-gradient(135deg, #d1ecf1, #a0e1f5)') }}; font-weight: bold; border-radius: 20px; box-shadow: 0 0 15px rgba(0,0,0,0.2);">
                <div class="d-flex">
                  <div class="toast-body d-flex align-items-center">
                    <i class="fa-solid fa-mug-hot fa-bounce me-2 text-warning fs-4"></i>
                    <span class="fs-6">{{ session($msg) }}</span>
                  </div>
                  <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
              </div>
            </div>
            <script>
              setTimeout(() => {
                const toast = document.querySelector('.toast.show');
                toast.classList.remove('animate__fadeInDown');
                toast.classList.add('animate__fadeOut');
                setTimeout(() => toast.remove(), 1000);
              }, 4000);
            </script>
          @endif
        @endforeach

        @yield('content')
      </main>
    </div>

  </div>

  @stack('scripts')
  @vite('resources/js/app.js')
  <script src="{{ asset('js/crudDelete.js') }}"></script>
  <script>
    window.rolUsuario = @json(Auth::user()?->rol?->nombre ?? '');
  </script>
  @vite('resources/js/ventas.js')
  @vite(['resources/js/reporte.js'])
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".form-eliminar").forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará el registro permanentemente.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            });
        });
    });
});
</script>

</body>

</html>
