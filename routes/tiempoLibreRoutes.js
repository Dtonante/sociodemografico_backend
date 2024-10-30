import express from 'express';
import { crearTiempoLibre, obtenerTiempoLibre, obtenerTiempoLibrePorId, actualizarTiempoLibre, eliminarTiempoLibre } from '../controllers/tiempoLibreControllers.js';

const router = express.Router();

router.post('/', crearTiempoLibre);
router.get('/', obtenerTiempoLibre);
router.get('/:id_tiempoLibrePK', obtenerTiempoLibrePorId);
router.put('/:id_tiempoLibrePK', actualizarTiempoLibre);
router.delete('/:id_tiempoLibrePK', eliminarTiempoLibre);

export default router;
