import ProfesionalServicioSaludAdicionalModel from "../models/profesionalServicioSaludAdicionalModel.js";
import ServicioSaludAdicionalModel from "../models/servicioSaludAdicionalModel.js";

// Crear un nuevo profecional-servicio de salud adicional
export const crearProfesionalServicioSaludAdicional = async (req, res) => {
    try {
        const nuevoProfesionalServicioSaludAdicional = await ProfesionalServicioSaludAdicionalModel.create(req.body);
        res.status(201).json(nuevoProfesionalServicioSaludAdicional);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profecional-servicio de salud adicional', error });
    }
};

// Obtener todos los profecionales-servicios de salud adicionales
export const obtenerProfesionalesServiciosSaludAdicionales = async (req, res) => {
    try {
        const diferentesProfesionalesServiciosSaludAdicionales = await ProfesionalServicioSaludAdicionalModel.findAll();
        res.status(200).json(diferentesProfesionalesServiciosSaludAdicionales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profecionales-servicios de salud adicionales', error });
    }
};


// Obtener todos los servicios de salud adicionales de un profesional por su ID
export const obtenerProfesionalServicioSaludAdicionalPorId = async (req, res) => {
    try {
        const profesionalServicioSaludAdicional = await ProfesionalServicioSaludAdicionalModel.findAll({
            where: { id_profesionalFK: req.params.id_profesionalFK },
            include: [ { model: ServicioSaludAdicionalModel, required: true } ]
        });
        if (profesionalServicioSaludAdicional.length > 0) {
            res.status(200).json(profesionalServicioSaludAdicional);
        } else {
            res.status(404).json({ message: 'No se encontraron servicio de salud adicional para este profesional' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicio de salud adicional', error });
    }
};


// Eliminar un servicio de salud adicional específico de un profesional por su ID
export const eliminarProfesionalServicioSaludAdicional = async (req, res) => {
    const { id_profesionalFK, id_ServicioDeSaludAdicionalFK } = req.params;

    try {
        const profesionalServicioSaludAdicional = await ProfesionalServicioSaludAdicionalModel.findOne({
            where: {
                id_profesionalFK: id_profesionalFK,
                id_ServicioDeSaludAdicionalFK: id_ServicioDeSaludAdicionalFK
            }
        });

        if (profesionalServicioSaludAdicional) {
            await profesionalServicioSaludAdicional.destroy();
            res.status(204).json({ message: 'Profecional-servicio de salud adicional eliminado' });
        } else {
            res.status(404).json({ message: 'Profecional-servicio de salud adicional no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profecional-servicio de salud adicional', error });
    }
};
