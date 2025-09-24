document.addEventListener('DOMContentLoaded', () => {
    const selectPedido = document.getElementById('pedidoSeleccionado');
    const totalPagar = document.getElementById('totalPagar');
    const tablaOrden = document.querySelector('#tablaOrden tbody');
    const pagoCliente = document.getElementById('pagoCliente');
    const cambio = document.getElementById('cambio');

    // Asegúrate que pedidos sea un array
    const pedidos = JSON.parse(selectPedido.dataset.pedidos);

    function mostrarPedido(idPedido) {
        const pedido = pedidos.find(p => p.idPedido == idPedido);
        if (!pedido) {
            console.warn("Pedido no encontrado:", idPedido);
            return;
        }

        // Limpiar tabla
        tablaOrden.innerHTML = '';
        let total = 0;

pedido.detalles.forEach(d => {
    const subtotal = parseFloat(d.subtotal) || 0; // 👈 forzamos a número
    total += subtotal;
           

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="px-4 py-2">${d.cantidad}</td>
                <td class="px-4 py-2">${d.nombre}</td>
                <td class="px-4 py-2">${d.comentarios}</td>
                <td class="px-4 py-2">Bs. ${parseFloat(d.precio).toFixed(2)}</td>
                <td class="px-4 py-2">Bs. ${parseFloat(subtotal).toFixed(2)}</td>
            `;
            tablaOrden.appendChild(tr);
        });

        totalPagar.textContent = `Bs. ${total.toFixed(2)}`;

        // Reset cambio
        pagoCliente.value = '';
        cambio.textContent = 'Bs. 0.00';
    // 👉 Actualizar input hidden del formulario
         // 👉 Actualizar inputs del form
    document.getElementById('pedidoIdSeleccionado').value = idPedido;
    document.getElementById('montoTotalInput').value = total.toFixed(2);
}

    selectPedido.addEventListener('change', () => {
        mostrarPedido(selectPedido.value);
    });

    pagoCliente.addEventListener('input', () => {
        const total = parseFloat(totalPagar.textContent.replace('Bs. ', '')) || 0;
        const pago = parseFloat(pagoCliente.value) || 0;
        const restante = pago - total;
        cambio.textContent = `Bs. ${restante >= 0 ? restante.toFixed(2) : '0.00'}`;
    });
});
