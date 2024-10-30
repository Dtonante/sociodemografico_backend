import UsuarioModel from "../models/usuarioModel.js";

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await UsuarioModel.create(req.body);
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

// Actualizar un usuario por su ID
export const actualizarUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findByPk(req.params.id_usuarioPK);
        if (usuario) {
            await usuario.update(req.body);
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el Usuario', error });
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
