const pool = require('../config/db');

// Obtener todos los pagos
const getPagos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pagos');
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los pagos' });
    }
};

// Obtener un pago por ID
const getPagoById = async (req, res) => {
    const { id_pago } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pagos WHERE id_pago = $1', [id_pago]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el pago' });
    }
};

// Crear un nuevo pago
const createPago = async (req, res) => {
    const { id_servicio, nombre_cliente, placa, fecha_pago, valor_pagado, proximo_pago } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO pagos (id_servicio, nombre_cliente, placa, fecha_pago, valor_pagado, proximo_pago) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [id_servicio, nombre_cliente, placa, fecha_pago, valor_pagado, proximo_pago]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el pago' });
    }
};

// Actualizar un pago por ID
const updatePago = async (req, res) => {
    const { id_pago } = req.params;
    const { id_servicio, nombre_cliente, placa, fecha_pago, valor_pagado, proximo_pago } = req.body;
    try {
        const result = await pool.query(
            'UPDATE pagos SET id_servicio = $1, nombre_cliente = $2, placa = $3, fecha_pago = $4, valor_pagado = $5, proximo_pago = $6 WHERE id_pago = $7 RETURNING *',
            [id_servicio, nombre_cliente, placa, fecha_pago, valor_pagado, proximo_pago, id_pago]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.status(200).json({ message: 'Pago actualizado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el pago' });
    }
};

// Eliminar un pago por ID
const deletePago = async (req, res) => {
    const { id_pago } = req.params;
    try {
        const result = await pool.query('DELETE FROM pagos WHERE id_pago = $1 RETURNING *', [id_pago]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        res.status(200).json({ message: 'Pago eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el pago' });
    }
};

module.exports = {
    getPagos,
    getPagoById,
    createPago,
    updatePago,
    deletePago,
};
