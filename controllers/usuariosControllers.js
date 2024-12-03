import UsuarioModel from "../models/usuarioModel.js";
import bcrypt from "bcrypt";

// Crear un nuevo usuario con contraseña encriptada
export const crearUsuario = async (req, res) => {
    const { var_contrasena, ...userData } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(var_contrasena, 10); // 10 es el número de rondas de encriptación

        // Crear el usuario con la contraseña encriptada
        const nuevoUsuario = await UsuarioModel.create({
            ...userData,
            var_contrasena: hashedPassword
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};


// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const diferentesUsuarios = await UsuarioModel.findAll();
        res.status(200).json(diferentesUsuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Obtener un usuario por su ID
export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findByPk(req.params.id_usuarioPK);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// // Actualizar un usuario por su ID
// export const actualizarUsuario = async (req, res) => {
//     try {
//         const usuario = await UsuarioModel.findByPk(req.params.id_usuarioPK);
//         if (usuario) {
//             await usuario.update(req.body);
//             res.status(200).json(usuario);
//         } else {
//             res.status(404).json({ message: 'Usuario no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al actualizar el Usuario', error });
//     }
// };


export const actualizarUsuario = async (req, res) => {
    const { var_contrasena, ...otrosDatos } = req.body;

    try {
        const usuario = await UsuarioModel.findByPk(req.params.id_usuarioPK);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Si se envía una nueva contraseña, encriptarla
        if (var_contrasena) {
            const hashedPassword = await bcrypt.hash(var_contrasena, 10);
            otrosDatos.var_contrasena = hashedPassword; // Agregar la contraseña encriptada a los datos de actualización
        }

        // Actualizar el usuario con los datos restantes
        await usuario.update(otrosDatos);

        res.status(200).json({ message: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};






// Eliminar un usuario por su ID
export const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findByPk(req.params.id_usuarioPK);
        if (usuario) {
            await usuario.destroy();
            res.status(204).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};
