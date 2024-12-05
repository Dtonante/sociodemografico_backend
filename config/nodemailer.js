import nodemailer from 'nodemailer';

// Crear un transportador de correo con la configuración SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 465,                // Puede ser 587 o 465 según el servidor SMTP
     secure: true,  // Si se usa TLS, debe ser true, quiere decir si es port: 465 es true si es port: 587 es false
    auth: {
        user: '815e86002@smtp-brevo.com', 
        pass: 'FqInK0LX29ArUcpW'
    },
    tls: {
        rejectUnauthorized: false
    },
    debug: true, // Activar registros detallados para la depuración
    connectionTimeout: 5000, // Tiempo de espera de conexión en milisegundos
    greetingTimeout: 10000,  // Tiempo de espera de saludo en milisegundos
    socketTimeout: 10000      // Tiempo de espera de socket en milisegundos
});


/**
 * Enviar un correo electrónico utilizando el transportador configurado.
 * @param {Object} mailOptions - Opciones para el correo electrónico, como 'to', 'from', 'subject', y 'text'.
 * @returns {Promise} - Una promesa que se resuelve si el correo se envía correctamente o se rechaza en caso de error.
 */
export const sendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        // Intentar enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // Log del error si ocurre un problema al enviar el correo
                console.error('Error al enviar el correo:', error);
                return reject(error);
            }
            // Log de la información del correo enviado si es exitoso
            console.log('Correo enviado:', info);
            resolve(info);
        });
    });
};




