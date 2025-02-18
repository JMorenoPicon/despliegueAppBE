import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5000;

// Conectar a MongoDB (con tu URI de Mongo Atlas)
mongoose.connect('mongodb+srv://standardUser:admin@f1cluster.e2owb.mongodb.net/f1db?retryWrites=true&w=majority&appName=f1Cluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.log("Error al conectar a MongoDB", err));

app.use(cors());
app.use(express.json());

// Importar rutas de pilotos
import driverRoutes from './routes/drivers.js';
app.use('/api/drivers', driverRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
