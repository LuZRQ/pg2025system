<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL; 

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Forzar HTTPS en producción (como en ngrok)
   //  if (config('app.env') === 'production') {
       //    URL::forceScheme('https');
     //  }

        //Limitar intentos de login
        RateLimiter::for('login', function (Request $request) {
            return [
                Limit::perMinutes(60, 3)->by($request->ip()),
            ];
        });

        //Forzar idioma español
        Lang::setFallback('es');
        app()->setLocale('es');

        //  Cargar traducciones desde bootstrap/lang
        $langPath = base_path('bootstrap/lang');
        if (File::exists($langPath)) {
            $this->loadTranslationsFrom($langPath, 'lang');
        }
    }
}
