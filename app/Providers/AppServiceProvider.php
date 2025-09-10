<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;

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
        // Limitar intentos de login
        RateLimiter::for('login', function (Request $request) {
            return [
                // máximo 3 intentos cada 180 minutos (3 horas)
                Limit::perMinutes(180, 3)->by($request->ip()),
            ];
        });
    }
}