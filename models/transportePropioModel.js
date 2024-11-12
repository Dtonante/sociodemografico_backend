import { DataTypes } from "sequelize";
import db from "../database/db.js";

const TransportePropioModel = db.define('tbl_transporte_propio', {
    id_transportePropioPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreTransporte: { type: DataTypes.STRING(255), allowNull: false },
    var_numeroPlaca: { type: DataTypes.STRING(20), defaultValue: 'No Aplica' }
}, {
    tableName: 'tbl_transporte_propio',
    timestamps: false
});

export default TransportePropioModel;
