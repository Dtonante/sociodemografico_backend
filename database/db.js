import { Sequelize } from 'sequelize';

const db = new Sequelize('db_perfil_sociodemografico', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db;