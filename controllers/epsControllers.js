import EpsModel from "../models/epsModel.js";

// Crear una nueva eps
export const crearEps = async (req, res) => {
    try {
        const nuevaEps = await EpsModel.create(req.body);
        res.status(201).json(nuevaEps);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la eps', error });
    }
};

// Obtener todas las eps
export const obtenerEps = async (req, res) => {
    try {
        const diferentesEps = await EpsModel.findAll();
        res.status(200).json(diferentesEps);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las eps', error });
    }
};

// Obtener una eps por su ID
export const obtenerEpsPorId = async (req, res) => {
    try {
        const eps = await EpsModel.findByPk(req.params.id_epsPK);
        if (eps) {
            res.status(200).json(eps);
        } else {
            res.status(404).json({ message: 'Eps no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la eps', error });
    }
};

// Actualizar una eps por su ID
export const actualizarEps = async (req, res) => {
    try {
        const eps = await EpsModel.findByPk(req.params.id_epsPK);
        if (eps) {
            await eps.update(req.body);
            res.status(200).json(eps);
        } else {
            res.status(404).json({ message: 'Eps no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la eps', error });
    }
};

// Eliminar una eps por su ID
export const eliminarEps = async (req, res) => {
    try {
        const eps = await EpsModel.findByPk(req.params.id_epsPK);
        if (eps) {
            await eps.destroy();
            res.status(204).json({ message: 'eps eliminada' });
        } else {
            res.status(404).json({ message: 'eps no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la eps', error });
    }
};
