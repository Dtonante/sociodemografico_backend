import express from 'express';
import { crearEps, obtenerEps, obtenerEpsPorId, actualizarEps, eliminarEps } from '../controllers/epsControllers.js';

const router = express.Router();

router.post('/', crearEps);
router.get('/', obtenerEps);
router.get('/:id_epsPK', obtenerEpsPorId);
router.put('/:id_epsPK', actualizarEps);
router.delete('/:id_epsPK', eliminarEps);

export default router;
