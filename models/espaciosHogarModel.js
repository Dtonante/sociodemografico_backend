import { DataTypes } from "sequelize";
import db from "../database/db";

const EspaciosHogarModel = db.define('tbl_espacios_hogar', {
    id_espacioHogarPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreEspacio: { type: DataTypes.STRING(20), allowNull: false },
    var_cantidad: { type: DataTypes.STRING(3), allowNull: false }
}, {
    tableName: 'tbl_espacios_hogar',
    timestamps: true
})

export default EspaciosHogarModel;