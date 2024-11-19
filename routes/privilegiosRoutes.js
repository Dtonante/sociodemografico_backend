import express from 'express';
import { crearPrivilegio, obtenerPrivilegios, obtenerPrivilegioPorId, actualizarPrivilegio, eliminarPrivilegio } from '../controllers/privilegiosControllers.js';

const router = express.Router();

router.post('/', crearPrivilegio);
router.get('/', obtenerPrivilegios);
router.get('/:id_privilegioPK', obtenerPrivilegioPorId);
router.put('/:id_privilegioPK', actualizarPrivilegio);
router.delete('/:id_privilegioPK', eliminarPrivilegio);

export default router;