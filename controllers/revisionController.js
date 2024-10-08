const pool = require('../config/db');

// Obtener todas las revisiones
const getRevisiones = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM revision');
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las revisiones' });
    }
};

// Obtener revisiones por placa
const getRevisionesByPlaca = async (req, res) => {
    const { placa } = req.params;
    try {
        const result = await pool.query('SELECT * FROM revision WHERE placa = $1', [placa]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron revisiones para esta placa' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las revisiones' });
    }
};

// Crear una nueva revisión
const createRevision = async (req, res) => {
    const { imei_gps, placa, fecha_instalacion, observaciones, fecha_revision } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO revision (imei_gps, placa, fecha_instalacion, observaciones, fecha_revision) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [imei_gps, placa, fecha_instalacion, observaciones, fecha_revision]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la revisión' });
    }
};

// Actualizar una revisión por placa
const updateRevisionByPlaca = async (req, res) => {
    const { placa } = req.params;
    const { imei_gps, fecha_instalacion, observaciones, fecha_revision } = req.body;
    try {
        const result = await pool.query(
            'UPDATE revision SET imei_gps = $1, fecha_instalacion = $2, observaciones = $3, fecha_revision = $4 WHERE placa = $5 RETURNING *',
            [imei_gps, fecha_instalacion, observaciones, fecha_revision, placa]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Revisión no encontrada para esta placa' });
        }
        res.status(200).json({ message: 'Revisión actualizada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar la revisión' });
    }
};

// Eliminar una revisión por placa
const deleteRevisionByPlaca = async (req, res) => {
    const { placa } = req.params;
    try {
        const result = await pool.query('DELETE FROM revision WHERE placa = $1 RETURNING *', [placa]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Revisión no encontrada para esta placa' });
        }
        res.status(200).json({ message: 'Revisión eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la revisión' });
    }
};

module.exports = {
    getRevisiones,
    getRevisionesByPlaca,
    createRevision,
    updateRevisionByPlaca,
    deleteRevisionByPlaca,
};
