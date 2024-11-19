import express from 'express';
import { crearRol, obtenerRol, obtenerRolPorId, actualizarRol, eliminarRol } from '../controllers/rolesControllers.js';

const router = express.Router();

router.post('/', crearRol);
router.get('/', obtenerRol);
router.get('/:id_rolPK', obtenerRolPorId);
router.put('/:id_rolPK', actualizarRol);
router.delete('/:id_rolPK', eliminarRol);

export default router;