import { DataTypes } from "sequelize";
import db from "../database/db";
import ProfesionalModel from "./profesionalModel";
import ServiciosQueNoCuentanModel from "./serviciosQueNoCuentanModel.js";

const ProfesionalServiciosQueNoCuentan = db.define('tbl_profesional_servicios_que_no_cuentan', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    id_servicioQueNoCuentaFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_servicios_que_no_cuentan', key: 'id_servicioQueNoCuentaPK' }, onDelete: 'CASCADE', onUpdate:'CASCADE' }
}, {
    tableName: 'tbl_profesional_servicios_que_no_cuentan',
    timestamps: true
});

export default ProfesionalServiciosQueNoCuentan;