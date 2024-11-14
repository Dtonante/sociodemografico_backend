import express from 'express';
import { loginUser } from '../controllers/loginControllers.js';

const router = express.Router();

// Ruta de inicio de sesión
router.post('/', loginUser);

export default router;
