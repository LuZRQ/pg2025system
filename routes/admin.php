<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\{
    PanelController,
    UsuarioController,
    AuditoriaController,
    RolController,
    ProductoController,
    StockController,
    VentaController,
    PedidoController,
    ReporteController
};

// Todas las rutas de admin solo accesibles por usuarios autenticados con rol Dueno
//Route::middleware(['auth', 'rol:Dueno'])->group(function () {

    // Usuarios
    Route::get('usuarios', [UsuarioController::class, 'index'])->name('usuarios.index');
    Route::get('usuarios/crear', [UsuarioController::class, 'crear'])->name('usuarios.crear');
    Route::post('usuarios', [UsuarioController::class, 'guardar'])->name('usuarios.guardar');
    Route::get('usuarios/{ciUsuario}/editar', [UsuarioController::class, 'editar'])->name('usuarios.editar');
    Route::put('usuarios/{ciUsuario}', [UsuarioController::class, 'actualizar'])->name('usuarios.actualizar');
    Route::delete('usuarios/{ciUsuario}', [UsuarioController::class, 'eliminar'])->name('usuarios.eliminar');
    Route::get('usuarios/{ciUsuario}', [UsuarioController::class, 'mostrar'])->name('usuarios.mostrar');
Route::get('permisos', [UsuarioController::class, 'permisos'])->name('permisos.index');

    // Roles
    Route::get('roles', [RolController::class, 'index'])->name('roles.index');
    Route::get('roles/crear', [RolController::class, 'crear'])->name('roles.crear');
    Route::post('roles', [RolController::class, 'guardar'])->name('roles.guardar');
    Route::get('roles/{idRol}/editar', [RolController::class, 'editar'])->name('roles.editar');
    Route::put('roles/{idRol}', [RolController::class, 'actualizar'])->name('roles.actualizar');
    Route::delete('roles/{idRol}', [RolController::class, 'eliminar'])->name('roles.eliminar');

    // Productos
    Route::get('productos', [ProductoController::class, 'index'])->name('productos.index');
    Route::get('productos/crear', [ProductoController::class, 'crear'])->name('productos.crear');
    Route::post('productos', [ProductoController::class, 'guardar'])->name('productos.guardar');
    Route::get('productos/{idProducto}/editar', [ProductoController::class, 'editar'])->name('productos.editar');
    Route::put('productos/{idProducto}', [ProductoController::class, 'actualizar'])->name('productos.actualizar');
    Route::delete('productos/{idProducto}', [ProductoController::class, 'eliminar'])->name('productos.eliminar');
    Route::get('productos/{idProducto}', [ProductoController::class, 'ver'])->name('productos.ver');

    // Stock
    Route::get('stock', [StockController::class, 'index'])->name('stock.index');
    Route::post('stock/{idProducto}/entrada', [StockController::class, 'entrada'])->name('stock.entrada');
    Route::post('stock/{idProducto}/salida', [StockController::class, 'salida'])->name('stock.salida');

    // Panel principal del admin
    Route::get('panel', [PanelController::class, 'index'])->name('admin.panel');
//});
