const { Pool } = require('pg');

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'baseDeDatosGps',
  password: '', // Asegúrate de tener la contraseña correcta aquí
  port: 5432,
  searchPath: ['public'], // Si necesitas un searchPath específico
});

// Verificación de la conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar a la base de datos', err.stack);
  } else {
    console.log('Conectado a la base de datos PostgreSQL');
    release(); // Solo liberar el cliente si no hay error
  }
});

module.exports = pool;
