import FactoresDeRiesgoModel from "../models/factoresDeRiesgoModel.js";

// Crear un nuevo factor de riesgo
export const crearFactorRiesgo = async (req, res) => {
    try {
        const nuevoFactorRiesgo = await FactoresDeRiesgoModel.create(req.body);
        res.status(201).json(nuevoFactorRiesgo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el factor de riesgo', error });
    }
};

// Obtener todos los factores de riesgo
export const obtenerFactoresRiesgo = async (req, res) => {
    try {
        const FactoresRiesgo = await FactoresDeRiesgoModel.findAll();
        res.status(200).json(FactoresRiesgo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los factores de riesgo', error });
    }
};

// Obtener un factor de riesgo por su ID
export const obtenerFactorRiesgoPorId = async (req, res) => {
    try {
        const factorRiesgo = await FactoresDeRiesgoModel.findByPk(req.params.id_factoresRiesgoPK);
        if (factorRiesgo) {
            res.status(200).json(factorRiesgo);
        } else {
            res.status(404).json({ message: 'factor de riesgo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el factor de riesgo', error });
    }
};

// Actualizar un factor de riesgo por su ID
export const actualizarFactorRiesgo = async (req, res) => {
    try {
        const factorRiesgo = await FactoresDeRiesgoModel.findByPk(req.params.id_factoresRiesgoPK);
        if (factorRiesgo) {
            await factorRiesgo.update(req.body);
            res.status(200).json(factorRiesgo);
        } else {
            res.status(404).json({ message: 'factor de riesgo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el factor de riesgo', error });
    }
};

// Eliminar un factor de riesgo por su ID
export const eliminarFactorRiesgo = async (req, res) => {
    try {
        const factorRiesgo = await FactoresDeRiesgoModel.findByPk(req.params.id_factoresRiesgoPK);
        if (factorRiesgo) {
            await factorRiesgo.destroy();
            res.status(204).json({ message: 'factor de riesgo eliminado' });
        } else {
            res.status(404).json({ message: 'factor de riesgo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el factor de riesgo', error });
    }
};
