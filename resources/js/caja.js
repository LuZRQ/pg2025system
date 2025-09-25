document.addEventListener('DOMContentLoaded', () => {
    const selectPedido = document.getElementById('pedidoSeleccionado');
    const totalPagar = document.getElementById('totalPagar');
    const tablaOrden = document.querySelector('#tablaOrden tbody');
    const pagoCliente = document.getElementById('pagoCliente');
    const cambio = document.getElementById('cambio');
    const tipoPago = document.getElementById('tipoPago');

    const pedidoIdInput = document.getElementById('pedidoIdSeleccionado');
    const montoTotalInput = document.getElementById('montoTotalInput');
    const tipoPagoInput = document.getElementById('tipoPagoInput');
    const pagoClienteInput = document.getElementById('pagoClienteInput');

    // Parseamos los pedidos desde el dataset
    const pedidos = JSON.parse(selectPedido.dataset.pedidos || '[]');

    function mostrarPedido(idPedido) {
        const pedido = pedidos.find(p => p.idPedido == idPedido);

        // Limpiar tabla y reset
        tablaOrden.innerHTML = '';
        totalPagar.textContent = 'Bs. 0.00';
        pagoCliente.value = '';
        cambio.textContent = 'Bs. 0.00';
        pedidoIdInput.value = '';
        montoTotalInput.value = '';
        tipoPagoInput.value = tipoPago.value;
        pagoClienteInput.value = '';

        if (!pedido) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="5" class="text-center text-gray-500 py-2">Pedido no encontrado</td>`;
            tablaOrden.appendChild(tr);
            return;
        }

        let total = 0;

        pedido.detalles.forEach(d => {
            const subtotal = parseFloat(d.subtotal) || 0;
            total += subtotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="px-4 py-2">${d.cantidad}</td>
                <td class="px-4 py-2">${d.nombre}</td>
                <td class="px-4 py-2">${d.comentarios || ''}</td>
                <td class="px-4 py-2">Bs. ${parseFloat(d.precio).toFixed(2)}</td>
                <td class="px-4 py-2">Bs. ${subtotal.toFixed(2)}</td>
            `;
            tablaOrden.appendChild(tr);
        });

        totalPagar.textContent = `Bs. ${total.toFixed(2)}`;

        // Actualizar inputs hidden del formulario
        pedidoIdInput.value = idPedido;
        montoTotalInput.value = total.toFixed(2);
        tipoPagoInput.value = tipoPago.value;
        pagoClienteInput.value = '';
    }

    selectPedido.addEventListener('change', () => {
        mostrarPedido(selectPedido.value);
    });

    tipoPago.addEventListener('change', () => {
        tipoPagoInput.value = tipoPago.value;
    });

    pagoCliente.addEventListener('input', () => {
        const total = parseFloat(totalPagar.textContent.replace('Bs. ', '')) || 0;
        const pago = parseFloat(pagoCliente.value) || 0;
        const restante = pago - total;
        cambio.textContent = `Bs. ${restante >= 0 ? restante.toFixed(2) : '0.00'}`;

        // Actualizamos el input hidden
        pagoClienteInput.value = pagoCliente.value;
    });

    // 🚀 Aquí viene lo nuevo: manejar el submit vía AJAX
    const formCobrar = document.getElementById('formCobrar');
    formCobrar.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: data,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                // Actualizamos totales de caja en tiempo real
                document.getElementById('totalEfectivo').textContent = `Bs. ${json.totalEfectivo.toFixed(2)}`;
                document.getElementById('totalTarjeta').textContent = `Bs. ${json.totalTarjeta.toFixed(2)}`;
                document.getElementById('totalQR').textContent = `Bs. ${json.totalQR.toFixed(2)}`;
                document.getElementById('totalEnCaja').textContent = `Bs. ${json.totalCaja.toFixed(2)}`;

                alert("✅ Venta registrada correctamente");
            } else {
                alert("❌ Error: " + json.message);
            }
        })
        .catch(err => console.error(err));
    });
});
