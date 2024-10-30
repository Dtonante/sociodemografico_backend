import CuentasBancariasModel from "../models/cuentasBancariasModel.js";

// Crear un nuevo banco
export const crearBanco = async (req, res) => {
    try {
        const nuevoBanco = await CuentasBancariasModel.create(req.body);
        res.status(201).json(nuevoBanco);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el banco', error });
    }
};

// Obtener todos los bancos
export const obtenerBanco = async (req, res) => {
    try {
        const diferentesBancos = await CuentasBancariasModel.findAll();
        res.status(200).json(diferentesBancos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los bancos', error });
    }
};

// Obtener un banco por su ID
export const obtenerBancoPorId = async (req, res) => {
    try {
        const banco = await CuentasBancariasModel.findByPk(req.params.id_cuentaBancariaPK);
        if (banco) {
            res.status(200).json(banco);
        } else {
            res.status(404).json({ message: 'Banco no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el banco', error });
    }
};

// Actualizar un banco por su ID
export const actualizarBanco = async (req, res) => {
    try {
        const banco = await CuentasBancariasModel.findByPk(req.params.id_cuentaBancariaPK);
        if (banco) {
            await banco.update(req.body);
            res.status(200).json(banco);
        } else {
            res.status(404).json({ message: 'Banco no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el banco', error });
    }
};

// Eliminar un banco por su ID
export const eliminarBanco = async (req, res) => {
    try {
        const banco = await CuentasBancariasModel.findByPk(req.params.id_cuentaBancariaPK);
        if (banco) {
            await banco.destroy();
            res.status(204).json({ message: 'Banco eliminado' });
        } else {
            res.status(404).json({ message: 'Banco no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el banco', error });
    }
};
