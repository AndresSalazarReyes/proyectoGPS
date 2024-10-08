const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const activosRoutes = require('./routes/activosRoutes');
const suspendidosRoutes = require('./routes/suspendidosRoutes');
const pagosRoutes = require('./routes/pagosRoutes'); // Solo una vez
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const pdfRoutes = require('./routes/pdfRoutes');
const pool = require('./config/db');

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();
const vehiculosRoutes = require('./routes/vehiculosRoutes');
const gpsRoutes = require('./routes/gpsRoutes');
const instalacionesRoutes = require('./routes/instalacionesRoutes');
const revisionRoutes = require('./routes/revisionRoutes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/activos', activosRoutes);
app.use('/suspendidos', suspendidosRoutes);
app.use('/pagos', pagosRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vehiculos', vehiculosRoutes);
app.use('/gps', gpsRoutes);
app.use('/instalaciones', instalacionesRoutes);
app.use('/revision', revisionRoutes);
app.use('/pdf', pdfRoutes);
app.use('/api', pagosRoutes);


app.use((err, req, res, next) => {
    console.error('Error en la aplicación:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
