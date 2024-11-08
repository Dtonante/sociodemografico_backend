import { Sequelize } from 'sequelize';

const db = new Sequelize('db_perfil_sociodemografico', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db;



// import { Sequelize } from 'sequelize';

// const db = new Sequelize('master', 'root', '', {
//     host: 'localhost',
//     dialect: 'mssql', // Cambiar a 'mssql' para SQL Server
//     dialectOptions: {
//         instanceName: 'SQLEXPRESS01', // Especifica el nombre de la instancia de SQL Server
//     },
//     logging: false, // Si no deseas ver las consultas en la consola
// });

// export default db;
