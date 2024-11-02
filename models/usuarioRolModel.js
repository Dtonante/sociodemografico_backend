// modelo de usuario-rol
import { DataTypes } from "sequelize";
import db from "../database/db.js";
import UsuarioModel from "./usuarioModel.js";
import RolModel from "./rolesModel.js";

const UsuarioRolModel = db.define('tbl_usuario_roles', {
    id_usuarioFK: { 
        type: DataTypes.INTEGER, 
        references: { model: UsuarioModel, key: 'id_usuarioPK' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    id_rolFK: { 
        type: DataTypes.INTEGER, 
        references: { model: RolModel, key: 'id_rolPK' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'tbl_usuario_roles',
    timestamps: false
});

// Definir la relación muchos a muchos
UsuarioModel.belongsToMany(RolModel, { through: UsuarioRolModel, foreignKey: 'id_usuarioFK' });
RolModel.belongsToMany(UsuarioModel, { through: UsuarioRolModel, foreignKey: 'id_rolFK' });

export default UsuarioRolModel;
