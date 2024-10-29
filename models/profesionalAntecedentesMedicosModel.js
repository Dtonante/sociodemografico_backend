import { DataTypes } from "sequelize";
import db from "../database/db.js";
import ProfesionalModel from "./profesionalModel.js";
import AntecedentesMedicosModel from "./antecedentesMedicosModel.js";

const ProfesionalAntecedentesMedicosModel = db.define('tbl_profesional_antecedentes_medicos', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE'  },
    id_antecedenteMedicoFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_antecedentes_medicos', key: 'id_antecedenteMedicoPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' } 
}, {
    tableName: 'tbl_profesional_antecedentes_medicos',
    timestamps: true
});

// Importar modelos relacionados
ProfesionalAntecedentesMedicosModel.belongsTo(ProfesionalModel, { foreignKey: 'id_profesionalFK' });
ProfesionalAntecedentesMedicosModel.belongsTo(AntecedentesMedicosModel, { foreignKey: 'id_antecedenteMedicoFK' });

export default ProfesionalAntecedentesMedicosModel;