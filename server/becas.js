import express from 'express';

const router = express.Router();

// Ejemplo de ruta para obtener becas
router.post('/beca', async (req, res) => {
  try {
    // Aquí puedes procesar los datos de la beca (ejemplo)
    const { nombre, dni, fechaNacimiento, ...rest } = req.body;
    // Lógica para almacenar la solicitud en la base de datos
    res.status(201).json({ message: 'Solicitud recibida con éxito' });
  } catch (error) {
    console.error('Error al enviar solicitud de beca:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
});

// Exporta el router
export default router;
