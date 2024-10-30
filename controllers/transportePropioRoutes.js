import TransportePropioModel from "../models/transportePropioModel.js";

// Crear un nuevo transporte propio
export const crearTransportePropio = async (req, res) => {
    try {
        const nuevoTransportePropio= await TransportePropioModel.create(req.body);
        res.status(201).json(nuevoTransportePropio);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el transporte propio', error });
    }
};

// Obtener todos los transportes propios
export const obtenerTransportesPropios = async (req, res) => {
    try {
        const diferentesTransportesPropios = await TransportePropioModel.findAll();
        res.status(200).json(diferentesTransportesPropios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los transportes propios', error });
    }
};

// Obtener un transporte propio por su ID
export const obtenerTransportePropioPorId = async (req, res) => {
    try {
        const transportePropio = await TransportePropioModel.findByPk(req.params.id_transportePropioPK);
        if (transportePropio) {
            res.status(200).json(transportePropio);
        } else {
            res.status(404).json({ message: 'Transporte propio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el transporte propio', error });
    }
};

// Actualizar un transporte propio por su ID
export const actualizarTransportePropio = async (req, res) => {
    try {
        const transportePropio = await TransportePropioModel.findByPk(req.params.id_transportePropioPK);
        if (transportePropio) {
            await transportePropio.update(req.body);
            res.status(200).json(transportePropio);
        } else {
            res.status(404).json({ message: 'Transporte propio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el transporte propio', error });
    }
};

// Eliminar un transporte propio por su ID
export const eliminarTransportePropio = async (req, res) => {
    try {
        const transportePropio = await TransportePropioModel.findByPk(req.params.id_transportePropioPK);
        if (transportePropio) {
            await transportePropio.destroy();
            res.status(204).json({ message: 'Transporte propio eliminado' });
        } else {
            res.status(404).json({ message: 'Transporte propio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el transporte propio', error });
    }
};
