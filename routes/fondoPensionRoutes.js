import express from 'express';
import { crearFondoPension, obtenerFondoPension, obtenerFondoPensionPorId, actualizarFondoPension, eliminarFondoPension } from '../controllers/fondoPensionControllers.js';

const router = express.Router();

router.post('/', crearFondoPension);
router.get('/', obtenerFondoPension);
router.get('/:id_fondoPensionPK', obtenerFondoPensionPorId);
router.put('/:id_fondoPensionPK', actualizarFondoPension);
router.delete('/:id_fondoPensionPK', eliminarFondoPension);

export default router;
