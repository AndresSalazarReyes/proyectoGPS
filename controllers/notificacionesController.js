const tf = require('@tensorflow/tfjs');

// Datos de ejemplo: días desde el último pago, días hasta el próximo pago
const datosEntrenamiento = [
  [7, 30],   // Pago 7 días tarde, próximo pago en 30 días
  [1, 29],   // Pago a tiempo, próximo pago en 29 días
  [0, 30],   // Pago hoy, próximo pago en 30 días
  [3, 27],   // Pago 3 días tarde, próximo pago en 27 días
];

const etiquetas = [1, 0, 0, 1];  // 1=notificación de pago pendiente, 0=ninguna notificación

// Convertir datos a tensores
const xs = tf.tensor2d(datosEntrenamiento, [4, 2]);
const ys = tf.tensor2d(etiquetas, [4, 1]);

// Crear el modelo
const modelo = tf.sequential();
modelo.add(tf.layers.dense({ units: 1, inputShape: [2] }));
modelo.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

// Entrenar el modelo
async function entrenarModelo() {
    await modelo.fit(xs, ys, { epochs: 100 });
    console.log('Modelo entrenado');
}

// Función para predecir si se necesita enviar una notificación
async function predecirNotificacion(diasTarde, diasHastaProximo) {
    const resultado = modelo.predict(tf.tensor2d([[diasTarde, diasHastaProximo]], [1, 2]));
    const valor = resultado.dataSync();  // Obtiene el valor de predicción
    return valor[0] > 0.5;  // Si la predicción es mayor a 0.5, enviamos notificación
}

// Llama la función de entrenamiento
entrenarModelo();

// Exporta la función para que pueda ser utilizada en otros controladores
module.exports = { predecirNotificacion };
