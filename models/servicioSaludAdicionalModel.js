import { DataTypes } from "sequelize";
import db from "../database/db.js";

const ServicioSaludAdicionalModel = db.define('tbl_servicios_salud_adicional', {
    id_servicioDeSaludAdicionalPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreServicioDeSaludAdicional: { type: DataTypes.STRING(100), allowNull: false}
}, {
    tableName: 'tbl_servicios_salud_adicional',
    timestamps: false
});



export default ServicioSaludAdicionalModel;