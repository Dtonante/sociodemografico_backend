import ProfesionalTiempoLibreModel from "../models/profesionalTiempoLibreModel.js";
import TiempoLibreModel from "../models/timpoLibreModel.js";

// Crear un nuevo profecional-tiempo libre
export const crearProfesionalTiempoLibre = async (req, res) => {
    try {
        const nuevoProfesionalTiempoLibre = await ProfesionalTiempoLibreModel.create(req.body);
        res.status(201).json(nuevoProfesionalTiempoLibre);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profecional-tiempo libre', error });
    }
};

// Obtener todos los profecionales-tiempo libre
export const obtenerProfesionalesTiemposLibre = async (req, res) => {
    try {
        const diferentesProfesionalesTiempoLibre = await ProfesionalTiempoLibreModel.findAll();
        res.status(200).json(diferentesProfesionalesTiempoLibre);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profecionales-tiempo libre', error });
    }
};


// Obtener todos los tiempo libre de un profesional por su ID
export const obtenerProfesionalTiempoLibrePorId = async (req, res) => {
    try {
        const profesionalTiempoLibre = await ProfesionalTiempoLibreModel.findAll({
            where: { id_profesionalFK: req.params.id_profesionalFK },
            include: [ { model: TiempoLibreModel, required: true } ]
        });
        if (profesionalTiempoLibre.length > 0) {
            res.status(200).json(profesionalTiempoLibre);
        } else {
            res.status(404).json({ message: 'No se encontraron tiempo libre para este profesional' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tiempo libre', error });
    }
};

// Eliminar un tiempo libre específico de un profesional por su ID
export const eliminarProfesionalTiempoLibreHogar = async (req, res) => {
    const { id_profesionalFK, id_tiempoLibreFK } = req.params;

    try {
        const profesionalTiempoLibre = await ProfesionalTiempoLibreModel.findOne({
            where: {
                id_profesionalFK: id_profesionalFK,
                id_tiempoLibreFK: id_tiempoLibreFK
            }
        });

        if (profesionalTiempoLibre) {
            await profesionalTiempoLibre.destroy();
            res.status(204).json({ message: 'Profecional-tiempo libre eliminado' });
        } else {
            res.status(404).json({ message: 'Profecional-tiempo libre no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profecional-tiempo libre', error });
    }
};
