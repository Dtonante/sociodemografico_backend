import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const TipoDocumentoModel = db.define('tbl_tipo_documentos', {
    id_tipoDocumentoPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    var_nombreDocumento: { type: DataTypes.STRING(100), allowNull: false }
}, {
    tableName: 'tbl_tipo_documentos',
    timestamps: false
});

export default TipoDocumentoModel;