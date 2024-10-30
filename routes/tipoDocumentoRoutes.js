import express from 'express';
import { crearTipoDocumento, obtenerTiposDocumentos, obtenerTipoDocumentoPorId, actualizarTipoDocumento, eliminarTipoDocumento } from '../controllers/tipoDocumentoControllers.js';

const router = express.Router();

router.post('/', crearTipoDocumento);
router.get('/', obtenerTiposDocumentos);
router.get('/:id_tipoDocumentoPK', obtenerTipoDocumentoPorId);
router.put('/:id_tipoDocumentoPK', actualizarTipoDocumento);
router.delete('/:id_tipoDocumentoPK', eliminarTipoDocumento);

export default router;
