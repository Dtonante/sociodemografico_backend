import { DataTypes } from "sequelize";
import db from "../database/db";

const AntecedentesMedicosModel = db.define('tbl_antecedentes_medicos', {
    id_antecedenteMedicoPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreAntecedenteMedico: { type: DataTypes.STRING(255), allowNull: false }
}, {
    tableName: 'tbl_antecedentes_medicos',
    timestamps: true
})

export default AntecedentesMedicosModel;