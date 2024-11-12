import { DataTypes } from "sequelize";
import db from "../database/db.js";
import ProfesionalModel from "./profesionalModel.js";
import TransportePropioModel from "./transportePropioModel.js";

const ProfesionalTransportePropio = db.define('tbl_Profesional_transporte_propio', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    id_transportePropioFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_transporte_propio', key: 'id_transportePropioPK' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    var_numeroPlaca: { type: DataTypes.STRING(20), defaultValue: 'No Aplica' }
}, {
    tableName: 'tbl_Profesional_transporte_propio',
    timestamps: false
});

// Importar modelos relacionados
ProfesionalTransportePropio.belongsTo(ProfesionalModel, { foreignKey: 'id_profesionalFK' });
ProfesionalTransportePropio.belongsTo(TransportePropioModel, { foreignKey: 'id_transportePropioFK' });


export default ProfesionalTransportePropio;