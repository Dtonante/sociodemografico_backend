import { DataTypes } from 'sequelize';
import db from '../database/db';

const TipoDocumentoModel = db.define('tbl_tipo_documentos', {
    id_tipoDocumentoPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    var_nombreDocumento: { type: DataTypes.STRING(50), allowNull: false }
}, {
    tableName: 'tbl_tipo_documentos',
    timestamps: true
});

export default TipoDocumentoModel;