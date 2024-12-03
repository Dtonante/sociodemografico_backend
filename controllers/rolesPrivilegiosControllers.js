import RolPrivilegioModel from "../models/rolPrivilegiosModel.js";
import PrivilegioModel from "../models/privilegiosModel.js";

// Crear un nuevo profecional-tiempo libre
export const crearRolPrivilegio = async (req, res) => {
    try {
        const nuevoRolPrivilegio = await RolPrivilegioModel.create(req.body);
        res.status(201).json(nuevoRolPrivilegio);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profecional-tiempo libre', error });
    }
};

// Obtener todos los profecionales-tiempo libre
export const obtenerRolPrivilegio = async (req, res) => {
    try {
        const diferentesRolesPrivilegios = await RolPrivilegioModel.findAll();
        res.status(200).json(diferentesRolesPrivilegios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profecionales-tiempo libre', error });
    }
};


// Obtener todos los tiempo libre de un profesional por su ID
export const obtenerPrivilegiosForId = async (req, res) => {
    try {
        const RolPrivilegio = await RolPrivilegioModel.findAll({
            where: { id_rolFK: req.params.id_rolFK },
            include: [ { model: PrivilegioModel, required: true } ]
        });
        if (RolPrivilegio.length > 0) {
            res.status(200).json(RolPrivilegio);
        } else {
            res.status(404).json({ message: 'No se encontraron tiempo libre para este profesional' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tiempo libre', error });
    }
};

// Eliminar un tiempo libre específico de un profesional por su ID
export const eliminarRolPrivilegio = async (req, res) => {
    const { id_rolFK, id_privilegioFK } = req.params;

    try {
        const rolPrivilegio = await RolPrivilegioModel.findOne({
            where: {
                id_rolFK: id_rolFK,
                id_privilegioFK: id_privilegioFK
            }
        });

        if (rolPrivilegio) {
            await rolPrivilegio.destroy();
            res.status(204).json({ message: 'Profecional-tiempo libre eliminado' });
        } else {
            res.status(404).json({ message: 'Profecional-tiempo libre no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profecional-tiempo libre', error });
    }
};
