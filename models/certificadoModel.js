import { DataTypes } from "sequelize";
import db from "../database/db.js";

const CertificadoModel = db.define('tbl_certificados', {
    id_certificadoPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_certificado: { type: DataTypes.BLOB("long"), allowNull: false }
}, {
    tableName: 'tbl_certificados',
    timestamps: false
});

export default CertificadoModel;
