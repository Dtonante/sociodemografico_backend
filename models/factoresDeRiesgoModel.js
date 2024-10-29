import { DataTypes } from "sequelize";
import db from "../database/db.js";

const FactoresDeRiesgoModel = db.define('tbl_factores_riesgo', {
    id_factoresRiesgoPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreRiesgo: { type: DataTypes.STRING(255), allowNull: false }
}, {
    tableName: 'tbl_factores_riesgo',
    timestamps: true
});

export default FactoresDeRiesgoModel;