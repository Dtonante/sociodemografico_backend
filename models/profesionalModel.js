import { DataTypes } from "sequelize";
import db from "../database/db.js";
import UsuarioModel from "./usuarioModel.js";
import EpsModel from "./epsModel.js";
import FondoPensionModel from "./fondoPensionModel.js";
import CuentasBancariasModel from "./cuentasBancariasModel.js";
import EstructuraOrgranizacionalModel from "./estructuraOrganizacionalModel.js";

const ProfesionalModel = db.define('tbl_profesional', {
    id_profesionalPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuarioFK: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'tbl_usuarios', key: 'id_usuarioPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    boolean_aceptaTratamientoDatos: { type: DataTypes.BOOLEAN, allowNull: false },
    date_fechaNacimiento: { type: DataTypes.DATE, allowNull: false },
    var_departamentoResidencia: { type: DataTypes.STRING(100), allowNull: false },
    var_ciudadResidencia: { type: DataTypes.STRING(100), allowNull: false },
    var_direccionResidencia: { type: DataTypes.STRING(255), allowNull: false },
    var_estratoVivienda: { type: DataTypes.STRING(25), allowNull: false },
    var_tipoVivienda: { type: DataTypes.STRING(25), allowNull: false },
    var_estadoCivil: { type: DataTypes.STRING(50), allowNull: false },
    boolean_viveSolo: { type: DataTypes.BOOLEAN, allowNull: false },
    set_personasConLasQueVive: { type: DataTypes.STRING(255), allowNull: false },
    boolean_viveConMascotas: { type: DataTypes.BOOLEAN, allowNull: false },
    var_personasDependeciaEconimica: { type: DataTypes.STRING(20), allowNull: false },
    var_totalIngresosPropiosYGrupoFamiliar: { type: DataTypes.STRING(255), allowNull: false },
    var_grupoEtnico: { type: DataTypes.STRING(150), allowNull: false },
    var_rh: { type: DataTypes.STRING(10), allowNull: false },
    id_epsFK: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'tbl_eps', key: 'id_epsPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    id_fondoPensionFK: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'tbl_fondo_pension', key: 'id_fondoPensionPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    boolean_cambioEpsOArl: { type: DataTypes.BOOLEAN, allowNull: false },
    id_cuentaBancariaFK: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'tbl_cuentas_bancarias', key: 'id_cuentaBancariaPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    var_tipoCuenta: { type: DataTypes.STRING(15), allowNull: false },
    var_numeroCuenta: { type: DataTypes.STRING(20), allowNull: false },
    var_tipoVinculacion: { type: DataTypes.STRING(20), allowNull: false },
    var_tipoContrato: { type: DataTypes.STRING(50), allowNull: false },
    var_salario: { type: DataTypes.STRING(255), allowNull: false },
    date_fechaIngresoInstitucion: { type: DataTypes.DATE, allowNull: false },
    var_antiguedadInstitucion: { type: DataTypes.STRING(100), allowNull: false },
    id_areaFK: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'tbl_estructura_organizacion', key: 'id_areaPk' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    var_cargo: { type: DataTypes.STRING(100), allowNull: false },
    var_jefeInmediato: { type: DataTypes.STRING(100), allowNull: false },
    var_sede: { type: DataTypes.STRING(50), allowNull: false },
    var_celular: { type: DataTypes.STRING(15), allowNull: false },
    var_telefonoFijo: { type: DataTypes.STRING(10), allowNull: false },
    var_turnoTrabajo: { type: DataTypes.STRING(15), allowNull:false },
    var_nivelEscolaridad: { type: DataTypes.STRING(50), allowNull: false },
    var_nombreCarrera: { type: DataTypes.STRING(150), allowNull: false },
    boolean_actualmenteEstudia: { type: DataTypes.BOOLEAN, allowNull: false },
    boolean_actividadFisica: { type: DataTypes.BOOLEAN, allowNull: false },
    var_frecuenciaActividadFisica: { type: DataTypes.STRING(100), allowNull: false },
    boolean_fuma: { type: DataTypes.BOOLEAN, allowNull: false },
    var_frecuenciaFuma: { type: DataTypes.STRING(50), allowNull: false },
    boolean_toma: { type: DataTypes.BOOLEAN, allowNull: false },
    var_frecuenciaToma: { type: DataTypes.STRING(50), allowNull: false },
    boolean_sustanciasPsicoactivas: { type: DataTypes.BOOLEAN, allowNull: false },
    var_frecuenciaSustanciasPsicoactivas: { type: DataTypes.STRING(50), allowNull: false },
    set_mediosTransportePublico: { type: DataTypes.STRING(100), allowNull: false },
    set_pasoMayorTiempoLibre: { type: DataTypes.STRING(255), allowNull: false },
    var_peso: { type: DataTypes.STRING(25), allowNull: false },
    var_altura: { type: DataTypes.STRING(25), allowNull: false },
    var_urlDatosAdjuntos: { type: DataTypes.STRING(255), allowNull: false },
    var_correoElectronicoInstitucional: { type: DataTypes.STRING(50), allowNull: false }


}, {
    tableName: 'tbl_profesional',
    timestamps: false
});


// Importar modelos relacionados 1 a 1 
ProfesionalModel.belongsTo(UsuarioModel, { foreignKey: 'id_usuarioFK' });
ProfesionalModel.belongsTo(EpsModel, { foreignKey: 'id_epsFK' });
ProfesionalModel.belongsTo(FondoPensionModel, { foreignKey: 'id_fondoPensionFK' });
ProfesionalModel.belongsTo(CuentasBancariasModel, { foreignKey: 'id_cuentaBancariaFK' });
ProfesionalModel.belongsTo(EstructuraOrgranizacionalModel, { foreignKey: 'id_areaFK' });


export default ProfesionalModel;