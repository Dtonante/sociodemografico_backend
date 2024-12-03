import express from 'express';
import verifyToken from "../middleware/verifyToken.js";
import { crearEps, obtenerEps, obtenerEpsPorId, actualizarEps, eliminarEps } from '../controllers/epsControllers.js';

const router = express.Router();

router.post('/', verifyToken, crearEps);
router.get('/', obtenerEps);
router.get('/:id_epsPK', obtenerEpsPorId);
router.put('/:id_epsPK', verifyToken, actualizarEps);
router.delete('/:id_epsPK', verifyToken, eliminarEps);

export default router;
