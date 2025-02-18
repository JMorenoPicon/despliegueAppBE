import express from 'express';
import Driver from '../models/driver.js';

const router = express.Router();

// Obtener todos los pilotos
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json({ success: true, data: drivers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Crear un nuevo piloto
router.post('/', async (req, res) => {
  const { name, team, nationality, points } = req.body;

  const newDriver = new Driver({ name, team, nationality, points });

  try {
    const savedDriver = await newDriver.save();
    res.status(201).json({ success: true, data: savedDriver });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

//Creacion masiva de pilotos
router.post('/bulk', async (req, res) => {
  const drivers = req.body;

  try {
    const savedDrivers = await Driver.insertMany(drivers);
    res.status(201).json({ success: true, data: savedDrivers });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Eliminar un piloto por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);
    if (!deletedDriver) {
      return res.status(404).json({ success: false, message: 'Piloto no encontrado' });
    }
    res.json({ success: true, message: 'Piloto eliminado' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
