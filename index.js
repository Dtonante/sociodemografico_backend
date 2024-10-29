import express from 'express';
import path from 'path';
import cors from 'cors';
//funcion para sincronizar los modelos
import syncDB from './database/syncDB.js';


const app = express();

app.use(cors());

// Middleware para servir archivos estáticos (como el HTML)
app.use(express.static(path.join(process.cwd()))); 

// Middleware para analizar cuerpos JSON
app.use(express.json()); 



// Sincronizar la base de datos antes de iniciar el servidor
syncDB().then(() => {
    // Inicia el servidor solo después de que la sincronización se complete
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});