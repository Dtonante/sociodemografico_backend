import ProfesionalAntecedentesMedicosModel from "../models/profesionalAntecedentesMedicosModel.js";
import AntecedentesMedicosModel from "../models/antecedentesMedicosModel.js";

// Crear un nuevo profecional-antecedente medico
export const crearProfesionalAntecedenteMedico = async (req, res) => {
    try {
        const nuevoProfesionalAntecedenteMedico = await ProfesionalAntecedentesMedicosModel.create(req.body);
        res.status(201).json(nuevoProfesionalAntecedenteMedico);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profecional-antecedente medico', error });
    }
};

// Obtener todos los profecionales-antecedentes medicos
export const obtenerProfesionalesAntecedentesMedicos = async (req, res) => {
    try {
        const diferentesProfesionalesAntecedentesMedicos = await ProfesionalAntecedentesMedicosModel.findAll();
        res.status(200).json(diferentesProfesionalesAntecedentesMedicos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profecionales-antecedentes medicos', error });
    }
};

// Obtener todos los antecedentes médicos de un profesional por su ID
export const obtenerProfesionalAntecedenteMedicoPorId = async (req, res) => {
    try {
        const profesionalAntecedenteMedico = await ProfesionalAntecedentesMedicosModel.findAll({
            where: { id_profesionalFK: req.params.id_profesionalFK },
            include: [ { model: AntecedentesMedicosModel, required: true } ]
        });
        if (profesionalAntecedenteMedico.length > 0) {
            res.status(200).json(profesionalAntecedenteMedico);
        } else {
            res.status(404).json({ message: 'No se encontraron antecedentes médicos para este profesional' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los antecedentes médicos', error });
    }
};

// Eliminar un antecedente médico específico de un profesional por su ID
export const eliminarProfesionalAntecedenteMedico = async (req, res) => {
    const { id_profesionalFK, id_antecedenteMedicoFK } = req.params;

    try {
        const profesionalAntecedenteMedico = await ProfesionalAntecedentesMedicosModel.findOne({
            where: {
                id_profesionalFK: id_profesionalFK,
                id_antecedenteMedicoFK: id_antecedenteMedicoFK
            }
        });

        if (profesionalAntecedenteMedico) {
            await profesionalAntecedenteMedico.destroy();
            res.status(204).json({ message: 'Profecional-antecedente medico eliminado' });
        } else {
            res.status(404).json({ message: 'Profecional-antecedente medico no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profecional-antecedente medico', error });
    }
};

