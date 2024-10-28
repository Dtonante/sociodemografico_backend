import { DataTypes } from "sequelize";
import db from "../database/db";

const ProfesionalEspacioHogarModel = db.define('tbl_profesional_espacios_hogar', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    id_espacioHogarFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_espacios_hogar', key: 'id_espacioHogarPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
}, {
    tableName: 'tbl_profesional_espacios_hogar',
    timestamps: true
})

export default ProfesionalEspacioHogarModel;