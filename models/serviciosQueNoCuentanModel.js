import { DataTypes } from "sequelize";
import db from "../database/db.js";

const ServiciosQueNoCuentanModel = db.define('tbl_servicios_que_no_cuentan', {
    id_servicioQueNoCuentaPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreServicioQueNoCuenta: { type: DataTypes.STRING(255), allowNull: false }
}, {
    tableName: 'tbl_servicios_que_no_cuentan',
    timestamps: false
});

export default ServiciosQueNoCuentanModel;