// import { DataTypes } from "sequelize";
// import db from "../database/db.js";
// import UsuarioModel from "./usuarioModel.js";

// const RolModel = db.define('tbl_roles', {
//     id_rolPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     var_nombreRol: { type: DataTypes.STRING(50), allowNull: false, unique: true }
// }, {
//     tableName: 'tbl_roles',
//     timestamps: false
// });


// // Relación: un Rol puede tener muchos usuarios
// RolModel.hasMany(UsuarioModel, { foreignKey: 'id_rolPK', as: 'usuarios' });
// export default RolModel;


import { DataTypes } from "sequelize";
import db from "../database/db.js";

const RolModel = db.define('tbl_roles', {
    id_rolPK: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    var_nombreRol: { type: DataTypes.STRING(50), allowNull: false }
}, {
    tableName: 'tbl_roles',
    timestamps: false
});

// Definir asociaciones aquí
RolModel.associate = (models) => {
    // Relación con UsuarioModel
    RolModel.hasMany(models.UsuarioModel, { foreignKey: 'id_rolFK', as: 'usuarios' });
};

export default RolModel;
