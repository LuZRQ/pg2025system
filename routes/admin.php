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
// Gestion de ventas aliado con caja
Route::prefix('ventas')->name('ventas.')->group(function () {
    Route::get('/', [VentaController::class, 'index'])->name('index');       // Listado + catálogo
    Route::get('/create', [VentaController::class, 'create'])->name('create'); // Formulario crear venta
    Route::post('/', [VentaController::class, 'store'])->name('store');       // Guardar venta
    Route::get('/{id}', [VentaController::class, 'show'])->name('show');      // Ver venta
    Route::get('/{id}/edit', [VentaController::class, 'edit'])->name('edit'); // Editar venta
    Route::put('/{id}', [VentaController::class, 'update'])->name('update');  // Actualizar venta
    Route::delete('/{id}', [VentaController::class, 'destroy'])->name('destroy'); // Eliminar venta
});
// Rutas para cocina
// Ver pedidos de cocina (index)
Route::get('/cocina/pedidos', [PedidoController::class, 'index'])->name('pedidos.index');
Route::post('/ventas/enviarACocina', [VentaController::class, 'enviarACocina'])
    ->name('ventas.enviarACocina')
    ->middleware('auth');

// Cambiar estado de un pedido
Route::post('/cocina/pedidos/{pedido}/estado', [PedidoController::class, 'cambiarEstado'])->name('pedidos.cambiarEstado');

// Opcional: ver detalle de pedido
Route::get('/cocina/pedidos/{pedido}', [PedidoController::class, 'show'])->name('pedidos.show');

// Opcional: listar pedidos listos
Route::get('/cocina/pedidos/listos', [PedidoController::class, 'listos'])->name('pedidos.listos');
    //});
