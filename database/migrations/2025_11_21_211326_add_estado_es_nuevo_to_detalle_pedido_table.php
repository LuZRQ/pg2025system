<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('DetallePedido', function (Blueprint $table) {
            // Si usas MySQL y quieres enum:
            $table->enum('estado', ['pendiente', 'preparacion', 'listo'])->default('pendiente')
                ->after('subtotal');
            $table->tinyInteger('es_nuevo')->default(0)->after('estado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('DetallePedido', function (Blueprint $table) {
            $table->dropColumn(['estado', 'es_nuevo']);
        });
    }
};
