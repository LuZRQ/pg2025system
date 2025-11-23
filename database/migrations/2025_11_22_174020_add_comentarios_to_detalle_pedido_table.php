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
             $table->string('comentarios', 255)->nullable()->after('es_nuevo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('DetallePedido', function (Blueprint $table) {
                        $table->dropColumn('comentarios');

        });
    }
};
