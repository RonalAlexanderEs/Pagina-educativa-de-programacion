// createTable.js
import { pool } from './db.js';

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL
  );
`;

async function createTable() {
  try {
    await pool.query(createUsersTable);
    console.log('Tabla de usuarios creada o ya existe.');
  } catch (err) {
    console.error('Error al crear la tabla:', err.message);
  } finally {
    await pool.end();
  }
}

createTable();
