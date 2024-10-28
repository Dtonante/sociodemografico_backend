import { DataTypes } from "sequelize";
import db from "../database/db";

const EpsModel = db.define('tbl_eps', {
    id_epsPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreEps: { type: DataTypes.STRING(50), allowNull: false }
}, {
    tableName: 'tbl_eps',
    timestamps: true
});

export default EpsModel;

