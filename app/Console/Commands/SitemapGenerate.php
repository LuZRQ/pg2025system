<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
class SitemapGenerate extends Command
{
     
    protected $signature = 'app:sitemap-generate';
    protected $description = 'Genera automáticamente el sitemap del sitio';

    public function handle()
    {
        // Detecta automáticamente el dominio
        $domain = config('app.url'); // Configurado en .env

        $sitemap = Sitemap::create()
            ->add(Url::create($domain)->setPriority(1.0))
            ->add(Url::create($domain . '/#menu')->setPriority(0.8))
            ->add(Url::create($domain . '/#nosotros')->setPriority(0.8))
            ->add(Url::create($domain . '/#direccion')->setPriority(0.8))
            ->add(Url::create($domain . '/login')->setPriority(0.5));

        // Guardar en public/sitemap.xml
        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('✅ Sitemap generado en ' . public_path('sitemap.xml'));
    }
}