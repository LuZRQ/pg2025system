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
            $table->unsignedBigInteger('variante_id')->nullable()->after('idProducto');

        // 🔗 Relación con la tabla producto_variantes
        $table->foreign('variante_id')
              ->references('idVariante')
              ->on('producto_variantes')
              ->nullOnDelete();
    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('DetallePedido', function (Blueprint $table) {
          $table->dropForeign(['variante_id']);
        $table->dropColumn('variante_id');
        });
    }
};
