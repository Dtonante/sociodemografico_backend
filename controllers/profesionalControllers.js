import ProfesionalModel from "../models/profesionalModel.js";

// // Crear un nuevo profesional
// export const crearProfesional = async (req, res) => {
//     try {
//         const nuevoProfesional = await ProfesionalModel.create(req.body);
//         res.status(201).json(nuevoProfesional);
//     } catch (error) {
//         res.status(500).json({ message: 'Error al crear el profesional', error });
//     }
// };

// Crear un nuevo profesional
export const crearProfesional = async (req, res) => {
    try {
        // Verificar si ya existe un profesional con el mismo id_usuarioFK
        const { id_usuarioFK } = req.body;
        const profesionalExistente = await ProfesionalModel.findOne({ where: { id_usuarioFK } });

        if (profesionalExistente) {
            return res.status(400).json({ message: 'El profesional ya ha sido creado con este usuario.' });
        }

        // Si no existe, proceder con la creación
        const nuevoProfesional = await ProfesionalModel.create(req.body);
        res.status(201).json(nuevoProfesional);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el profesional', error });
    }
};

// Obtener todos los profesionales
export const obtenerProfesionales = async (req, res) => {
    try {
        const diferentesProfesionales = await ProfesionalModel.findAll();
        res.status(200).json(diferentesProfesionales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profesionales', error });
    }
};

// Obtener un profesional por su ID
export const obtenerProfesionalPorId = async (req, res) => {
    try {
        const profesional = await ProfesionalModel.findByPk(req.params.id_profesionalPK);
        if (profesional) {
            res.status(200).json(profesional);
        } else {
            res.status(404).json({ message: 'Profesional no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el profesional', error });
    }
};

// Actualizar un profesional por su ID
export const actualizarProfesional = async (req, res) => {
    try {
        const profesional = await ProfesionalModel.findByPk(req.params.id_profesionalPK);
        if (profesional) {
            await profesional.update(req.body);
            res.status(200).json(profesional);
        } else {
            res.status(404).json({ message: 'Profesional no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el profesional', error });
    }
};

// Eliminar un profesional por su ID
export const eliminarProfesional = async (req, res) => {
    try {
        const profesional = await ProfesionalModel.findByPk(req.params.id_profesionalPK);
        if (profesional) {
            await profesional.destroy();
            res.status(204).json({ message: 'Profesional eliminado' });
        } else {
            res.status(404).json({ message: 'Profesional no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el profesional', error });
    }
};
