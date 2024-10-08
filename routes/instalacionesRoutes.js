const express = require('express');
const router = express.Router();
const {
    getInstalaciones,
    getInstalacionByPlaca,
    createInstalacion,
    updateInstalacion,
    deleteInstalacion
} = require('../controllers/instalacionesController');

// Rutas CRUD para instalaciones
router.get('/', getInstalaciones);
router.get('/:placa', getInstalacionByPlaca);
router.post('/', createInstalacion);
router.put('/:placa', updateInstalacion);
router.delete('/:placa', deleteInstalacion);

module.exports = router;
