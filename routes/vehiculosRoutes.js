const express = require('express');
const router = express.Router();
const {
    getVehiculos,
    getVehiculoByPlaca,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo
} = require('../controllers/vehiculosController');

// Rutas CRUD para vehiculos
router.get('/', getVehiculos);
router.get('/:placa', getVehiculoByPlaca);
router.post('/', createVehiculo);
router.put('/:placa', updateVehiculo);
router.delete('/:placa', deleteVehiculo);

module.exports = router;
