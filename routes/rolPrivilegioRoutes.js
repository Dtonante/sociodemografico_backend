import express from 'express';
import { crearRolPrivilegio, obtenerRolPrivilegio, obtenerPrivilegiosForId, eliminarRolPrivilegio } from '../controllers/rolesPrivilegiosControllers.js';

const router = express.Router();

router.post('/', crearRolPrivilegio);
router.get('/', obtenerRolPrivilegio);
router.get('/:id_rolFK', obtenerPrivilegiosForId);
router.delete('/:id_rolFK', eliminarRolPrivilegio);

export default router