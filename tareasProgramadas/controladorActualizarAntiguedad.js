import cron from 'node-cron';
import { actualizarAntiguedadProfesionales } from '../controllers/profesionalControllers.js'; // Ajusta la ruta según tu estructura

// Programar la tarea para que se ejecute todos los días a las 00:00 (medianoche)
cron.schedule('0 1 * * *', async () => {
    console.log('Ejecutando tarea programada: Actualización de antigüedad de profesionales...');
    try {
        // Llamar al controlador que actualiza la antigüedad
        await actualizarAntiguedadProfesionales();
        console.log('Antigüedad de los profesionales actualizada correctamente.');
    } catch (error) {
        console.error('Error al ejecutar la tarea programada:', error);
    }
});