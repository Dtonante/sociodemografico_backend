import express from 'express';
import { crearTransportePropio, obtenerTransportesPropios, obtenerTransportePropioPorId, actualizarTransportePropio, eliminarTransportePropio } from '../controllers/transportePropioRoutes.js';

const router = express.Router();

router.post('/', crearTransportePropio);
router.get('/', obtenerTransportesPropios);
router.get('/:id_transportePropioPK', obtenerTransportePropioPorId);
router.put('/:id_transportePropioPK', actualizarTransportePropio);
router.delete('/:id_transportePropioPK', eliminarTransportePropio);

export default router;
