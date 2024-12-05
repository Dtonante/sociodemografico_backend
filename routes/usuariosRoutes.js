import express from 'express';
import { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario, obtenerUsuarioPorCorreo } from '../controllers/usuariosControllers.js';

const router = express.Router();

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/:id_usuarioPK', obtenerUsuarioPorId);
router.put('/:id_usuarioPK', actualizarUsuario);
router.delete('/:id_usuarioPK', eliminarUsuario);
router.get("/buscar/:correo", obtenerUsuarioPorCorreo);

export default router;
