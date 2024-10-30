import express from 'express';
import bodyParser from 'body-parser';
import { pool } from './db.js';
import { PORT } from './config.js';
import bcrypt from 'bcrypt'; // Importa bcrypt para hashear contraseñas
import path from 'path'; // Importar el módulo path
import becasRoutes from './becas.js'; // Asegúrate de que esta línea sea correcta
import multer from 'multer'; // Asegúrate de tener multer para manejar archivos

const app = express();
const upload = multer({ dest: 'upload/' }); // Configura multer para almacenar archivos en la carpeta 'upload'

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd()))); // Sirve archivos estáticos desde la raíz del proyecto
app.use('/api', becasRoutes); // Usa el router de becas
app.use('/api/becas', becasRoutes);

// Ruta para servir el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html')); // Asegúrate de que el archivo esté en la raíz del proyecto
});

// Ruta para manejar las solicitudes de becas
app.post('/api/beca', upload.fields([{ name: 'cartaSolicitud' }, { name: 'comprobante' }]), async (req, res) => {
    const { cartaSolicitud, comprobante } = req.files; // Archivos subidos

    if (!cartaSolicitud || !comprobante) {
        return res.status(400).json({ message: 'Archivos no recibidos.' });
    }

    // Aquí puedes procesar la solicitud de beca y guardar la información en la base de datos.
    try {
        // Por ejemplo, guarda los datos en la base de datos:
        // const result = await pool.query('INSERT INTO becas (...) VALUES (...)', [datos]);

        res.status(200).json({ message: 'Solicitud de beca recibida exitosamente.' });
    } catch (error) {
        console.error('Error al procesar la solicitud de beca:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud de beca', details: error.message });
    }
});

// Ruta para obtener todos los alumnos con el rol de "usuario"
app.get('/api/alumnos', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT nombre, apellidos, correo, fecha_nacimiento FROM usuarios WHERE rol = 'usuario'");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los alumnos:", error);
    res.status(500).json({ message: 'Error al obtener los alumnos' });
  }
});

// Ruta para obtener todos los usuarios con rol de "admin" (profesores)
app.get('/api/profesores', async (req, res) => {
  try {
    const [profesores] = await pool.query("SELECT nombre, correo FROM usuarios WHERE rol = 'admin'");
    res.json(profesores);
  } catch (error) {
    console.error('Error al obtener los profesores:', error);
    res.status(500).json({ message: 'Error al obtener los profesores' });
  }
});

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Ruta para un ping simple
app.get('/ping', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT "hello world" as RESULT');
    res.json(result[0]);
  } catch (error) {
    console.error('Error en /ping:', error);
    res.status(500).json({ error: 'Error en /ping' });
  }
});

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
  const { nombre, apellidos, correo, password, fecha_nacimiento } = req.body;

  try {
    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, apellidos, correo, password, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellidos, correo, hashedPassword, fecha_nacimiento]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario', details: error.message });
  }
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE correo = ?';

  try {
    const [rows] = await pool.query(query, [email]);

    if (rows.length > 0) {
      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password); // Verificar contraseña hasheada
      if (isMatch) {
        if (user.rol === 'admin') {
          res.status(200).json({ message: 'Inicio de sesión exitoso', user, redirect: 'index_admin.html' });
        } else {
          res.status(200).json({ message: 'Inicio de sesión exitoso', user, redirect: 'index.html' });
        }
      } else {
        res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Función para cargar alumnos (si es necesario en el frontend, se puede llamar desde allí)
async function cargarAlumnos() {
  try {
    const response = await fetch('/api/alumnos');
    const alumnos = await response.json();

    const tablaAlumnos = document.getElementById('tabla-alumnos'); // Asegúrate de que este elemento exista en tu HTML

    alumnos.forEach(alumno => {
      const row = tablaAlumnos.insertRow(); // Crea una nueva fila en la tabla
      row.insertCell(0).innerText = alumno.nombre; // Agrega el nombre
      row.insertCell(1).innerText = alumno.apellidos; // Agrega los apellidos
      row.insertCell(2).innerText = alumno.correo; // Agrega el correo
      // Puedes agregar más celdas según necesites
    });
  } catch (error) {
    console.error('Error al cargar alumnos:', error);
  }
}

// Función para agregar el administrador si no existe
async function addAdmin() {
  const adminEmail = 'guimar@admin3.com';
  const adminPassword = '12345';
  const adminNombre = 'Guimar';
  const adminApellidos = 'Admin';

  try {
    // Verificar si el administrador ya existe
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [adminEmail]);

    if (rows.length === 0) { // Si no existe, crear el nuevo admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await pool.query(
        'INSERT INTO usuarios (nombre, apellidos, correo, password, rol) VALUES (?, ?, ?, ?, ?)',
        [adminNombre, adminApellidos, adminEmail, hashedPassword, 'admin']
      );
      console.log('Administrador creado exitosamente.');
    } else {
      console.log('El administrador ya existe.');
    }
  } catch (error) {
    console.error('Error al crear el administrador:', error);
  }
}
// Ruta para obtener los detalles de una solicitud de beca por ID
app.get('/api/beca/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`ID de solicitud recibido: ${id}`); // Agregar log para verificar el ID

  try {
      const [solicitud] = await pool.query('SELECT * FROM solicitudes_beca WHERE id = ?', [id]);
      console.log(`Solicitud encontrada: ${JSON.stringify(solicitud)}`); // Ver detalles de la solicitud

      if (!solicitud) {
          return res.status(404).json({ message: 'Solicitud no encontrada.' });
      }

      res.json(solicitud); // Envía la solicitud como JSON
  } catch (error) {
      console.error('Error al obtener la solicitud de beca:', error);
      res.status(500).json({ message: 'Error al obtener la solicitud de beca', details: error.message });
  }
});


// Llama a la función al iniciar el servidor
addAdmin();

// Inicializa el servidor
app.listen(PORT, () => {
  console.log('Server on port', PORT);
});
