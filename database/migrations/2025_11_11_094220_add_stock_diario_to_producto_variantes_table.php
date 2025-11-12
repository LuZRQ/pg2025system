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
        Schema::table('producto_variantes', function (Blueprint $table) {
            $table->unsignedInteger('vendidos_dia')->default(0)->after('stock');
        $table->date('fecha_actualizacion_stock')->nullable()->after('vendidos_dia');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('producto_variantes', function (Blueprint $table) {
            $table->dropColumn(['vendidos_dia', 'fecha_actualizacion_stock']);
        });
    }
};
