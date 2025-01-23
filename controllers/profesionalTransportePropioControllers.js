import ProfesionalTransportePropioModel from "../models/profesionalTransportePropioModel.js";
import TransportePropioModel from "../models/transportePropioModel.js";

// Crear un nuevo profecional-transporte propio
export const crearProfesionalTransportePropio = async (req, res) => {
    try {
        const nuevoProfesionalTransportePropio = await ProfesionalTransportePropioModel.create(req.body);
        res.status(201).json(nuevoProfesionalTransportePropio);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profecional-transporte propio', error });
    }
};

// Obtener todos los profecionales-transporte propio
export const obtenerProfesionalesTransportePropio = async (req, res) => {
    try {
        const diferentesProfesionalesTransportePropio = await ProfesionalTransportePropioModel.findAll();
        res.status(200).json(diferentesProfesionalesTransportePropio);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profecionales-transporte propio', error });
    }
};


// Obtener todos los transporte propio de un profesional por su ID
export const obtenerProfesionalTransportePropioPorId = async (req, res) => {
    try {
        const profesionalesTransportePropio = await ProfesionalTransportePropioModel.findAll({
            where: { id_profesionalFK: req.params.id_profesionalFK },
            include: [ { 
                model: TransportePropioModel,
                required: true,
                as: 'transportePropio'
            } ]
        });
        if (profesionalesTransportePropio.length > 0) {
            res.status(200).json(profesionalesTransportePropio);
        } else {
            res.status(404).json({ message: 'No se encontraron transporte propio para este profesional' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los transporte propio', error });
    }
};

// Eliminar un transporte propio específico de un profesional por su ID
export const eliminarProfesionalTransportePropio = async (req, res) => {
    const { id_profesionalFK, id_transportePropioFK } = req.params;

    try {
        const profesionalTransportePropio = await ProfesionalTransportePropioModel.findOne({
            where: {
                id_profesionalFK: id_profesionalFK,
                id_transportePropioFK: id_transportePropioFK
            }
        });

        if (profesionalTransportePropio) {
            await profesionalTransportePropio.destroy();
            res.status(204).json({ message: 'Profecional-transporte propio eliminado' });
        } else {
            res.status(404).json({ message: 'Profecional-transporte propio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profecional-transporte propio', error });
    }
};

// Editar todas las placas de transporte propio de un profesional
export const editarPlacasDeProfesional = async (req, res) => {
    const { id_profesionalFK } = req.params; // ID del profesional
    const { var_numeroPlaca } = req.body;   // Nueva placa

    try {
        // Obtener todos los registros del profesional
        const registros = await ProfesionalTransportePropioModel.findAll({
            where: { id_profesionalFK },
        });

        if (registros.length === 0) {
            return res.status(404).json({
                message: `No se encontraron registros de transporte propio para el profesional con ID ${id_profesionalFK}.`,
            });
        }

        // Actualizar las placas según la condición
        let cantidadRegistrosActualizados = 0;
        for (const registro of registros) {
            const nuevaPlaca =
                [1, 2, 3, 4].includes(registro.id_transportePropioFK)
                    ? var_numeroPlaca // Asignar la nueva placa si cumple la condición
                    : "no aplica";    // Asignar "no aplica" si no cumple

            const [actualizado] = await ProfesionalTransportePropioModel.update(
                { var_numeroPlaca: nuevaPlaca },
                { where: { id_profesionalFK, id_transportePropioFK: registro.id_transportePropioFK } }
            );

            cantidadRegistrosActualizados += actualizado;
        }

        res.status(200).json({
            message: `Se actualizaron ${cantidadRegistrosActualizados} registros de transporte propio del profesional con ID ${id_profesionalFK}.`,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar las placas de transporte propio del profesional.',
            error,
        });
    }
};
