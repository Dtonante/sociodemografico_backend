import TipoDocumentoModel from "../models/tipoDocumentoModel.js";

// Crear un nuevo tipo de documento
export const crearTipoDocumento = async (req, res) => {
    try {
        const nuevoTipoDocumento = await TipoDocumentoModel.create(req.body);
        res.status(201).json(nuevoTipoDocumento);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el tipo de documento', error });
    }
};

// Obtener todos los tipos de documentos
export const obtenerTiposDocumentos = async (req, res) => {
    try {
        const tiposDocumentos = await TipoDocumentoModel.findAll();
        res.status(200).json(tiposDocumentos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipos de documentos', error });
    }
};

// Obtener un tipo de documento por su ID
export const obtenerTipoDocumentoPorId = async (req, res) => {
    try {
        const tipoDocumento = await TipoDocumentoModel.findByPk(req.params.id_tipoDocumentoPK);
        if (tipoDocumento) {
            res.status(200).json(tipoDocumento);
        } else {
            res.status(404).json({ message: 'Tipo de documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el tipo de documento', error });
    }
};

// Actualizar un tipo de documento por su ID
export const actualizarTipoDocumento = async (req, res) => {
    try {
        const tipoDocumento = await TipoDocumentoModel.findByPk(req.params.id_tipoDocumentoPK);
        if (tipoDocumento) {
            await tipoDocumento.update(req.body);
            res.status(200).json(tipoDocumento);
        } else {
            res.status(404).json({ message: 'Tipo de documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el tipo de documento', error });
    }
};

// Eliminar un tipo de documento por su ID
export const eliminarTipoDocumento = async (req, res) => {
    try {
        const tipoDocumento = await TipoDocumentoModel.findByPk(req.params.id_tipoDocumentoPK);
        if (tipoDocumento) {
            await tipoDocumento.destroy();
            res.status(204).json({ message: 'Tipo de documento eliminado' });
        } else {
            res.status(404).json({ message: 'Tipo de documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tipo de documento', error });
    }
};
