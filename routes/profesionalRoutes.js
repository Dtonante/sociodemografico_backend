import express from 'express';
import { crearProfesional, obtenerProfesionales, obtenerProfesionalPorId, actualizarProfesional, eliminarProfesional } from '../controllers/profesionalControllers.js';

const router = express.Router();

router.post('/', crearProfesional);
router.get('/', obtenerProfesionales);
router.get('/:id_profesionalPK', obtenerProfesionalPorId);
router.put('/:id_profesionalPK', actualizarProfesional);
router.delete('/:id_profesionalPK', eliminarProfesional);

export default router
