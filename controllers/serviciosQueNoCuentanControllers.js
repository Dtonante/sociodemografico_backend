import ServiciosQueNoCuentanModel from "../models/serviciosQueNoCuentanModel.js";

// Crear un nuevo servicio que no cuenta
export const crearServicioQueNoCuenta = async (req, res) => {
    try {
        const nuevoServicioQueNoCuenta = await ServiciosQueNoCuentanModel.create(req.body);
        res.status(201).json(nuevoServicioQueNoCuenta);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el servicio con el que no cuentan', error });
    }
};

// Obtener todos los servicios que no cuentan
export const obtenerServiciosQueNoCuentan = async (req, res) => {
    try {
        const diferentesServiciosQueNoCuentan = await ServiciosQueNoCuentanModel.findAll();
        res.status(200).json(diferentesServiciosQueNoCuentan);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios con los que no cuentan', error });
    }
};

// Obtener un servicio que no cuenta por su ID
export const obtenerServicioQueNoCuentaPorId = async (req, res) => {
    try {
        const ServicioQueNoCuenta = await ServiciosQueNoCuentanModel.findByPk(req.params.id_servicioQueNoCuentaPK);
        if (ServicioQueNoCuenta) {
            res.status(200).json(ServicioQueNoCuenta);
        } else {
            res.status(404).json({ message: 'Espacio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios con los que no cuentan', error });
    }
};

// Actualizar un servicio que servicio con el que no cuentan por su ID
export const actualizarServicioQueNoCuenta = async (req, res) => {
    try {
        const ServicioQueNoCuenta = await ServiciosQueNoCuentanModel.findByPk(req.params.id_servicioQueNoCuentaPK);
        if (ServicioQueNoCuenta) {
            await ServicioQueNoCuenta.update(req.body);
            res.status(200).json(ServicioQueNoCuenta);
        } else {
            res.status(404).json({ message: 'Servicio con el que no cuentan encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el servicio con el que no cuentan', error });
    }
};

// Eliminar un servicio que no cuenta por su ID
export const eliminarServicioQueNoCuenta = async (req, res) => {
    try {
        const ServicioQueNoCuenta = await ServiciosQueNoCuentanModel.findByPk(req.params.id_servicioQueNoCuentaPK);
        if (ServicioQueNoCuenta) {
            await ServicioQueNoCuenta.destroy();
            res.status(204).json({ message: 'Servicio que no cuentan eliminado' });
        } else {
            res.status(404).json({ message: 'Servicio que no cuentan no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el Servicio que no cuentan', error });
    }
};
