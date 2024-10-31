import express from 'express';
import { crearProfesionalFactorRiesgo, obtenerProfesionalesFactoresRiesgo, obtenerProfesionalFactorRiesgoPorId, eliminarProfesionalFactorRiesgo } from '../controllers/profesionalFactoresDeRiesgoControllers.js';

const router = express.Router();

router.post('/', crearProfesionalFactorRiesgo);
router.get('/', obtenerProfesionalesFactoresRiesgo);
router.get('/:id_profesionalFK', obtenerProfesionalFactorRiesgoPorId);
router.delete('/:id_profesionalFK/:id_factoresRiesgoFK', eliminarProfesionalFactorRiesgo);

export default router;
