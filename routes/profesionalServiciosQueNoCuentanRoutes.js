import express from 'express';
import { crearProfesionalServicioQueNoCuentan, obtenerProfesionalesServiciosQueNoCuentan, obtenerProfesionalServicioQueNoCuentanPorId, eliminarProfesionalServicioQueNoCuentan } from '../controllers/profesionalServiciosQueNoCuentanControllers.js';

const router = express.Router();

router.post('/', crearProfesionalServicioQueNoCuentan);
router.get('/', obtenerProfesionalesServiciosQueNoCuentan);
router.get('/:id_profesionalFK', obtenerProfesionalServicioQueNoCuentanPorId);
router.delete('/:id_profesionalFK/:id_servicioQueNoCuentaFK', eliminarProfesionalServicioQueNoCuentan);

export default router;
