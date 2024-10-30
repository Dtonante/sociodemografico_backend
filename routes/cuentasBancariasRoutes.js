import express from 'express';
import { crearBanco, obtenerBanco, obtenerBancoPorId, actualizarBanco, eliminarBanco } from '../controllers/cuentasBancariasControllers.js';

const router = express.Router();

router.post('/', crearBanco);
router.get('/', obtenerBanco);
router.get('/:id_cuentaBancariaPK', obtenerBancoPorId);
router.put('/:id_cuentaBancariaPK', actualizarBanco);
router.delete('/:id_cuentaBancariaPK', eliminarBanco);

export default router;
