import { DataTypes } from "sequelize";
import db from "../database/db.js";
import RolModel from "./rolesModel.js";
import PrivilegioModel from "./privilegiosModel.js";

const RolPrivilegioModel = db.define('tbl_rol_privilegios', {
    id_rolFK: { 
        type: DataTypes.INTEGER, 
        references: { model: RolModel, key: 'id_rolPK' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    id_privilegioFK: { 
        type: DataTypes.INTEGER, 
        references: { model: PrivilegioModel, key: 'id_privilegioPK' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'tbl_rol_privilegios',
    timestamps: false
});

// Definir la relación muchos a muchos
RolModel.belongsToMany(PrivilegioModel, { through: RolPrivilegioModel, foreignKey: 'id_rolFK' });
PrivilegioModel.belongsToMany(RolModel, { through: RolPrivilegioModel, foreignKey: 'id_privilegioFK' });

export default RolPrivilegioModel;
