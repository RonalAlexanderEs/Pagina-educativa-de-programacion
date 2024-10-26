import express from 'express';
import { pool } from './db.js'; // Asegúrate de que esta ruta sea correcta
import { PORT } from './config.js';

const app = express();
app.use(express.json()); // Middleware para manejar JSON en las solicitudes

// Ruta para agregar un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombre, apellidos, correo, fecha_nacimiento } = req.body;
  const query = 'INSERT INTO usuarios (nombre, apellidos, correo, fecha_nacimiento) VALUES (?, ?, ?, ?)';

  try {
    const [result] = await pool.query(query, [nombre, apellidos, correo, fecha_nacimiento]);
    res.status(201).json({ message: 'Usuario agregado correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).json({ error: 'Error al agregar usuario' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
