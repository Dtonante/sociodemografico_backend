import ProfesionalFactoresDeRiesgoModel from "../models/profesionalFactoresDeRiesgoModel.js";
import FactoresDeRiesgoModel from "../models/factoresDeRiesgoModel.js";

// Crear un nuevo profecional-factor de riesgo
export const crearProfesionalFactorRiesgo = async (req, res) => {
    try {
        const nuevoProfesionalFactoresDeRiesgo = await ProfesionalFactoresDeRiesgoModel.create(req.body);
        res.status(201).json(nuevoProfesionalFactoresDeRiesgo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profecional-factor de riesgo', error });
    }
};

// Obtener todos los profecionales-factor de riesgo
export const obtenerProfesionalesFactoresRiesgo = async (req, res) => {
    try {
        const diferentesProfesionalesFactoresDeRiesgo = await ProfesionalFactoresDeRiesgoModel.findAll();
        res.status(200).json(diferentesProfesionalesFactoresDeRiesgo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profecionales-factor de riesgo', error });
    }
};


// Obtener todos los factor de riesgo de un profesional por su ID
export const obtenerProfesionalFactorRiesgoPorId = async (req, res) => {
    try {
        const profesionalesFactoresDeRiesgo = await ProfesionalFactoresDeRiesgoModel.findAll({
            where: { id_profesionalFK: req.params.id_profesionalFK },
            include: [ { model: FactoresDeRiesgoModel, required: true } ]
        });
        if (profesionalesFactoresDeRiesgo.length > 0) {
            res.status(200).json(profesionalesFactoresDeRiesgo);
        } else {
            res.status(404).json({ message: 'No se encontraron factor de riesgo para este profesional' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los factor de riesgo', error });
    }
};

// Eliminar un factor de riesgo de un profesional por su ID
export const eliminarProfesionalFactorRiesgo = async (req, res) => {
    const { id_profesionalFK, id_factoresRiesgoFK } = req.params;

    try {
        const profesionalFactorDeRiesgo = await ProfesionalFactoresDeRiesgoModel.findOne({
            where: {
                id_profesionalFK: id_profesionalFK,
                id_factoresRiesgoFK: id_factoresRiesgoFK
            }
        });

        if (profesionalFactorDeRiesgo) {
            await profesionalFactorDeRiesgo.destroy();
            res.status(204).json({ message: 'Profecional-factor de riesgo eliminado' });
        } else {
            res.status(404).json({ message: 'Profecional-factor de riesgo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profecional-factor de riesgo', error });
    }
};
