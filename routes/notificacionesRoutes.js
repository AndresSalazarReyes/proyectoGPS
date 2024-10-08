const express = require('express');
const router = express.Router();
const { obtenerPagos } = require('../controllers/pagosController');

// Ruta para verificar si se necesita notificación para un vehículo
router.get('/notificacion/:placa', obtenerPagos);

module.exports = router;
