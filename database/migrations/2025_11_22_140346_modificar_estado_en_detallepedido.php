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
             // Cambiar columna 'estado' de ENUM a STRING
            $table->string('estado', 50)->default('pendiente')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('DetallePedido', function (Blueprint $table) {
              // Revertir al ENUM original si quieres
            $table->enum('estado', ['pendiente', 'preparacion', 'listo'])->default('pendiente')->change();
        });
    }
};
