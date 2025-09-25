document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('data-reportes');

    // Top 5 Productos
    const top5 = JSON.parse(el.dataset.top5);
    const DATS = top5.map(p => [p.nombre, p.cantidad]);
    axgracake('GRTORTA', 'Top 5 Productos', 'Cantidad', DATS);

    // Ventas últimos 7 días
    const ventasSemana = JSON.parse(el.dataset.ventasSemana);
    const D1 = ventasSemana.map(v => v.total);
    const G = ventasSemana.map(v => v.fecha);
    axgrabi('G5', 'Ventas Últimos 7 Días', 'Bs.', D1, '', '', G, [], '', '');
});
