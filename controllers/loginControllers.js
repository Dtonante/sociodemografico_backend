
import UsuarioModel from "../models/usuarioModel.js";
import RolModel from "../models/rolesModel.js"; // Asegúrate de importar RolModel
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

// Configura una clave secreta para los tokens JWT
const JWT_SECRET = "your_jwt_secret_key";

export const loginUser = async (req, res) => {
  const { var_correoElectronicoPersonal, var_contrasena } = req.body;

  try {
    // Buscar usuario por el correo personal, incluyendo el rol relacionado
    const usuario = await UsuarioModel.findOne({
      where: { var_correoElectronicoPersonal },
      include: {
        model: RolModel,  // Suponiendo que tienes un modelo RolModel
        as: 'rol',  // El alias si es necesario, si no lo tienes, puedes omitirlo
        attributes: ['var_nombreRol']  // Traemos solo el nombre del rol
      }
    });

    // Validar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isPasswordValid = await bcrypt.compare(var_contrasena, usuario.var_contrasena);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Crear un token de sesión JWT
    const token = jwt.sign({ 
      userId: usuario.id_usuarioPK, 
      rol: usuario.rol ? usuario.rol.var_nombreRol : null
    }, JWT_SECRET, { expiresIn: "1h" });

    // Responder con el token y el nombre del rol
    res.json({ 
      message: "Inicio de sesión exitoso", 
      token,
      rol: usuario.rol ? usuario.rol.var_nombreRol : null,
      id_usuarioPK: usuario.id_usuarioPK 
    });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
