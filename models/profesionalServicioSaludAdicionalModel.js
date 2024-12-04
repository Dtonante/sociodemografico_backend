import { DataTypes } from "sequelize";
import db from "../database/db.js";
import ProfesionalModel from "./profesionalModel.js";
import ServicioSaludAdicionalModel from "./servicioSaludAdicionalModel.js";

const ProfesionalServicioSaludAdicionalModel = db.define('tbl_profesional_servicio_salud_adicional', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate:'CASCADE' },
    id_ServicioDeSaludAdicionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_servicios_salud_adicional', key: 'id_servicioDeSaludAdicionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
}, {
    tableName: 'tbl_profesional_servicio_salud_adicional',
    timestamps: false
});

// Importar modelos relacionados
ProfesionalServicioSaludAdicionalModel.belongsTo(ProfesionalModel, { foreignKey: 'id_profesionalFK' });
ProfesionalServicioSaludAdicionalModel.belongsTo(ServicioSaludAdicionalModel, { foreignKey: 'id_ServicioDeSaludAdicionalFK', as:'saludAdicional' });

export default ProfesionalServicioSaludAdicionalModel;