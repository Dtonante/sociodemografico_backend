
// import { Sequelize } from 'sequelize';

// const db = new Sequelize('db_perfil_sociodemografico', 'sa', '35um3r*53cur3', {
//     host: '10.1.1.211',
//     dialect: 'mssql', 
//     dialectOptions: {
//         instanceName: 'SQLEXPRESS', // Especifica el nombre de la instancia de SQL Server
//     },
//     logging: false, 
// });

// export default db;



import { Sequelize } from 'sequelize';

const db = new Sequelize('db_perfil_sociodemografico', 'sa', 'Esumer2024**', {
    host: '10.1.2.24',
    dialect: 'mssql',
    dialectOptions: {
        instanceName: null,
        encrypt: true,
        trustServerCertificate: true,
    },
    
    logging: false,
});

export default db;



// import { Sequelize } from 'sequelize';

// const db = new Sequelize('db_copia_data', 'sa', 'Esumer2024**', {
//     host: '10.1.2.24',
//     dialect: 'mssql',
//     dialectOptions: {
//         instanceName: null,
//         encrypt: true,
//         trustServerCertificate: true,
//     },
    
//     logging: false,
// });

// export default db;