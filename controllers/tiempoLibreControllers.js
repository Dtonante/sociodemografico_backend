import TiempoLibreModel from "../models/timpoLibreModel.js";

// Crear un nuevo tiempo libre
export const crearTiempoLibre = async (req, res) => {
    try {
        const nuevoTiempoLibre = await TiempoLibreModel.create(req.body);
        res.status(201).json(nuevoTiempoLibre);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el tiempo libre', error });
    }
};

// Obtener todos los tiempos libres
export const obtenerTiempoLibre = async (req, res) => {
    try {
        const diferentesTiemposLibres = await TiempoLibreModel.findAll();
        res.status(200).json(diferentesTiemposLibres);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tiempos libres', error });
    }
};

// Obtener un tiempo libre por su ID
export const obtenerTiempoLibrePorId = async (req, res) => {
    try {
        const tiempoLibre = await TiempoLibreModel.findByPk(req.params.id_tiempoLibrePK);
        if (tiempoLibre) {
            res.status(200).json(tiempoLibre);
        } else {
            res.status(404).json({ message: 'Tiempo libre no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el tiempo libre', error });
    }
};

// Actualizar un tiempo libre por su ID
export const actualizarTiempoLibre = async (req, res) => {
    try {
        const tiempoLibre = await TiempoLibreModel.findByPk(req.params.id_tiempoLibrePK);
        if (tiempoLibre) {
            await tiempoLibre.update(req.body);
            res.status(200).json(tiempoLibre);
        } else {
            res.status(404).json({ message: 'Tiempo libre no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el tiempo libre', error });
    }
};

// Eliminar un tiempo libre por su ID
export const eliminarTiempoLibre = async (req, res) => {
    try {
        const tiempoLibre = await TiempoLibreModel.findByPk(req.params.id_tiempoLibrePK);
        if (tiempoLibre) {
            await tiempoLibre.destroy();
            res.status(204).json({ message: 'Tiempo libre eliminada' });
        } else {
            res.status(404).json({ message: 'Tiempo libre no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tiempo libre', error });
    }
};
