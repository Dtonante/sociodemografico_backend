import express from 'express';
import { upload, subirCertificado, obtenerCertificadoPorId, obtenerCertificados, descargarCertificado } from '../controllers/certificadoControllers.js';

const router = express.Router();

// Ruta para subir un certificado
router.post('/subir', upload.single('certificado'), subirCertificado);

// Ruta para obtener todos los certificados
router.get('/certificados', obtenerCertificados);

// Ruta para obtener un certificado por ID
router.get('/certificados/:id', obtenerCertificadoPorId);

// Ruta para descargar un certificado
router.get('/certificados/:id/descargar', descargarCertificado);

export default router;

