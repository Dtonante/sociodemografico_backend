import express from 'express';
import { crearFactorRiesgo, obtenerFactoresRiesgo, obtenerFactorRiesgoPorId, actualizarFactorRiesgo, eliminarFactorRiesgo } from '../controllers/factoresDeRiesgoControllers.js';

const router = express.Router();

router.post('/', crearFactorRiesgo);
router.get('/', obtenerFactoresRiesgo);
router.get('/:id_factoresRiesgoPK', obtenerFactorRiesgoPorId);
router.put('/:id_factoresRiesgoPK', actualizarFactorRiesgo);
router.delete('/:id_factoresRiesgoPK', eliminarFactorRiesgo);

export default router;
