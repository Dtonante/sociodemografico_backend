import FondoPensionModel from "../models/fondoPensionModel.js";

// Crear un nuevo fondo de pension
export const crearFondoPension = async (req, res) => {
    try {
        const nuevoFondoPension = await FondoPensionModel.create(req.body);
        res.status(201).json(nuevoFondoPension);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el fondo de pension', error });
    }
};

// Obtener todos los fondos de pension
export const obtenerFondoPension = async (req, res) => {
    try {
        const diferentesFondosPension = await FondoPensionModel.findAll();
        res.status(200).json(diferentesFondosPension);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los fondos de pension', error });
    }
};

// Obtener un fondo de pension por su ID
export const obtenerFondoPensionPorId = async (req, res) => {
    try {
        const fondoPension = await FondoPensionModel.findByPk(req.params.id_fondoPensionPK);
        if (fondoPension) {
            res.status(200).json(fondoPension);
        } else {
            res.status(404).json({ message: 'Fondo de pension no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el fondo de pension', error });
    }
};

// Actualizar un fondo de pension por su ID
export const actualizarFondoPension = async (req, res) => {
    try {
        const fondoPension = await FondoPensionModel.findByPk(req.params.id_fondoPensionPK);
        if (fondoPension) {
            await fondoPension.update(req.body);
            res.status(200).json(fondoPension);
        } else {
            res.status(404).json({ message: 'Fondo de pension no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el fondo de pension', error });
    }
};

// Eliminar un fondo de pension por su ID
export const eliminarFondoPension = async (req, res) => {
    try {
        const fondoPension = await FondoPensionModel.findByPk(req.params.id_fondoPensionPK);
        if (fondoPension) {
            await fondoPension.destroy();
            res.status(204).json({ message: 'Fondo de pension eliminado' });
        } else {
            res.status(404).json({ message: 'Fondo de pension no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el fondo de pension', error });
    }
};
