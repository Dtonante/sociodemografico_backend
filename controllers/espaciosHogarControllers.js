import EspaciosHogarModel from "../models/espaciosHogarModel.js";

// Crear un nuevo espacio
export const crearEspacio = async (req, res) => {
    try {
        const nuevoEspacio = await EspaciosHogarModel.create(req.body);
        res.status(201).json(nuevoEspacio);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el espacio', error });
    }
};

// Obtener todos los espacios
export const obtenerEspacios = async (req, res) => {
    try {
        const diferentesEspacios = await EspaciosHogarModel.findAll();
        res.status(200).json(diferentesEspacios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los espacios', error });
    }
};

// Obtener un espacio por su ID
export const obtenerEspacioPorId = async (req, res) => {
    try {
        const espacio = await EspaciosHogarModel.findByPk(req.params.id_espacioHogarPK);
        if (espacio) {
            res.status(200).json(espacio);
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
        const espacio = await EspaciosHogarModel.findByPk(req.params.id_espacioHogarPK);
        if (espacio) {
            await espacio.update(req.body);
            res.status(200).json(espacio);
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
        const espacio = await EspaciosHogarModel.findByPk(req.params.id_espacioHogarPK);
        if (espacio) {
            await espacio.destroy();
            res.status(204).json({ message: 'Espacio eliminado' });
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el espacio', error });
    }
};
