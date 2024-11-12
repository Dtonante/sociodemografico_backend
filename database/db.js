// import { Sequelize } from 'sequelize';

// const db = new Sequelize('db_perfil_sociodemografico', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
// })

// export default db;



import { Sequelize } from 'sequelize';

const db = new Sequelize('db_perfil_sociodemografico', 'sa', '35um3r*53cur3', {
    host: '10.1.1.211',
    dialect: 'mssql', 
    dialectOptions: {
        instanceName: 'SQLEXPRESS', // Especifica el nombre de la instancia de SQL Server
    },
    logging: false, 
});

export default db;
