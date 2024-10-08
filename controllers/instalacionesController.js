const pool = require('../config/db'); // Asegúrate de que esta es la ruta correcta de tu archivo de conexión a la base de datos

// Obtener todas las instalaciones
const getInstalaciones = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM instalaciones');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las instalaciones' });
    }
};

// Obtener una instalación por placa
const getInstalacionByPlaca = async (req, res) => {
    const { placa } = req.params;
    try {
        const result = await pool.query('SELECT * FROM instalaciones WHERE placa = $1', [placa]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Instalación no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la instalación' });
    }
};

// Crear una nueva instalación
const createInstalacion = async (req, res) => {
    const { placa, nombre_instalador, buzzer, microfono, apagado, boton_panico } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO instalaciones (placa, nombre_instalador, buzzer, microfono, apagado, boton_panico) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [placa, nombre_instalador, buzzer, microfono, apagado, boton_panico]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la instalación' });
    }
};

// Actualizar una instalación por placa
const updateInstalacion = async (req, res) => {
    const { placa } = req.params;
    const { nombre_instalador, buzzer, microfono, apagado, boton_panico } = req.body;
    try {
        const result = await pool.query(
            'UPDATE instalaciones SET nombre_instalador = $1, buzzer = $2, microfono = $3, apagado = $4, boton_panico = $5 WHERE placa = $6 RETURNING *',
            [nombre_instalador, buzzer, microfono, apagado, boton_panico, placa]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Instalación no encontrada' });
        }
        res.status(200).json({ message: 'Instalación actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la instalación' });
    }
};

// Eliminar una instalación por placa
const deleteInstalacion = async (req, res) => {
    const { placa } = req.params;
    try {
        const result = await pool.query('DELETE FROM instalaciones WHERE placa = $1 RETURNING *', [placa]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Instalación no encontrada' });
        }
        res.status(200).json({ message: 'Instalación eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la instalación' });
    }
};

module.exports = {
    getInstalaciones,
    getInstalacionByPlaca,
    createInstalacion,
    updateInstalacion,
    deleteInstalacion,
};
