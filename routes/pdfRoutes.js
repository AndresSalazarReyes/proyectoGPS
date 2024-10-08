const express = require('express');
const router = express.Router();
const { generatePDF } = require('../controllers/pdfController');

router.post('/generate-pdf', generatePDF); // Ruta para generar PDF

module.exports = router;
