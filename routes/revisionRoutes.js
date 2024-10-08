const express = require('express');
const router = express.Router();
const {
    getRevisiones,
    getRevisionesByPlaca,
    createRevision,
    updateRevisionByPlaca,
    deleteRevisionByPlaca
} = require('../controllers/revisionController');

// Rutas CRUD para revisiones basadas en placa
router.get('/', getRevisiones);
router.get('/:placa', getRevisionesByPlaca);
router.post('/', createRevision);
router.put('/:placa', updateRevisionByPlaca);
router.delete('/:placa', deleteRevisionByPlaca);

module.exports = router;
