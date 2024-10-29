import { DataTypes } from "sequelize";
import db from "../database/db.js";
import ProfesionalModel from "./profesionalModel.js";
import FactoresDeRiesgoModel from "./factoresDeRiesgoModel.js";

const ProfesionalFactoresRiesgo = db.define('tbl_profesional_factores_riesgo', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    id_factoresRiesgoFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_factores_riesgo', key: 'id_factoresRiesgoPK' } }
}, {
    tableName: 'tbl_profesional_factores_riesgo',
    timestamps: true
});

// Importar modelos relacionados
ProfesionalFactoresRiesgo.belongsTo(ProfesionalModel, { foreignKey: 'id_profesionalFK' });
ProfesionalFactoresRiesgo.belongsTo(FactoresDeRiesgoModel, { foreignKey: 'id_factoresRiesgoFK' });



export default ProfesionalFactoresRiesgo;