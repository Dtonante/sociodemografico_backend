import ServicioSaludAdicionalModel from "../models/servicioSaludAdicionalModel.js";

// Crear un nuevo servicio de salud adicional
export const crearServicioSaludAdicional = async (req, res) => {
    try {
        const nuevoServicioSaludAdicional = await ServicioSaludAdicionalModel.create(req.body);
        res.status(201).json(nuevoServicioSaludAdicional);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el servicio de salud adicional', error });
    }
};

// Obtener todos los servicios de salud adicional
export const obtenerServiciosSaludAdicional = async (req, res) => {
    try {
        const diferentesServiciosSaludAdicional = await ServicioSaludAdicionalModel.findAll();
        res.status(200).json(diferentesServiciosSaludAdicional);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios de salud adicional', error });
    }
};

// Obtener un servicio de salud adicional por su ID
export const obtenerServicioSaludAdicionalPorId = async (req, res) => {
    try {
        const ServicioSaludAdicional = await ServicioSaludAdicionalModel.findByPk(req.params.id_servicioDeSaludAdicionalPK);
        if (ServicioSaludAdicional) {
            res.status(200).json(ServicioSaludAdicional);
        } else {
            res.status(404).json({ message: 'Servicio de salud adicional no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el servicio de salud adicional', error });
    }
};

// Actualizar un servicio de salud adicional por su ID
export const actualizarServicioSaludAdicional = async (req, res) => {
    try {
        const ServicioSaludAdicional = await ServicioSaludAdicionalModel.findByPk(req.params.id_servicioDeSaludAdicionalPK);
        if (ServicioSaludAdicional) {
            await ServicioSaludAdicional.update(req.body);
            res.status(200).json(ServicioSaludAdicional);
        } else {
            res.status(404).json({ message: 'Servicio de salud adicional no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el servicio de salud adicional', error });
    }
};

// Eliminar un servicio de salud adicional por su ID
export const eliminarServicioSaludAdicional = async (req, res) => {
    try {
        const ServicioSaludAdicional = await ServicioSaludAdicionalModel.findByPk(req.params.id_servicioDeSaludAdicionalPK);
        if (ServicioSaludAdicional) {
            await ServicioSaludAdicional.destroy();
            res.status(204).json({ message: 'Servicio de salud adicional eliminado' });
        } else {
            res.status(404).json({ message: 'Servicio de salud adicional no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el servicio de salud adicional', error });
    }
};
