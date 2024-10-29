import { DataTypes } from "sequelize";
import db from "../database/db.js";

const TiempoLibreModel = db.define('tbl_tiempo_libre', {
    id_tiempoLibrePK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreOcuapacionTiempoLibre: { type: DataTypes.STRING(255), allowNull: false }
}, {
    tableName: 'tbl_tiempo_libre',
    timestamps: true
});

export default TiempoLibreModel;