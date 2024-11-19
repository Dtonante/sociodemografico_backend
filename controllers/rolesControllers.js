import RolModel from "../models/rolesModel.js";

// Crear una nueva rol
export const crearRol = async (req, res) => {
    try {
        const nuevaRol = await RolModel.create(req.body);
        res.status(201).json(nuevaRol);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la Rol', error });
    }
};

// Obtener todas las Rol
export const obtenerRol = async (req, res) => {
    try {
        const diferentesRoles = await RolModel.findAll();
        res.status(200).json(diferentesRoles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las Rol', error });
    }
};

// Obtener una Rol por su ID
export const obtenerRolPorId = async (req, res) => {
    try {
        const rol = await RolModel.findByPk(req.params.id_rolPK);
        if (rol) {
            res.status(200).json(rol);
        } else {
            res.status(404).json({ message: 'rol no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la rol', error });
    }
};

// Actualizar una rol por su ID
export const actualizarRol = async (req, res) => {
    try {
        const rol = await RolModel.findByPk(req.params.id_rolPK);
        if (rol) {
            await rol.update(req.body);
            res.status(200).json(rol);
        } else {
            res.status(404).json({ message: 'rol no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la rol', error });
    }
};

// Eliminar una rol por su ID
export const eliminarRol = async (req, res) => {
    try {
        const rol = await RolModel.findByPk(req.params.id_rolPK);
        if (rol) {
            await rol.destroy();
            res.status(204).json({ message: 'rol eliminada' });
        } else {
            res.status(404).json({ message: 'rol no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la rol', error });
    }
};
