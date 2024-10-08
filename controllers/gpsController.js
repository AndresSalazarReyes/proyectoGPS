const pool = require('../config/db');

// CREATE
const createGps = async (req, res) => {
  const { imei, modelo_gps, numero_dispositivo } = req.body;
  try {
    const newGps = await pool.query(
      'INSERT INTO gps (imei, modelo_gps, numero_dispositivo) VALUES ($1, $2, $3) RETURNING *',
      [imei, modelo_gps, numero_dispositivo]
    );
    res.json(newGps.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al crear GPS" });
  }
};

// READ ALL
const getGps = async (req, res) => {
  try {
    const allGps = await pool.query('SELECT * FROM gps');
    res.json(allGps.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener GPS" });
  }
};

// READ ONE
const getGpsById = async (req, res) => {
  const { imei } = req.params;
  try {
    const gps = await pool.query('SELECT * FROM gps WHERE imei = $1', [imei]);
    res.json(gps.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al obtener GPS por IMEI" });
  }
};

// UPDATE
const updateGps = async (req, res) => {
  const { imei } = req.params;
  const { modelo_gps, numero_dispositivo } = req.body;
  try {
    await pool.query(
      'UPDATE gps SET modelo_gps = $1, numero_dispositivo = $2 WHERE imei = $3',
      [modelo_gps, numero_dispositivo, imei]
    );
    res.json('GPS actualizado');
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al actualizar GPS" });
  }
};

// DELETE
const deleteGps = async (req, res) => {
  const { numerodispositivo } = req.params;
  try {
    await pool.query('DELETE FROM gps WHERE numero_dispositivo = $1', [numerodispositivo]);
    res.json('GPS eliminado');
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al eliminar GPS" });
  }
};

module.exports = {
  createGps,
  getGps,
  getGpsById,
  updateGps,
  deleteGps,
};
