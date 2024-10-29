import { DataTypes } from "sequelize";
import db from "../database/db.js";
import ProfesionalModel from "./profesionalModel.js";
import TiempoLibreModel from "./timpoLibreModel.js";

const ProfesionalTiempoLibreModel = db.define('tbl_profesional_tiempo_libre', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    id_tiempoLibreFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_tiempo_libre', key: 'id_tiempoLibrePK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
}, {
    tableName: 'tbl_profesional_tiempo_libre',
    timestamps: true
});

// Establecer asociaciones
ProfesionalModel.belongsToMany(TiempoLibreModel, { through: ProfesionalTiempoLibreModel, foreignKey: 'id_profesionalFK' });
TiempoLibreModel.belongsToMany(ProfesionalModel, { through: ProfesionalTiempoLibreModel, foreignKey: 'id_tiempoLibreFK' });

export default ProfesionalTiempoLibreModel;