import { DataTypes } from "sequelize";
import db from "../database/db.js";
import TipoDocumentoModel from "./tipoDocumentoModel.js";


const UsuarioModel = db.define('tbl_usuarios', {
    id_usuarioPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreCompleto: { type: DataTypes.STRING(50), allowNull: false },
    int_tipoDocumentoFK: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'tbl_tipo_documentos', key: 'id_tipoDocumentoPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    var_numeroDocumento: { type: DataTypes.STRING(50), allowNull: false },
    var_genero: { type: DataTypes.STRING(50), allowNull: false },
    var_correoElectronicoPersonal: { type: DataTypes.STRING(50), allowNull: false },
    var_correoElectronicoInstitucional: { type: DataTypes.STRING(50), allowNull: false }
}, {
    tableName: 'tbl_usuarios',
    timestamps: true
});

// Importar modelos relacionados
UsuarioModel.belongsTo(TipoDocumentoModel, { foreignKey: 'int_tipoDocumentoFK' });


export default UsuarioModel;