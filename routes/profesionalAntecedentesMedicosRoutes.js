import express from 'express';
import { crearProfesionalAntecedenteMedico, obtenerProfesionalesAntecedentesMedicos, obtenerProfesionalAntecedenteMedicoPorId, eliminarProfesionalAntecedenteMedico } from '../controllers/profesionalAntecedentesMedicosControllers.js';

const router = express.Router();

router.post('/', crearProfesionalAntecedenteMedico);
router.get('/', obtenerProfesionalesAntecedentesMedicos);
router.get('/:id_profesionalFK', obtenerProfesionalAntecedenteMedicoPorId);
router.delete('/:id_profesionalFK/:id_antecedenteMedicoFK', eliminarProfesionalAntecedenteMedico);

export default router;
