import express from 'express';
import session from 'express-session';
import { pool } from './db.js'; // Asegúrate de que esta ruta sea correcta
import { PORT } from './config.js';
import dotenv from 'dotenv';

// Configurar dotenv
dotenv.config();

const app = express();
app.use(express.json()); // Middleware para manejar JSON en las solicitudes

// Configurar la sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'tu_secreto', // Cambia 'tu_secreto' por algo más seguro
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Cambia a true si usas HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}));

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

// Ruta para obtener la información del usuario
app.get('/api/usuario', async (req, res) => {
  const userId = req.session.userId; // Asegúrate de manejar sesiones correctamente

  if (!userId) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const query = 'SELECT nombre, apellidos, correo, fecha_nacimiento FROM usuarios WHERE id = ?';

  try {
    const [results] = await pool.query(query, [userId]);

    if (results.length > 0) {
      res.json(results[0]); // Devuelve el primer resultado
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});
// Ejemplo en Express
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Aquí va la lógica de autenticación
      const user = await autenticarUsuario(email, password);
      
      if (!user) {
          return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      // Si el usuario es autenticado, envía la información del usuario
      res.json({ user, redirect: 'perfil-usuario.html' });
  } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
