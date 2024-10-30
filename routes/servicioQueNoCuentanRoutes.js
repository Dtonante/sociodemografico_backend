import express from 'express';
import { crearServicioQueNoCuenta, obtenerServiciosQueNoCuentan, obtenerServicioQueNoCuentaPorId, actualizarServicioQueNoCuenta, eliminarServicioQueNoCuenta } from '../controllers/serviciosQueNoCuentanControllers.js';

const router = express.Router();

router.post('/', crearServicioQueNoCuenta);
router.get('/', obtenerServiciosQueNoCuentan);
router.get('/:id_servicioQueNoCuentaPK', obtenerServicioQueNoCuentaPorId);
router.put('/:id_servicioQueNoCuentaPK', actualizarServicioQueNoCuenta);
router.delete('/:id_servicioQueNoCuentaPK', eliminarServicioQueNoCuenta);

export default router;
