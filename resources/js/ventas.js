document.addEventListener('DOMContentLoaded', () => {
    let pedido = [];
    const mesaSelect = document.getElementById('select-mesa');
    const pedidoItems = document.getElementById('pedido-items');
    const pedidoTotal = document.getElementById('pedido-total');
    const comentarioText = document.getElementById('comentario-text');
    const formEnviar = document.getElementById('form-enviar');

    // Filtrar productos
    document.querySelectorAll('.btn-categoria').forEach(btn => {
        btn.addEventListener('click', () => {
            const categoriaId = btn.dataset.categoria;

            // Quitar la clase activa de todos los botones
            document.querySelectorAll('.btn-categoria').forEach(b => {
                b.classList.remove('bg-amber-700', 'text-white');
                b.classList.add('bg-amber-100', 'text-amber-800');
            });

            // Agregar clase activa al botón clickeado
            btn.classList.add('bg-amber-700', 'text-white');
            btn.classList.remove('bg-amber-100', 'text-amber-800');

            // Filtrar productos
            document.querySelectorAll('.producto-card').forEach(card => {
                card.style.display = (categoriaId === 'all' || card.dataset.categoria == categoriaId) ? 'block' : 'none';
            });
        });
    });

   // Agregar productos
document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const nombre = btn.dataset.nombre;
        const precioBase = parseFloat(btn.dataset.precio);
        const stockProducto = parseInt(btn.dataset.stock);  // stock inicial del producto
        const variantes = btn.dataset.variantes ? JSON.parse(btn.dataset.variantes) : null;

        let varianteSeleccionada = null;
        let stockVariante = stockProducto;  // Se asume que es el stock inicial por defecto

        // Si el producto tiene variantes
        if (variantes) {
            const contenedor = btn.closest('.producto-card');
            const selectVariante = contenedor.querySelector('.select-variante');
            if (selectVariante && selectVariante.value) {
                varianteSeleccionada = variantes.find(v => v.idVariante == selectVariante.value);
                if (varianteSeleccionada) stockVariante = varianteSeleccionada.stock;  // stock de la variante
            }
        }

        // Si no tiene variante, se ajusta el stock con el de producto general
        if (!variantes || !varianteSeleccionada) {
            const itemExistente = pedido.find(p => p.idProducto === id && p.idVariante === null);  // Verificar en el carrito
            stockVariante = stockProducto - (itemExistente ? itemExistente.cantidad : 0);  // Restamos lo que ya está en el carrito
        }

        const idVariante = varianteSeleccionada ? varianteSeleccionada.idVariante : null;
        const nombreConVariante = varianteSeleccionada ? `${nombre} - ${varianteSeleccionada.nombre}` : nombre;

        // Buscar item en el array del pedido
        let item = pedido.find(p => p.idProducto === id && p.idVariante === idVariante);

        // Validar si hay suficiente stock
        if (item && item.cantidad >= stockVariante) {
            alert('¡No hay suficiente stock!');
            return;
        }

        // Si ya existe el producto en el carrito, aumentar la cantidad; si no, agregarlo
        if (item) item.cantidad++;
        else pedido.push({
            idProducto: id,
            idVariante: idVariante,
            nombre: nombreConVariante,
            precio: varianteSeleccionada ? parseFloat(varianteSeleccionada.precio) : precioBase,
            cantidad: 1,
            stock: stockVariante  // Usar el stock restante actualizado
        });

        renderPedido();
    });
});

function renderPedido() {
    pedidoItems.innerHTML = '';
    let total = 0;
    pedido.forEach(item => {
        total += item.precio * item.cantidad;

        const div = document.createElement('div');
        div.className = 'flex justify-between items-center mb-3';
        div.innerHTML = `
            <div class="flex items-center gap-2">
                <button class="px-2 py-1 bg-amber-200 rounded hover:bg-amber-300 btn-decrement">-</button>
                <span class="cantidad">${item.cantidad}</span>
                <button class="px-2 py-1 rounded btn-increment">+</button>
                <span class="text-amber-900 font-semibold">${item.nombre}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-amber-700">Bs. ${(item.precio * item.cantidad).toFixed(2)}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-500 cursor-pointer btn-eliminar" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 11v6m4-6v6" />
                </svg>
            </div>
        `;
        pedidoItems.appendChild(div);

        const btnIncrement = div.querySelector('.btn-increment');
        const btnDecrement = div.querySelector('.btn-decrement');

        // ⚠️ Deshabilitar / poner rojo si llegamos al stock
        if (item.cantidad >= item.stock) {
            btnIncrement.classList.add('bg-red-500', 'text-white', 'cursor-not-allowed');
            btnIncrement.disabled = true; // bloquea el click
        } else {
            btnIncrement.classList.remove('bg-red-500', 'text-white', 'cursor-not-allowed');
            btnIncrement.classList.add('bg-amber-200'); // color normal
            btnIncrement.disabled = false;
        }

        // Eventos
        btnIncrement.addEventListener('click', () => cambiarCantidad(item.idProducto, 1, item.idVariante));
        btnDecrement.addEventListener('click', () => cambiarCantidad(item.idProducto, -1, item.idVariante));
        div.querySelector('.btn-eliminar').addEventListener('click', () => eliminarItem(item.idProducto, item.idVariante));
    });
    pedidoTotal.innerText = 'Bs. ' + total.toFixed(2);
}

// Cambiar cantidad (ya con stock)
function cambiarCantidad(id, delta, idVariante = null) {
    let item = pedido.find(p => p.idProducto === id && p.idVariante === idVariante);
    if (!item) return;

    const nuevaCantidad = item.cantidad + delta;

    if (nuevaCantidad > item.stock) {
        alert('¡No hay suficiente stock!');
        return;
    }

    item.cantidad = Math.max(1, nuevaCantidad);

    renderPedido();
}


    // Eliminar item
    function eliminarItem(id, idVariante = null) {
        pedido = pedido.filter(p => !(p.idProducto === id && p.idVariante === idVariante));
        renderPedido();
    }

    // Enviar pedido
    const btnEnviar = document.getElementById('btn-enviar-pedido');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', () => {
            if (pedido.length === 0) return alert("No hay productos en el pedido");

            formEnviar.mesa.value = mesaSelect.value.replace("Mesa: ", "");
            formEnviar.comentarios.value = comentarioText.value;
            formEnviar.productos.value = JSON.stringify(pedido);
            formEnviar.submit();
            alert(" Pedido enviado correctamente a cocina.");
            cancelarPedido();
        });
    }

    // Cancelar pedido
    const btnCancelar = document.getElementById('btn-cancelar-pedido');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            cancelarPedido();
        });
    }

    function cancelarPedido() {
        pedido = [];
        renderPedido();
    }
});
