// becas.js
import express from 'express';
import { pool } from './db.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Agrega la extensión original del archivo
  }
});

const upload = multer({ storage });

// Ruta para recibir la solicitud de beca
router.post('/beca', upload.fields([{ name: 'cartaSolicitud', maxCount: 1 }, { name: 'comprobante', maxCount: 1 }]), async (req, res) => {
  console.log(req.body); // Muestra los datos del formulario
  console.log(req.files); // Muestra los archivos subidos

  const {
    nombre,
    dni,
    fechaNacimiento,
    email,
    telefono,
    sexo,
    pais,
    departamento,
    distrito,
    direccion,
    codigoPostal,
    referencia,
    codigoEstudiante,
    nivelEducativo,
    areaBeca,
    tipoBeca,
  } = req.body;

  const cartaSolicitud = req.files['cartaSolicitud'] ? req.files['cartaSolicitud'][0].path : null;
  const comprobante = req.files['comprobante'] ? req.files['comprobante'][0].path : null;

  // Validación de campos requeridos
  if (!nombre || !dni || !fechaNacimiento || !email || !telefono || !sexo || !pais || !departamento || !distrito || !direccion || !codigoPostal || !referencia || !codigoEstudiante || !nivelEducativo || !areaBeca || !tipoBeca || !cartaSolicitud || !comprobante) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }

  const sql = `
    INSERT INTO solicitudes_beca 
    (nombre, dni, fecha_nacimiento, email, telefono, sexo, pais, departamento, distrito, direccion, codigo_postal, referencia, codigo_estudiante, nivel_educativo, area_beca, tipo_beca, carta_solicitud, comprobante) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    await pool.query(sql, [
      nombre,
      dni,
      fechaNacimiento,
      email,
      telefono,
      sexo,
      pais,
      departamento,
      distrito,
      direccion,
      codigoPostal,
      referencia,
      codigoEstudiante,
      nivelEducativo,
      areaBeca,
      tipoBeca,
      cartaSolicitud,
      comprobante
    ]);
    res.status(201).json({ message: 'Solicitud de beca recibida con éxito' });
  } catch (error) {
    console.error('Error al enviar solicitud de beca:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
});

// Ruta para obtener las solicitudes de becas
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM solicitudes_beca'); // Ajusta según tu tabla
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las solicitudes de becas:', error);
    res.status(500).json({ message: 'Error al obtener las solicitudes de becas' });
  }
});

// Actualizar estado de la solicitud
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    await pool.query('UPDATE solicitudes_beca SET estado = ? WHERE id = ?', [estado, id]);
    res.status(200).json({ message: 'Estado actualizado' });
  } catch (error) {
    console.error('Error al actualizar la solicitud:', error);
    res.status(500).json({ message: 'Error al actualizar la solicitud' });
  }
});

// Eliminar solicitud
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM solicitudes_beca WHERE id = ?', [id]);
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error al eliminar la solicitud:', error);
    res.status(500).json({ message: 'Error al eliminar la solicitud' });
  }
});

export default router;
