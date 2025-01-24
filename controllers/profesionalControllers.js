import ProfesionalModel from "../models/profesionalModel.js";
import UsuarioModel from "../models/usuarioModel.js";
import TipoDocumentoModel from "../models/tipoDocumentoModel.js";
import EpsModel from "../models/epsModel.js";
import FondoPensionModel from "../models/fondoPensionModel.js";
import CuentasBancariasModel from "../models/cuentasBancariasModel.js";
import EstructuraOrgranizacionalModel from "../models/estructuraOrganizacionalModel.js";

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

// Obtener todos los profesionales con sus relaciones
export const obtenerProfesionales = async (req, res) => {
    try {
        const diferentesProfesionales = await ProfesionalModel.findAll({
            include: [
                {
                    model: UsuarioModel,
                    as: 'Usuario',
                    attributes: ['boolean_estado','var_nombreCompleto', 'var_numeroDocumento', 'var_correoElectronicoPersonal', 'var_genero', 'var_contactoEmergencia', 'int_tipoDocumentoFK'],
                    include: [
                        {
                            model: TipoDocumentoModel,
                            as: 'TipoDocumento',
                            attributes: ['var_nombreDocumento']
                        },
                       
                    ],
                    
                },
                {
                    model: EpsModel,
                    as: 'Eps',
                    attributes: ['var_nombreEps']
                },
                {
                    model: FondoPensionModel,
                    as: 'FondoDePension',
                    attributes: ['var_nombreFondoPension']
                },
                {
                    model: CuentasBancariasModel,
                    as: 'CuentaBancaria',
                    attributes: ['var_nombreCuentaBancaria']
                },
                {
                    model: EstructuraOrgranizacionalModel,
                    as: 'EstructuraOrganizacional',
                    attributes: ['var_nombreArea']
                }
            ],
            
        });
        res.status(200).json(diferentesProfesionales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los profesionales', error });
    }
};



// Obtener un profesional por su ID
export const obtenerProfesionalPorId = async (req, res) => {
    try {
        const profesional = await ProfesionalModel.findByPk(
            req.params.id_profesionalPK, // Primer parámetro: el ID que buscas
            {
                include: [
                    {
                        model: UsuarioModel,
                        as: 'Usuario',
                        attributes: ['var_nombreCompleto', 'int_tipoDocumentoFK', 'var_numeroDocumento', 'var_genero', 'var_correoElectronicoPersonal', 'var_contactoEmergencia'],
                        include: [
                            {
                                model: TipoDocumentoModel,
                                as: 'TipoDocumento',
                                attributes: ['var_nombreDocumento']
                            }
                        ]
                    },
                    {
                        model: EpsModel,
                        as: 'Eps',
                        attributes: ['var_nombreEps']
                    },
                    {
                        model: FondoPensionModel,
                        as: 'FondoDePension',
                        attributes: ['var_nombreFondoPension']
                    },
                    {
                        model: CuentasBancariasModel,
                        as: 'CuentaBancaria',
                        attributes: ['var_nombreCuentaBancaria']
                    },
                    {
                        model: EstructuraOrgranizacionalModel,
                        as: 'EstructuraOrganizacional',
                        attributes: ['var_nombreArea']
                    }
                ]
            }
        );

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





// Obtener un profesional por el ID del usuario
export const obtenerProfesionalPorIdUsuario = async (req, res) => {
    try {
        // Buscar el profesional con el ID de usuario proporcionado
        const profesional = await ProfesionalModel.findOne({
            where: { id_usuarioFK: req.params.id_usuarioFK }, 
            
        });

        if (profesional) {
            res.status(200).json(profesional);
        } else {
            res.status(404).json({ message: 'Profesional no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el profesional', error });
    }
};



// Función para calcular la diferencia de días entre dos fechas
function calcularDiasDiferencia(fechaInicio) {
    const fechaActual = new Date();
    const fechaIngreso = new Date(fechaInicio);
    const diferenciaTiempo = fechaActual - fechaIngreso;
    const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));
    return diferenciaDias.toString();
}

// Controlador para actualizar la antigüedad de todos los profesionales
export const actualizarAntiguedadProfesionales = async (req, res) => {
    try {
        // Obtener todos los profesionales
        const profesionales = await ProfesionalModel.findAll();

        // Recorrer cada profesional y actualizar su antigüedad
        for (const profesional of profesionales) {
            const fechaIngreso = profesional.date_fechaIngresoInstitucion;
            const antiguedad = calcularDiasDiferencia(fechaIngreso);

            // Actualizar el campo var_antiguedadInstitucion
            await profesional.update({ var_antiguedadInstitucion: antiguedad });
        }

        res.status(200).json({ message: 'Antigüedad de los profesionales actualizada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la antigüedad de los profesionales', error });
    }
};