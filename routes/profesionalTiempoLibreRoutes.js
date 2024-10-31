import express from 'express';
import { crearProfesionalTiempoLibre, obtenerProfesionalesTiemposLibre, obtenerProfesionalTiempoLibrePorId, eliminarProfesionalTiempoLibreHogar } from '../controllers/profesionalTiempoLibreControllers.js';

const router = express.Router();

router.post('/', crearProfesionalTiempoLibre);
router.get('/', obtenerProfesionalesTiemposLibre);
router.get('/:id_profesionalFK', obtenerProfesionalTiempoLibrePorId);
router.delete('/:id_profesionalFK/:id_tiempoLibreFK', eliminarProfesionalTiempoLibreHogar);

export default router;
