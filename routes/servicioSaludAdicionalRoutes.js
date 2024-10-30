import express from 'express';
import { crearServicioSaludAdicional, obtenerServiciosSaludAdicional, obtenerServicioSaludAdicionalPorId, actualizarServicioSaludAdicional, eliminarServicioSaludAdicional } from '../controllers/servicioSaludAdicionalControllers.js';

const router = express.Router();

router.post('/', crearServicioSaludAdicional);
router.get('/', obtenerServiciosSaludAdicional);
router.get('/:id_servicioDeSaludAdicionalPK', obtenerServicioSaludAdicionalPorId);
router.put('/:id_servicioDeSaludAdicionalPK', actualizarServicioSaludAdicional);
router.delete('/:id_servicioDeSaludAdicionalPK', eliminarServicioSaludAdicional);

export default router;
