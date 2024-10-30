import express from 'express';
import { crearEspacio, obtenerEspacios, obtenerEspacioPorId, actualizarEspacio, eliminarEspacio } from '../controllers/espaciosHogarControllers.js';

const router = express.Router();

router.post('/', crearEspacio);
router.get('/', obtenerEspacios);
router.get('/:id_espacioHogarPK', obtenerEspacioPorId);
router.put('/:id_espacioHogarPK', actualizarEspacio);
router.delete('/:id_espacioHogarPK', eliminarEspacio);

export default router;
