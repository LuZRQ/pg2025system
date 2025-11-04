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
        Schema::create('producto_variantes', function (Blueprint $table) {
            $table->id('idVariante');
        $table->unsignedBigInteger('productoId'); // FK explícita
            $table->foreign('productoId')
                  ->references('idProducto')
                  ->on('Producto') // con mayúscula P
                  ->onDelete('cascade');
            $table->enum('tipo', ['caliente', 'frio']); // Aquí puedes agregar más tipos en el futuro
            $table->decimal('precio', 10, 2);
            $table->integer('stock')->default(0);
            $table->boolean('estado')->default(1); // 1=Activo, 0=Inactivo
          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto_variantes');
    }
};
