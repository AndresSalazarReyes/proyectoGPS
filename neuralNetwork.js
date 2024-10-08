const { Layer, Network, Trainer } = require('synaptic');
const { Client } = require('pg'); // Importar el cliente de PostgreSQL

// Crear capas
const inputLayer = new Layer(3); // 3 entradas
const hiddenLayer1 = new Layer(5); // Primera capa oculta
const hiddenLayer2 = new Layer(5); // Segunda capa oculta
const outputLayer = new Layer(3); // 3 salidas

// Conectar capas usando el método project()
inputLayer.project(hiddenLayer1);
hiddenLayer1.project(hiddenLayer2);
hiddenLayer2.project(outputLayer);

// Crear red
const network = new Network({
    input: inputLayer,
    hidden: [hiddenLayer1, hiddenLayer2],
    output: outputLayer
});

// Preparar conjunto de entrenamiento (ejemplo)
const trainingSet = [
    { input: [1, 100, 1], output: [1, 0, 0] }, // Recordar
    { input: [0, 50, 0], output: [0, 1, 0] },  // Avisar
    { input: [0, 0, 0], output: [0, 0, 1] },    // Cancelar
    // Puedes añadir más ejemplos aquí...
];

// Entrenar la red
const trainer = new Trainer(network);
trainer.train(trainingSet, {
    rate: 0.1,
    iterations: 20000,
    error: 0.005,
    shuffle: true,
    log: true,
    cost: Trainer.cost.CROSS_ENTROPY
});

// Definición de funciones
function recordarPagosPendientes(pagos) {
    return pagos.filter(pago => pago.estado === 'pendiente');
}

function avisarPagosDelDia(pagos) {
    const hoy = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD
    const pagosDelDia = pagos.filter(pago => pago.fechaPago === hoy && pago.estado === 'pendiente');
    return pagosDelDia.length > 0 ? pagosDelDia : 'No hay pagos pendientes para hoy.';
}

function notificarCancelacion(pagos) {
    const hoy = new Date();
    const tresDias = 3; // Número de días para considerar la cancelación

    const pagosPendientes = pagos.filter(pago => {
        const fechaPago = new Date(pago.fechaPago);
        const diferenciaDias = Math.floor((hoy - fechaPago) / (1000 * 60 * 60 * 24));
        return pago.estado === 'pendiente' && diferenciaDias > tresDias;
    });

    return pagosPendientes.length > 0
        ? `Notificación: Cancelar servicio para los siguientes clientes: ${pagosPendientes.map(p => p.cliente).join(', ')}`
        : 'No hay servicios a cancelar.';
}

// Función para obtener pagos desde la base de datos
async function obtenerPagos() {
    const client = new Client({
        user: 'postgres',         // Reemplaza con tu usuario
        host: 'localhost',          // Cambia si es necesario
        database: 'baseDeDatosGps', // Reemplaza con tu base de datos
        password: '',  // Reemplaza con tu contraseña
        port: 5432,                 // Puerto por defecto
    });

    await client.connect(); // Conectar a la base de datos

    const res = await client.query('SELECT * FROM pagos'); // Consulta a la tabla pagos
    await client.end(); // Cerrar la conexión

    return res.rows; // Retornar los resultados
}

// Ejecutar la función para obtener los pagos
obtenerPagos().then(pagos => {
    // Ejecutar funciones con los datos obtenidos
    console.log('Pagos obtenidos:', pagos);
    console.log('Pagos pendientes:', recordarPagosPendientes(pagos));
    console.log('Aviso de pagos del día:', avisarPagosDelDia(pagos));
    console.log(notificarCancelacion(pagos));

    // Probar la red
    const result = predictAction(0, 50, 0); // Datos de ejemplo
    console.log(result); // Salidas: [recordar, avisar, cancelar]
}).catch(err => console.error('Error al obtener los pagos:', err));
