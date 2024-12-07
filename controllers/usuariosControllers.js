import UsuarioModel from "../models/usuarioModel.js";
import bcrypt from "bcrypt";
import { sendMail } from '../config/nodemailer.js';


// Crear un nuevo usuario con contraseña encriptada
export const crearUsuario = async (req, res) => {
    const { var_contrasena, ...userData } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(var_contrasena, 10);

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






// // Obtener un usuario por su correo personal desde la URL
// export const obtenerUsuarioPorCorreo = async (req, res) => {
//     const { correo } = req.params; // Extraer el correo de los parámetros de la URL

//     try {
//         // Busca al usuario en la base de datos por correo
//         const usuario = await UsuarioModel.findOne({
//             where: { var_correoElectronicoPersonal: correo }
//         });

//         if (usuario) {
//             // Si el usuario es encontrado, envía el correo
//             const mailOptions = {
//                 from: 'soporte.tecnico@esumer.edu.co', 
//                 to: usuario.var_correoElectronicoPersonal, // El correo del usuario
//                 subject: 'Recuperación de Contraseña', // Asunto del correo
//                 text: `Hola ${usuario.var_nombreCompleto},\n\nHemos recibido una solicitud para recuperar tu contraseña. Si no fuiste tú, por favor ignora este correo. Si deseas recuperar tu contraseña, haz clic en el siguiente enlace: [INCLUIR ENLACE DE RECUPERACIÓN].\n\nSaludos,\nEl equipo de soporte.` // El cuerpo del correo
//             };

//             try {
//                 // Llamada a la función para enviar el correo
//                 await sendMail(mailOptions);
//                 res.status(200).json(usuario); // Devuelve el usuario encontrado si el correo se envió correctamente
//             } catch (error) {
//                 res.status(500).json({ message: 'Error al enviar el correo', error }); // Error al enviar correo
//             }
//         } else {
//             res.status(404).json({ message: 'Usuario no encontrado con ese correo.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al buscar el usuario', error });
//     }
// };

// Obtener un usuario por su correo personal desde la URL
export const obtenerUsuarioPorCorreo = async (req, res) => {
    const { correo } = req.params; // Extraer el correo de los parámetros de la URL

    try {
        // Busca al usuario en la base de datos por correo
        const usuario = await UsuarioModel.findOne({
            where: { var_correoElectronicoPersonal: correo }
        });

        if (usuario) {
            // Construir la URL con el ID del usuario como parámetro de consulta
            const recoveryLink = `http://localhost:5173/CambiarContrasena?id=${usuario.id_usuarioPK}`;
            // const recoveryLink = `https://evaluacion.esumer.edu.co/CambiarContrasena?id=${usuario.id_usuarioPK}`;

            // Definir las opciones del correo
            const mailOptions = {
                from: 'soporte.tecnico@esumer.edu.co',
                to: usuario.var_correoElectronicoPersonal, // El correo del usuario
                subject: 'Recuperación de Contraseña',
                text: `Hola ${usuario.var_nombreCompleto},\n\nHemos recibido una solicitud para recuperar tu contraseña. Si no fuiste tú, por favor ignora este correo. Si deseas recuperar tu contraseña, haz clic en el siguiente enlace: ${recoveryLink}\n\nSaludos,\nEl equipo de soporte.`
            };

            try {
                // Llamada a la función para enviar el correo
                await sendMail(mailOptions);
                res.status(200).json(usuario); // Devuelve el usuario encontrado si el correo se envió correctamente
            } catch (error) {
                res.status(500).json({ message: 'Error al enviar el correo', error }); // Error al enviar correo
            }
        } else {
            res.status(404).json({ message: 'Usuario no encontrado con ese correo.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el usuario', error });
    }
};



