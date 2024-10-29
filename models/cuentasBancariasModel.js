import { DataTypes } from "sequelize";
import db from "../database/db.js";

const CuentasBancariasModel = db.define('tbl_cuentas_bancarias', {
    id_cuentaBancariaPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreCuentaBancaria: { type: DataTypes.STRING(50), allowNull: false }
}, {
    tableName: 'tbl_cuentas_bancarias',
    timestamps: true
})

export default CuentasBancariasModel;