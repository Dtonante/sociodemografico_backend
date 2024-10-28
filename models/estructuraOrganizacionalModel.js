import { DataTypes } from "sequelize";
import db from "../database/db";

const EstructuraOrgranizacionalModel = db.define('tbl_estructura_organizacion', {
    id_arePk: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreArea: { type: DataTypes.STRING(50), allowNull: false}
}, {
    tableName: 'tbl_estructura_organizacion',
    timestamps: true
})

export default EstructuraOrgranizacionalModel;