<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
// Registrar tu comando personalizado de Sitemap
Artisan::command('app:sitemap-generate', function () {
    $this->call(\App\Console\Commands\SitemapGenerate::class);
})->purpose('Genera el sitemap.xml del sitio web');