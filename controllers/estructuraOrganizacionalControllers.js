import estructuraOrganizacionalModel from "../models/estructuraOrganizacionalModel.js";

// Crear un nueva estructura organizacional
export const crearEstructuraOrganizacional = async (req, res) => {
    try {
        const nuevoEstructuraOrganizacional = await estructuraOrganizacionalModel.create(req.body);
        res.status(201).json(nuevoEstructuraOrganizacional);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el espacio', error });
    }
};

// Obtener todas las estructuras organizacional
export const obtenerEstructuraOrganizacional = async (req, res) => {
    try {
        const diferentesEstructurasOrganizacional = await estructuraOrganizacionalModel.findAll();
        res.status(200).json(diferentesEstructurasOrganizacional);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los espacios', error });
    }
};

// Obtener una estructura organizacional por su ID
export const obtenerEstructuraOrganizacionalPorId = async (req, res) => {
    try {
        const estructuraOrganizacional = await estructuraOrganizacionalModel.findByPk(req.params.id_areaPk);
        if (estructuraOrganizacional) {
            res.status(200).json(estructuraOrganizacional);
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el espacio', error });
    }
};

// Actualizar una estructura organizacional por su ID
export const actualizarEstructuraOrganizacional = async (req, res) => {
    try {
        const estructuraOrganizacional = await estructuraOrganizacionalModel.findByPk(req.params.id_areaPk);
        if (estructuraOrganizacional) {
            await estructuraOrganizacional.update(req.body);
            res.status(200).json(estructuraOrganizacional);
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el espacio', error });
    }
};

// Eliminar una estructura organizacional por su ID
export const eliminarEstructuraOrganizacional = async (req, res) => {
    try {
        const estructuraOrganizacional = await estructuraOrganizacionalModel.findByPk(req.params.id_areaPk);
        if (estructuraOrganizacional) {
            await estructuraOrganizacional.destroy();
            res.status(204).json({ message: 'Espacio eliminado' });
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el espacio', error });
    }
};
