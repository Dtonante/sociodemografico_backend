import { DataTypes } from "sequelize";
import db from "../database/db.js";
import ProfesionalModel from "./profesionalModel.js";
import TransportePropioModel from "./transportePropioModel.js";

const ProfesionalTransportePropio = db.define('tbl_Profesional_transporte_propio', {
    id_profesionalFK: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_profesional', key: 'id_profesionalPK' }, onDelete: 'CASCADA', onUpdate: 'CASCADE' },
    id_transportePropio: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'tbl_transporte_propio', key: 'id_transportePropioPK' }, onDelete: 'CASCADA', onUpdate: 'CASCADE' },
    var_numeroPlaca: { type: DataTypes.STRING(20), defaultValue: 'No Aplica' }
}, {
    tableName: 'tbl_Profesional_transporte_propio',
    timestamps: true
});

// Establecer asociaciones
ProfesionalModel.belongsToMany(TransportePropioModel, { through: ProfesionalTransportePropio, foreignKey: 'id_profesionalFK' });
TransportePropioModel.belongsToMany(ProfesionalModel, { through: ProfesionalTransportePropio, foreignKey: 'id_transportePropio' });

export default ProfesionalTransportePropio;