// Simulación de pagos (ejemplo de datos)
const pagos = [
    { id_pago: 1, cliente: 'Cliente A', estado: 'pendiente', fechaPago: '2024-10-01', valorPagado: 100 },
    { id_pago: 2, cliente: 'Cliente B', estado: 'pagado', fechaPago: '2024-09-30', valorPagado: 150 },
    // Agrega más pagos si es necesario
];

// Funciones de gestión
function recordarPagosPendientes() {
    return pagos.filter(pago => pago.estado === 'pendiente');
}

function avisarPagosDelDia() {
    const hoy = new Date().toISOString().split('T')[0];
    const pagosDelDia = pagos.filter(pago => pago.fechaPago === hoy && pago.estado === 'pendiente');
    return pagosDelDia.length > 0 ? pagosDelDia : 'No hay pagos pendientes para hoy.';
}

function notificarCancelacion() {
    const hoy = new Date();
    const tresDias = 3;
    const pagosPendientes = pagos.filter(pago => {
        const fechaPago = new Date(pago.fechaPago);
        const diferenciaDias = Math.floor((hoy - fechaPago) / (1000 * 60 * 60 * 24));
        return pago.estado === 'pendiente' && diferenciaDias > tresDias;
    });

    return pagosPendientes.length > 0
        ? `Notificación: Cancelar servicio para los siguientes clientes: ${pagosPendientes.map(p => p.cliente).join(', ')}`
        : 'No hay servicios a cancelar.';
}

// Agregar eventos a los botones
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('recordar-btn').addEventListener('click', () => {
        const pagosPendientes = recordarPagosPendientes();
        console.log('Pagos pendientes:', pagosPendientes);
    });

    document.getElementById('avisar-btn').addEventListener('click', () => {
        const aviso = avisarPagosDelDia();
        console.log('Aviso de pagos del día:', aviso);
    });

    document.getElementById('notificar-btn').addEventListener('click', () => {
        const notificacion = notificarCancelacion();
        console.log(notificacion);
    });
});
