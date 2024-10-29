import { DataTypes } from "sequelize";
import db from "../database/db.js";
import ProfesionalModel from "./profesionalModel.js";
import ServicioSaludAdicionalModel from "./servicioSaludAdicionalModel.js";

const ProfesionalServicioSaludAdicionalModel = db.define('tbl_profesional_servicio_salud_adicional', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesionales', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate:'CASCADE' },
    id_ServicioDeSaludAdicionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_servicios_salud_adicional', key: 'id_ServicioDeSaludAdicionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
}, {
    tableName: 'tbl_profesional_servicio_salud_adicional',
    timestamps: true
});

export default ProfesionalServicioSaludAdicionalModel;