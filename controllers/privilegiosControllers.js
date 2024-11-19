import PrivilegioModel from "../models/privilegiosModel.js";

// Crear una nueva privilegio
export const crearPrivilegio = async (req, res) => {
    try {
        const nuevaPrivilegio = await PrivilegioModel.create(req.body);
        res.status(201).json(nuevaPrivilegio);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la Privilegio', error });
    }
};

// Obtener todas las Privilegio
export const obtenerPrivilegios = async (req, res) => {
    try {
        const diferentesPrivilegios = await PrivilegioModel.findAll();
        res.status(200).json(diferentesPrivilegios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las Privilegio', error });
    }
};

// Obtener una Privilegio por su ID
export const obtenerPrivilegioPorId = async (req, res) => {
    try {
        const privilegio = await PrivilegioModel.findByPk(req.params.id_privilegioPK);
        if (privilegio) {
            res.status(200).json(privilegio);
        } else {
            res.status(404).json({ message: 'privilegio no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la privilegio', error });
    }
};

// Actualizar una Privilegio por su ID
export const actualizarPrivilegio = async (req, res) => {
    try {
        const privilegio = await PrivilegioModel.findByPk(req.params.id_privilegioPK);
        if (privilegio) {
            await privilegio.update(req.body);
            res.status(200).json(privilegio);
        } else {
            res.status(404).json({ message: 'privilegio no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la privilegio', error });
    }
};

// Eliminar una privilegio por su ID
export const eliminarPrivilegio = async (req, res) => {
    try {
        const privilegio = await PrivilegioModel.findByPk(req.params.id_privilegioPK);
        if (privilegio) {
            await privilegio.destroy();
            res.status(204).json({ message: 'privilegio eliminada' });
        } else {
            res.status(404).json({ message: 'privilegio no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la privilegio', error });
    }
};
