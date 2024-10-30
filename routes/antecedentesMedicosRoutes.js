import express from 'express';
import { crearAntecedente, obtenerAntecedentes, obtenerAntecedentePorId, actualizarAntecedente, eliminarAntecedente } from '../controllers/antecedentesMedicosControllers.js';

const router = express.Router();

router.post('/', crearAntecedente);
router.get('/', obtenerAntecedentes);
router.get('/:id_antecedenteMedicoPK', obtenerAntecedentePorId);
router.put('/:id_antecedenteMedicoPK', actualizarAntecedente);
router.delete('/:id_antecedenteMedicoPK', eliminarAntecedente);

export default router;
