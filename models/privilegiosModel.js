import { DataTypes } from "sequelize";
import db from "../database/db.js";

const PrivilegioModel = db.define('tbl_privilegios', {
    id_privilegioPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombrePrivilegio: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    var_descripcion: { type: DataTypes.STRING(100), allowNull: true }
}, {
    tableName: 'tbl_privilegios',
    timestamps: true
});

export default PrivilegioModel;
