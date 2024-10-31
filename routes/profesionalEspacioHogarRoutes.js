import express from 'express';
import { crearProfesionalEspacioHogar, obtenerProfesionalesEspaciosHogar, obtenerProfesionalEspacioHogarPorId, eliminarProfesionalEspacioHogar } from '../controllers/profesionalEspacioHogarControllers.js';

const router = express.Router();

router.post('/', crearProfesionalEspacioHogar);
router.get('/', obtenerProfesionalesEspaciosHogar);
router.get('/:id_profesionalFK', obtenerProfesionalEspacioHogarPorId);
router.delete('/:id_profesionalFK/:id_espacioHogarFK', eliminarProfesionalEspacioHogar);

export default router;
