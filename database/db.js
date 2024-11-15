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



// import { Sequelize } from 'sequelize';

// const db = new Sequelize('db_perfil_sociodemografico', 'sa', 'Esumer2024**', {
//     host: '10.1.2.24',
//     dialect: 'mssql',
//     dialectOptions: {
//         instanceName: null,
//         encrypt: true,
//         trustServerCertificate: true,
//     },
//     options: {
//         encrypt: true,  // Si es necesario
//         trustServerCertificate: true, // Evita advertencias de certificado
//         connectionTimeout: 30000,  // Tiempo de espera para la conexión (30 segundos)
//         requestTimeout: 30000     // Tiempo de espera para la consulta (30 segundos)
//     },
//     logging: (msg) => console.log(msg), // Esto muestra el registro de Sequelize
// });

// export default db;



