const pool = require('../config/db');

// Obtener todos los vehículos
const getVehiculos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM vehiculos');
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los vehículos' });
    }
};

// Obtener un vehículo por placa
const getVehiculoByPlaca = async (req, res) => {
    const { placa } = req.params;
    try {
        const result = await pool.query('SELECT * FROM vehiculos WHERE placa = $1', [placa]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el vehículo' });
    }
};

// Crear un nuevo vehículo
const createVehiculo = async (req, res) => {
    const { placa, modelo, marca, tipo_vehiculo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO vehiculos (placa, modelo, marca, tipo_vehiculo) VALUES ($1, $2, $3, $4) RETURNING *',
            [placa, modelo, marca, tipo_vehiculo]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el vehículo' });
    }
};

// Actualizar un vehículo por placa
const updateVehiculo = async (req, res) => {
    const { placa } = req.params;
    const { modelo, marca, tipo_vehiculo } = req.body;
    try {
        const result = await pool.query(
            'UPDATE vehiculos SET modelo = $1, marca = $2, tipo_vehiculo = $3 WHERE placa = $4 RETURNING *',
            [modelo, marca, tipo_vehiculo, placa]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.status(200).json({ message: 'Vehículo actualizado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el vehículo' });
    }
};

// Eliminar un vehículo por placa
const deleteVehiculo = async (req, res) => {
    const { placa } = req.params;
    try {
        const result = await pool.query('DELETE FROM vehiculos WHERE placa = $1 RETURNING *', [placa]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.status(200).json({ message: 'Vehículo eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el vehículo' });
    }
};

module.exports = {
    getVehiculos,
    getVehiculoByPlaca,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
};
