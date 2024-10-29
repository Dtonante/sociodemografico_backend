import { DataTypes } from "sequelize";
import db from "../database/db.js";
import ProfesionalModel from "./profesionalModel";
import EspaciosHogarModel from "./espaciosHogarModel";

const ProfesionalEspacioHogarModel = db.define('tbl_profesional_espacios_hogar', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    id_espacioHogarFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_espacios_hogar', key: 'id_espacioHogarPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    var_cantidad: { type: DataTypes.STRING(3), defaultValue: '0' }
}, {
    tableName: 'tbl_profesional_espacios_hogar',
    timestamps: true
});

// Establecer asociaciones
ProfesionalModel.belongsToMany(EspaciosHogarModel, { through: ProfesionalEspacioHogarModel, foreignKey: 'id_profesionalFK' });
EspaciosHogarModel.belongsToMany(ProfesionalModel, { through: ProfesionalEspacioHogarModel, foreignKey: 'id_espacioHogarFK' });

export default ProfesionalEspacioHogarModel;