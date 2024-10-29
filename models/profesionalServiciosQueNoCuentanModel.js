import { DataTypes } from "sequelize";
import db from "../database/db.js";
import ProfesionalModel from "./profesionalModel.js";
import ServicioSaludAdicionalModel from "./servicioSaludAdicionalModel.js";


const ProfesionalServiciosQueNoCuentan = db.define('tbl_profesional_servicios_que_no_cuentan', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    id_servicioQueNoCuentaFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_servicios_que_no_cuentan', key: 'id_servicioQueNoCuentaPK' }, onDelete: 'CASCADE', onUpdate:'CASCADE' }
}, {
    tableName: 'tbl_profesional_servicios_que_no_cuentan',
    timestamps: true
});

// Importar modelos relacionados
ProfesionalServiciosQueNoCuentan.belongsTo(ProfesionalModel, { foreignKey: 'id_profesionalFK' });
ProfesionalServiciosQueNoCuentan.belongsTo(ServicioSaludAdicionalModel, { foreignKey: 'id_servicioQueNoCuentaFK' });

export default ProfesionalServiciosQueNoCuentan;