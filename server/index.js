// index.js
import express from 'express';
import { pool } from './db.js'; // Asegúrate de que esta ruta sea correcta
import path from 'path'; // Para servir archivos estáticos
import dotenv from 'dotenv'; // Para cargar las variables de entorno
import cors from 'cors'; // Para manejar CORS
import becasRouter from './becas.js'; // Importa el router de becas

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permitir CORS para todas las rutas
app.use(express.static(path.join(process.cwd(), 'upload'))); // Servir archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a la base de datos
const db = pool; // Utiliza el pool de conexiones que has creado

// Ruta para manejar el login
app.post('/login', async (req, res) => {
  const { nombre, apellidos, correo, fecha_nacimiento } = req.body;
  const query = 'INSERT INTO usuarios (nombre, apellidos, correo, fecha_nacimiento) VALUES (?, ?, ?, ?)';
  
  try {
    const [result] = await db.query(query, [nombre, apellidos, correo, fecha_nacimiento]);
    res.status(201).json({ message: 'Usuario registrado correctamente', id: result.insertId });
  } catch (err) {
    console.error('Error ejecutando la consulta:', err);
    return res.status(500).send('Error en el servidor');
  }
});

// Usar el router de becas
app.use('/api/becas', becasRouter); // Usar el router de becas

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

// Escuchar en el puerto definido
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
