import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    base: '/',
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/ventas.js',
                'resources/js/reporte.js',
                'resources/js/caja.js',
                'resources/js/recibo.js',
            ],
            refresh: true,
        }),
    ],
});