import { DataTypes } from "sequelize";
import db from "../database/db.js";

const FondoPensionModel = db.define('tbl_fondo_pension', {
    id_fondoPensionPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreFondoPension: { type: DataTypes.STRING(50), allowNull: false }
}, {
    tableName: 'tbl_fondo_pension',
    timestamps: true
});

export default FondoPensionModel;