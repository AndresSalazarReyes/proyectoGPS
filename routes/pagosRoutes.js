const express = require('express');
const router = express.Router();
const {
    getPagos,
    getPagoById,
    createPago,
    updatePago,
    deletePago
} = require('../controllers/pagosController');

// Rutas CRUD para pagos
router.get('/', getPagos);
router.get('/:id_pago', getPagoById);
router.post('/', createPago);
router.put('/:id_pago', updatePago);
router.delete('/:id_pago', deletePago);

module.exports = router;
