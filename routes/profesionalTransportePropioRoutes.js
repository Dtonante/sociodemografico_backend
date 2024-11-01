import express from 'express';
import { crearProfesionalTransportePropio, obtenerProfesionalesTransportePropio, obtenerProfesionalTransportePropioPorId, eliminarProfesionalTransportePropio } from '../controllers/profesionalTransportePropioControllers.js';

const router = express.Router();

router.post('/', crearProfesionalTransportePropio);
router.get('/', obtenerProfesionalesTransportePropio);
router.get('/:id_profesionalFK', obtenerProfesionalTransportePropioPorId);
router.delete('/:id_profesionalFK/:id_transportePropioFK', eliminarProfesionalTransportePropio);

export default router;
