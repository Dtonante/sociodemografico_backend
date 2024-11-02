import { DataTypes } from "sequelize";
import db from "../database/db.js";

const RolModel = db.define('tbl_roles', {
    id_rolPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreRol: { type: DataTypes.STRING(50), allowNull: false, unique: true }
}, {
    tableName: 'tbl_roles',
    timestamps: true
});

export default RolModel;
