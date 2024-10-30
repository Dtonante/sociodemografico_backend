import express from 'express';
import { crearEstructuraOrganizacional, obtenerEstructuraOrganizacional, obtenerEstructuraOrganizacionalPorId, actualizarEstructuraOrganizacional, eliminarEstructuraOrganizacional } from '../controllers/estructuraOrganizacionalControllers.js';

const router = express.Router();

router.post('/', crearEstructuraOrganizacional);
router.get('/', obtenerEstructuraOrganizacional);
router.get('/:id_areaPk', obtenerEstructuraOrganizacionalPorId);
router.put('/:id_areaPk', actualizarEstructuraOrganizacional);
router.delete('/:id_areaPk', eliminarEstructuraOrganizacional);

export default router;
