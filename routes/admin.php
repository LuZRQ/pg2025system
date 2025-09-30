<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\Pedido;
use App\Http\Controllers\Admin\{
    PublicController,
    UsuarioController,
    PdfController,
    AuditoriaController,
    RolController,
    ProductoController,
    StockController,
    VentaController,
    PedidoController,
    CajaController,
    ReporteController
};
use App\Http\Controllers\PdfController as ControllersPdfController;

// =============== DUEÑO (todo el sistema) ===============
Route::middleware(['auth', 'verificarRol:Usuarios y Roles'])->group(function () {
    // -------- Usuarios --------
    Route::get('usuarios', [UsuarioController::class, 'index'])->name('usuarios.index');
    Route::get('usuarios/crear', [UsuarioController::class, 'crear'])->name('usuarios.crear');
    Route::post('usuarios', [UsuarioController::class, 'guardar'])->name('usuarios.guardar');
    Route::get('usuarios/{ciUsuario}/editar', [UsuarioController::class, 'editar'])->name('usuarios.editar');
    Route::put('usuarios/{ciUsuario}', [UsuarioController::class, 'actualizar'])->name('usuarios.actualizar');
    Route::delete('usuarios/{ciUsuario}', [UsuarioController::class, 'eliminar'])->name('usuarios.eliminar');
    Route::get('usuarios/{ciUsuario}', [UsuarioController::class, 'mostrar'])->name('usuarios.mostrar');

    // -------- Roles --------
    Route::get('roles', [RolController::class, 'index'])->name('roles.index');
    Route::get('roles/crear', [RolController::class, 'crear'])->name('roles.crear');
    Route::post('roles', [RolController::class, 'guardar'])->name('roles.guardar');
    Route::get('roles/{idRol}/editar', [RolController::class, 'editar'])->name('roles.editar');
    Route::put('roles/{idRol}', [RolController::class, 'actualizar'])->name('roles.actualizar');
    Route::delete('roles/{idRol}', [RolController::class, 'eliminar'])->name('roles.eliminar');

    // -------- Reportes --------
    Route::get('reportes', [ReporteController::class, 'index'])->name('reportes.index');
    Route::get('reportes/{id}', [ReporteController::class, 'show'])->name('reportes.show');

    // -------- Auditoría --------
    Route::get('auditoria', [AuditoriaController::class, 'index'])->name('auditoria.index');
    Route::get('auditoria/{id}', [AuditoriaController::class, 'show'])->name('auditoria.show');
});

// =============== VENTAS (módulo: Gestión de Ventas) ===============
Route::middleware(['auth', 'verificarRol:Gestión de Ventas'])->group(function () {
    Route::prefix('ventas')->name('ventas.')->group(function () {
        Route::get('/', [VentaController::class, 'index'])->name('index');
        Route::get('/crear', [VentaController::class, 'create'])->name('crear');
        Route::post('/', [VentaController::class, 'store'])->name('guardar');

        // Historial de ventas
        Route::get('/historial', [VentaController::class, 'historial'])->name('historial');

        // Enviar pedidos a cocina
        Route::post('/enviarACocina', [VentaController::class, 'enviarACocina'])->name('enviarACocina');

        // 💰 Caja (parte de ventas, pero usa CajaController)
        Route::get('/caja', [CajaController::class, 'index'])->name('caja');
        Route::post('/cobrar', [CajaController::class, 'cobrar'])->name('cobrar');
        Route::get('/recibo/{idVenta}', [CajaController::class, 'recibo'])->name('recibo');
        Route::post('/cerrarCaja', [CajaController::class, 'cerrarCaja'])->name('cerrarCaja');

        // Exportaciones
        Route::get('/caja/export/excel', [CajaController::class, 'exportExcel'])->name('caja.export.excel');
        Route::get('/caja/export/pdf', [CajaController::class, 'exportPDF'])->name('caja.export.pdf');

        // Recibo en PDF con PdfController (si lo mantienes)
        Route::get('/recibo/pdf/{idVenta}', [PdfController::class, 'reciboVenta'])->name('recibo.pdf');
    });
});


// =============== COCINA (modulos: Pedidos de Cocina, Gestión de Productos, Control de Stock) ===============
Route::middleware(['auth', 'verificarRol:Pedidos de Cocina,Gestión de Productos,Control de Stock'])->group(function () {
    // Pedidos de cocina
    Route::get('/cocina/pedidos', [PedidoController::class, 'index'])->name('pedidos.index');
    Route::post('/cocina/pedidos/{pedido}/estado', [PedidoController::class, 'cambiarEstado'])->name('pedidos.cambiarEstado');
    Route::get('/cocina/pedidos/{pedido}', [PedidoController::class, 'mostrar'])->name('pedidos.mostrar');
    Route::get('/cocina/pedidos/listos', [PedidoController::class, 'listos'])->name('pedidos.listos');

    // -------- Productos --------
    Route::get('productos', [ProductoController::class, 'index'])->name('productos.index');
    Route::get('productos/crear', [ProductoController::class, 'crear'])->name('productos.crear');
    Route::post('productos', [ProductoController::class, 'guardar'])->name('productos.guardar');
    Route::get('productos/{idProducto}/editar', [ProductoController::class, 'editar'])->name('productos.editar');
    Route::put('productos/{idProducto}', [ProductoController::class, 'actualizar'])->name('productos.actualizar');
    Route::delete('productos/{idProducto}', [ProductoController::class, 'eliminar'])->name('productos.eliminar');
    Route::get('productos/{idProducto}', [ProductoController::class, 'ver'])->name('productos.ver');

    // -------- Stock --------
    Route::get('stock', [StockController::class, 'index'])->name('stock.index');
    Route::post('stock/{idProducto}/entrada', [StockController::class, 'entrada'])->name('stock.entrada');
    Route::post('stock/{idProducto}/salida', [StockController::class, 'salida'])->name('stock.salida');
});



// =============== REPORTES (Módulo: Ventas, Stock) ===============
// Reportes
Route::middleware(['auth', 'verificarRol:Gestión de Reportes'])->group(function () {

    // -------- Página principal de reportes --------
    Route::get('/reportes', [ReporteController::class, 'index'])->name('reportes.index');
    Route::get('/reportes/{id}', [ReporteController::class, 'show'])->name('reportes.show');


    // -------- Ventas --------
   
    Route::get('/reportes/ventas/dia/excel', [ReporteController::class, 'ventasDiaExcel'])->name('reportes.ventasDiaExcel');
Route::get('/reportes/ventas-dia/pdf', [ReporteController::class, 'generarVentasDiaPDF'])
    ->name('reportes.ventasDiaPDF');


    Route::get('/reportes/ventas/semana/pdf', [ReporteController::class, 'ventasSemanalPDF'])->name('reportes.ventasSemanalPDF');
    Route::get('/reportes/ventas/semana/excel', [ReporteController::class, 'ventasSemanaExcel'])->name('reportes.ventasSemanaExcel');

    Route::get('/reportes/ventas/mes/pdf', [ReporteController::class, 'ventasMesPDF'])->name('reportes.ventasMesPDF');
    Route::get('/reportes/ventas/mes/excel', [ReporteController::class, 'ventasMesExcel'])->name('reportes.ventasMesExcel');

    // -------- Stock --------
    // web.php
Route::get('/reportes/stock/pdf', [ReporteController::class, 'stockPDF'])->name('reportes.stockPDF');

    Route::get('/reportes/stock/excel', [ReporteController::class, 'stockExcel'])->name('reportes.stockExcel');
});

