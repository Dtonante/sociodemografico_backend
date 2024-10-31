import express from 'express';
import { crearProfesionalServicioSaludAdicional, obtenerProfesionalesServiciosSaludAdicionales, obtenerProfesionalServicioSaludAdicionalPorId, eliminarProfesionalServicioSaludAdicional } from '../controllers/profesionalServicioSaludAdicionalControllers.js';

const router = express.Router();

router.post('/', crearProfesionalServicioSaludAdicional);
router.get('/', obtenerProfesionalesServiciosSaludAdicionales);
router.get('/:id_profesionalFK', obtenerProfesionalServicioSaludAdicionalPorId);
router.delete('/:id_profesionalFK/:id_ServicioDeSaludAdicionalFK', eliminarProfesionalServicioSaludAdicional);

export default router;
