import ProfesionalModel from "../models/profesionalModel.js";

// Crear un nuevo espacio
export const crearEspacio = async (req, res) => {
    try {
        const nuevoProfesional = await ProfesionalModel.create(req.body);
        res.status(201).json(nuevoProfesional);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el espacio', error });
    }
};

// Obtener todos los espacios
export const obtenerEspacios = async (req, res) => {
    try {
        const diferentesProfesionales = await ProfesionalModel.findAll();
        res.status(200).json(diferentesProfesionales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los espacios', error });
    }
};

// Obtener un espacio por su ID
export const obtenerEspacioPorId = async (req, res) => {
    try {
        const profesional = await ProfesionalModel.findByPk(req.params.id_espacioHogarPK);
        if (profesional) {
            res.status(200).json(profesional);
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el espacio', error });
    }
};

// Actualizar un espacio por su ID
export const actualizarEspacio = async (req, res) => {
    try {
        const profesional = await ProfesionalModel.findByPk(req.params.id_profesionalHogarPK);
        if (profesional) {
            await profesional.update(req.body);
            res.status(200).json(profesional);
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el espacio', error });
    }
};

// Eliminar un espacio por su ID
export const eliminarEspacio = async (req, res) => {
    try {
        const profesional = await ProfesionalModel.findByPk(req.params.id_profesionalHogarPK);
        if (profesional) {
            await profesional.destroy();
            res.status(204).json({ message: 'profesional eliminado' });
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el espacio', error });
    }
};
