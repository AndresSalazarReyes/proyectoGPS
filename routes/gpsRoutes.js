const express = require('express');
const router = express.Router();
const { createGps, getGps, getGpsById, updateGps, deleteGps } = require('../controllers/gpsController');

// Definir rutas
router.post('/', createGps);         // Crear nuevo GPS
router.get('/', getGps);             // Obtener todos los GPS
router.get('/:numerodispositivo', getGpsById);    // Obtener un GPS por IMEI
router.put('/:numerodispositivo', updateGps);     // Actualizar GPS por IMEI
router.delete('/:numerodispositivo', deleteGps);  // Eliminar GPS por IMEI

module.exports = router;
