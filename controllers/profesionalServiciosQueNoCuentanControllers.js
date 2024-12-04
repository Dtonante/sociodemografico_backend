import ProfesionalServiciosQueNoCuentanModel from "../models/profesionalServiciosQueNoCuentanModel.js";
import ServiciosQueNoCuentanModel from "../models/serviciosQueNoCuentanModel.js";

// Crear un nuevo profecional-servicio que no cuentan
export const crearProfesionalServicioQueNoCuentan = async (req, res) => {
    try {
        const nuevoProfesionalServicioQueNoCuentan = await ProfesionalServiciosQueNoCuentanModel.create(req.body);
        res.status(201).json(nuevoProfesionalServicioQueNoCuentan);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profecional-servicio que no cuentan', error });
    }
};

// Obtener todos los profecionales-servicios que no cuentan
export const obtenerProfesionalesServiciosQueNoCuentan = async (req, res) => {
    try {
        const diferentesProfesionalesServiciosQueNoCuentan = await ProfesionalServiciosQueNoCuentanModel.findAll();
        res.status(200).json(diferentesProfesionalesServiciosQueNoCuentan);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profecionales-servicios que no cuentanes', error });
    }
};

// Obtener todos los servicios que no cuentan de un profesional por su ID
export const obtenerProfesionalServicioQueNoCuentanPorId = async (req, res) => {
    try {
        const profesionalServicioQueNoCuentan = await ProfesionalServiciosQueNoCuentanModel.findAll({
            where: { id_profesionalFK: req.params.id_profesionalFK },
            include: [
                {
                    model: ServiciosQueNoCuentanModel,
                    as: 'serviciosQueNoCuenta',
                    required: true
                }
            ]
        });
        if (profesionalServicioQueNoCuentan.length > 0) {
            res.status(200).json(profesionalServicioQueNoCuentan);
        } else {
            res.status(404).json({ message: 'No se encontraron servicio que no cuentan para este profesional' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicio que no cuentan', error });
    }
};


// Eliminar un servicio que no cuentan específico de un profesional por su ID
export const eliminarProfesionalServicioQueNoCuentan = async (req, res) => {
    const { id_profesionalFK, id_servicioQueNoCuentaFK } = req.params;

    try {
        const profesionalServicioQueNoCuentan = await ProfesionalServiciosQueNoCuentanModel.findOne({
            where: {
                id_profesionalFK: id_profesionalFK,
                id_servicioQueNoCuentaFK: id_servicioQueNoCuentaFK
            }
        });

        if (profesionalServicioQueNoCuentan) {
            await profesionalServicioQueNoCuentan.destroy();
            res.status(204).json({ message: 'Profecional-servicio que no cuentan eliminado' });
        } else {
            res.status(404).json({ message: 'Profecional-servicio que no cuentan no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profecional-servicio que no cuentan', error });
    }
};
