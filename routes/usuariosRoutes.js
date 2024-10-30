import express from 'express';
import { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } from '../controllers/usuariosControllers.js';

const router = express.Router();

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/:id_usuarioPK', obtenerUsuarioPorId);
router.put('/:id_usuarioPK', actualizarUsuario);
router.delete('/:id_usuarioPK', eliminarUsuario);

export default router;
