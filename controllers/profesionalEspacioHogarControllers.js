import ProfesionalEspacioHogarModel from "../models/profesionalEspacioHogarModel.js";
import EspaciosHogarModel from "../models/espaciosHogarModel.js";

// Crear un nuevo profecional-espacio del hogar
export const crearProfesionalEspacioHogar = async (req, res) => {
    try {
        const nuevoProfesionalEspacioHogar = await ProfesionalEspacioHogarModel.create(req.body);
        res.status(201).json(nuevoProfesionalEspacioHogar);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profecional-espacio del hogar', error });
    }
};

// Obtener todos los profecionales-antecedentes medicos
export const obtenerProfesionalesEspaciosHogar = async (req, res) => {
    try {
        const diferentesProfesionalesEspacioHogar = await ProfesionalEspacioHogarModel.findAll();
        res.status(200).json(diferentesProfesionalesEspacioHogar);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profecionales-antecedentes medicos', error });
    }
};


// Obtener todos los antecedentes médicos de un profesional por su ID
export const obtenerProfesionalEspacioHogarPorId = async (req, res) => {
    try {
        const profesionalEspacioHogar = await ProfesionalEspacioHogarModel.findAll({
            where: { id_profesionalFK: req.params.id_profesionalFK },
            include: [ { model: EspaciosHogarModel, required: true } ]
        });
        if (profesionalEspacioHogar.length > 0) {
            res.status(200).json(profesionalEspacioHogar);
        } else {
            res.status(404).json({ message: 'No se encontraron antecedentes médicos para este profesional' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los antecedentes médicos', error });
    }
};

// // Actualizar un profecional-espacio del hogar por su ID
// export const actualizarProfesionalEspacioHogar = async (req, res) => {
//     try {
//         const profesionalEspacioHogar = await ProfesionalEspacioHogarModel.findByPk(req.params.id_profesionalFK);
//         if (profesionalEspacioHogar) {
//             await profesionalEspacioHogar.update(req.body);
//             res.status(200).json(profesionalEspacioHogar);
//         } else {
//             res.status(404).json({ message: 'Profecional-espacio del hogar no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al actualizar el Profecional-espacio del hogar', error });
//     }
// };



// Eliminar un antecedente médico específico de un profesional por su ID
export const eliminarProfesionalEspacioHogar = async (req, res) => {
    const { id_profesionalFK, id_espacioHogarFK } = req.params;

    try {
        const profesionalEspacioHogar = await ProfesionalEspacioHogarModel.findOne({
            where: {
                id_profesionalFK: id_profesionalFK,
                id_espacioHogarFK: id_espacioHogarFK
            }
        });

        if (profesionalEspacioHogar) {
            await profesionalEspacioHogar.destroy();
            res.status(204).json({ message: 'Profecional-espacio del hogar eliminado' });
        } else {
            res.status(404).json({ message: 'Profecional-espacio del hogar no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profecional-espacio del hogar', error });
    }
};
