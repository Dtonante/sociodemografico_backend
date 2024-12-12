import UsuarioModel from "../models/usuarioModel.js";
import bcrypt from "bcrypt";
import { sendMail } from "../config/nodemailer.js";

// Crear un nuevo usuario con contraseña encriptada
export const crearUsuario = async (req, res) => {
  const { var_contrasena, ...userData } = req.body;

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(var_contrasena, 10);

    // Crear el usuario con la contraseña encriptada
    const nuevoUsuario = await UsuarioModel.create({
      ...userData,
      var_contrasena: hashedPassword,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const diferentesUsuarios = await UsuarioModel.findAll();
    res.status(200).json(diferentesUsuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

// Obtener un usuario por su ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findByPk(req.params.id_usuarioPK);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { var_contrasena, ...otrosDatos } = req.body;

  try {
    const usuario = await UsuarioModel.findByPk(req.params.id_usuarioPK);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si se envía una nueva contraseña, encriptarla
    if (var_contrasena) {
      const hashedPassword = await bcrypt.hash(var_contrasena, 10);
      otrosDatos.var_contrasena = hashedPassword; // Agregar la contraseña encriptada a los datos de actualización
    }

    // Actualizar el usuario con los datos restantes
    await usuario.update(otrosDatos);

    res
      .status(200)
      .json({ message: "Usuario actualizado correctamente", usuario });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// Eliminar un usuario por su ID
export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findByPk(req.params.id_usuarioPK);
    if (usuario) {
      await usuario.destroy();
      res.status(204).json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

//verificar si el correo si es de un usuario y enviar el correo para cambiar la contraseña
export const obtenerUsuarioPorCorreo = async (req, res) => {
  const { correo } = req.params; // Extraer el correo de los parámetros de la URL

  try {
    // Busca al usuario en la base de datos por correo
    const usuario = await UsuarioModel.findOne({
      where: { var_correoElectronicoPersonal: correo },
    });

    if (usuario) {
      // Construir la URL con el ID del usuario como parámetro de consulta
    //   const recoveryLink = `http://localhost:5173/CambiarContrasena?id=${usuario.id_usuarioPK}`;
      const recoveryLink = `https://evaluacion.esumer.edu.co/CambiarContrasena?id=${usuario.id_usuarioPK}`;
      
      const mailOptions = {
        from: "soporte.tecnico@esumer.edu.co",
        to: usuario.var_correoElectronicoPersonal,
        subject: "Recuperación de Contraseña",
        html: `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://res.cloudinary.com/drugne4nq/image/upload/v1733514879/imgEsumer/qus1osut11kvbjd7r8uq.jpg" 
                 alt="Imagen de fondo" 
                 style="width: 45%; height: auto; max-width: 150%;"> <!-- Reducido al 50% del tamaño original -->
        </div>
    
        <div style="color: #000000; background-color: #ffffff; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin-bottom: 10px; font-size: 1.5rem; color: #000000;">Recuperación de Contraseña</h2>
            <p style="font-size: 1.2rem; font-weight: bold; margin-bottom: 20px; color: #000000;">Hola, <strong>${usuario.var_nombreCompleto}</strong></p>
            <p style="font-size: 1.1rem; margin-bottom: 20px; color: #000000;">
                Hemos recibido una solicitud para recuperar tu contraseña. Si no fuiste tú, por favor ignora este correo.<br>
                Si deseas recuperar tu contraseña, haz clic en el siguiente enlace:
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${recoveryLink}" style="background-color: #202b52; color: #ffffff; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">Recuperar Contraseña</a>
            </div>
            <p style="font-size: 1.1rem; margin-top: 20px; color: #000000;">Saludos,</p>
            <p style="font-size: 1.1rem; color: #000000;"><strong>El equipo de Gestión TIC</strong></p>
        </div>
        `,
      };

      try {
        // Llamada a la función para enviar el correo
        await sendMail(mailOptions);
        res.status(200).json(usuario); // Devuelve el usuario encontrado si el correo se envió correctamente
      } catch (error) {
        res.status(500).json({ message: "Error al enviar el correo", error }); // Error al enviar correo
      }
    } else {
      res
        .status(404)
        .json({ message: "Usuario no encontrado con ese correo." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el usuario", error });
  }
};

