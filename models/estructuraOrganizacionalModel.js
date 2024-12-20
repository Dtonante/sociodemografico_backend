import { DataTypes } from "sequelize";
import db from "../database/db.js";

const EstructuraOrgranizacionalModel = db.define('tbl_estructura_organizacion', {
    id_areaPk: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreArea: { type: DataTypes.STRING(100), allowNull: false}
}, {
    tableName: 'tbl_estructura_organizacion',
    timestamps: false
})

export default EstructuraOrgranizacionalModel;