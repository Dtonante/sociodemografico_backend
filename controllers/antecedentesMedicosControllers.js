import AntecedentesMedicosModel from "../models/antecedentesMedicosModel.js";

// Crear un nuevo antecedente
export const crearAntecedente = async (req, res) => {
    try {
        const nuevoAntecedente = await AntecedentesMedicosModel.create(req.body);
        res.status(201).json(nuevoAntecedente);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el antecedente', error });
    }
};

// Obtener todos los antecedentes
export const obtenerAntecedentes = async (req, res) => {
    try {
        const diferentesAntecedentes = await AntecedentesMedicosModel.findAll();
        res.status(200).json(diferentesAntecedentes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los antecedentes', error });
    }
};

// Obtener un antecedente por su ID
export const obtenerAntecedentePorId = async (req, res) => {
    try {
        const antecedente = await AntecedentesMedicosModel.findByPk(req.params.id_antecedenteMedicoPK);
        if (antecedente) {
            res.status(200).json(antecedente);
        } else {
            res.status(404).json({ message: 'Antecedente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el antecedente', error });
    }
};

// Actualizar un antecedente por su ID
export const actualizarAntecedente = async (req, res) => {
    try {
        const antecedente = await AntecedentesMedicosModel.findByPk(req.params.id_antecedenteMedicoPK);
        if (antecedente) {
            await antecedente.update(req.body);
            res.status(200).json(antecedente);
        } else {
            res.status(404).json({ message: 'Antecedente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el antecedente', error });
    }
};

// Eliminar un antecedente por su ID
export const eliminarAntecedente = async (req, res) => {
    try {
        const antecedente = await AntecedentesMedicosModel.findByPk(req.params.id_antecedenteMedicoPK);
        if (antecedente) {
            await antecedente.destroy();
            res.status(204).json({ message: 'Antecedente eliminado' });
        } else {
            res.status(404).json({ message: 'Antecedente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el antecedente', error });
    }
};
