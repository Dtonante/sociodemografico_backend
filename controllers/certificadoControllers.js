// import { upload } from '../config/multer.js'; 
// import CertificadoModel from '../models/certificadoModel.js';
// import fs from 'fs';
// import path from 'path';
// import FTP from 'basic-ftp';
// const subirCertificado = async (req, res) => {
//     const ftpClient = new FTP.Client(); // Crear una instancia de cliente FTP
//     try {
//         const { file } = req;

//         if (!file) {
//             return res.status(400).json({ message: "No se ha cargado ningún archivo" });
//         }

//         // Crear un nombre único para el archivo temporal
//         const tempFileName = `${Date.now()}-${file.originalname}`;
//         const tempFilePath = path.join('C:/tmp', tempFileName);
        

//         // Escribir el archivo desde el buffer a un archivo temporal
//         fs.writeFileSync(tempFilePath, file.buffer);

//         // Conexión al servidor FTP
//         await ftpClient.access({
//             host: '10.1.2.24',
//             port: 16450, 
//             user: 'administrador',
//             password: 'nu3v05.n3g0c105*2021',
//             secure: false, // Cambia a true si necesitas conexión FTP segura
//         });

//         console.log("Conexión exitosa con el servidor FTP de Anubis.");

//         // Ruta remota en el servidor FTP
//         const remotePath = `/DATOS_ANUBIS/Documentos_PerfilSocioDemo/${tempFileName}`;
//         await ftpClient.uploadFrom(tempFilePath, remotePath);

//         console.log("Archivo cargado exitosamente en Anubis.");
//         ftpClient.close();

//         // Eliminar el archivo temporal después de subirlo
//         fs.unlinkSync(tempFilePath);

//         res.status(201).json({
//             message: "Certificado cargado correctamente en Anubis",
//             fileUrl: `ftp://10.1.2.24${remotePath}`,
//         });
//     } catch (error) {
//         console.error("Error durante la operación con Anubis:", error);
//         ftpClient.close();

//         res.status(500).json({
//             message: "Error al cargar el certificado en Anubis",
//             error: error.message,
//         });
//     }
// };


import { upload } from '../config/multer.js'; 
import CertificadoModel from '../models/certificadoModel.js';
import fs from 'fs';
import path from 'path';
import FTP from 'basic-ftp';
import crypto from 'crypto';

// Clave secreta para la encriptación (debería ser guardada de forma segura, no en el código)
const SECRET_KEY = 'tu_clave_secreta_de_256_bits';
const IV_LENGTH = 16; // La longitud del vector de inicialización para AES

const encryptFile = (buffer) => {
    // Generar un vector de inicialización aleatorio
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);

    // Encriptar el archivo
    const encryptedBuffer = Buffer.concat([cipher.update(buffer), cipher.final()]);

    // Retornar el buffer cifrado junto con el IV para poder desencriptar luego
    return { encryptedBuffer, iv };
};

const subirCertificado = async (req, res) => {
    const ftpClient = new FTP.Client(); // Crear una instancia de cliente FTP
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json({ message: "No se ha cargado ningún archivo" });
        }

        // Encriptar el archivo antes de guardarlo
        const { encryptedBuffer, iv } = encryptFile(file.buffer);

        // Crear un nombre único para el archivo temporal
        const tempFileName = `${Date.now()}-${file.originalname}.enc`; // Añadir extensión .enc para los archivos encriptados
        const tempFilePath = path.join('C:/tmp', tempFileName);

        // Escribir el archivo cifrado en un archivo temporal
        fs.writeFileSync(tempFilePath, encryptedBuffer);

        // Conexión al servidor FTP
        await ftpClient.access({
            host: '10.1.2.24',
            port: 16450, 
            user: 'administrador',
            password: 'nu3v05.n3g0c105*2021',
            secure: false, // Cambia a true si necesitas conexión FTP segura
        });

        console.log("Conexión exitosa con el servidor FTP de Anubis.");

        // Ruta remota en el servidor FTP
        const remotePath = `/DATOS_ANUBIS/Documentos_PerfilSocioDemo/${tempFileName}`;
        await ftpClient.uploadFrom(tempFilePath, remotePath);

        console.log("Archivo cargado exitosamente en Anubis.");
        ftpClient.close();

        // Eliminar el archivo temporal después de subirlo
        fs.unlinkSync(tempFilePath);

        res.status(201).json({
            message: "Certificado cargado correctamente en Anubis",
            fileUrl: `ftp://10.1.2.24${remotePath}`,
        });
    } catch (error) {
        console.error("Error durante la operación con Anubis:", error);
        ftpClient.close();

        res.status(500).json({
            message: "Error al cargar el certificado en Anubis",
            error: error.message,
        });
    }
};




// Controlador para obtener todos los certificados
const obtenerCertificados = async (req, res) => {
    try {
        // Buscamos todos los certificados en la base de datos
        const certificados = await CertificadoModel.findAll();

        // Si no se encuentran certificados, retornamos un mensaje vacío
        if (certificados.length === 0) {
            return res.status(404).json({ message: "No se encontraron certificados" });
        }

        res.status(200).json(certificados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los certificados" });
    }
};

// Controlador para obtener un certificado por id
const obtenerCertificadoPorId = async (req, res) => {
    try {
        // Obtenemos el id del certificado desde los parámetros de la URL
        const { id } = req.params;

        // Buscamos el certificado por su id
        const certificado = await CertificadoModel.findOne({
            where: { id_certificadoPK: id }
        });

        // Si no se encuentra el certificado, retornamos un mensaje de error
        if (!certificado) {
            return res.status(404).json({ message: "Certificado no encontrado" });
        }

        res.status(200).json(certificado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el certificado" });
    }
};

// // Controlador para manejar la carga del archivo
// const subirCertificado = async (req, res) => {
//     try {
//         // Accedemos al archivo cargado desde la petición
//         const { file } = req;

//         // Verificamos que el archivo exista
//         if (!file) {
//             return res.status(400).json({ message: "No se ha cargado ningún archivo" });
//         }

//         // Construimos la ruta del archivo (la ruta en el disco donde se guardó)
//         const filePath = path.join('uploads/certificados', file.filename);

//         // Guardamos la ruta del archivo en la base de datos (en lugar del binario)
//         const nuevoCertificado = await CertificadoModel.create({
//             var_certificado: filePath,  // Guardamos la ruta del archivo
//         });

//         // Suponiendo que el servidor es accesible en localhost:3001
//         const fileUrl = `http://localhost:3001/${filePath}`;  // Construimos la URL completa del archivo

//         res.status(201).json({ 
//             message: "Certificado cargado correctamente", 
//             id: nuevoCertificado.id_certificadoPK, 
//             url: fileUrl  // Incluimos la URL en la respuesta
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error al cargar el certificado" });
//     }
// };

// Controlador para manejar la carga del archivo
// const subirCertificado = async (req, res) => {
//     try {
//         // Accedemos al archivo cargado desde la petición
//         const { file } = req;

//         // Verificamos que el archivo exista
//         if (!file) {
//             return res.status(400).json({ message: "No se ha cargado ningún archivo" });
//         }

//         // Conectamos a Anubis por FTP
//         const client = new FTPClient();
//         await client.access({
//             host: '10.1.2.24',  // IP de Anubis
//             user: 'administrador',  // Usuario de Anubis
//             password: 'nu3v05.n3g0c105*2021',  // Contraseña de Anubis
//             secure: false  // Usar conexión no segura
//         });

//         // Subimos el archivo a la carpeta en Anubis (usando el nombre original del archivo)
//         await client.uploadFrom(Buffer.from(file.buffer), `Datos_PerfilSocioDemo/${file.originalname}`);

//         // Cerramos la conexión FTP
//         await client.close();

//         // Respondemos con el éxito
//         res.status(200).json({
//             message: "Certificado cargado exitosamente en Anubis",
//             fileName: file.originalname  // Devolvemos el nombre del archivo como referencia
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error al cargar el certificado en Anubis" });
//     }
// };




// Controlador para descargar el archivo
const descargarCertificado = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el certificado por su ID en la base de datos
        const certificado = await CertificadoModel.findOne({
            where: { id_certificadoPK: id }
        });

        // Si no se encuentra el certificado, retornamos un mensaje de error
        if (!certificado) {
            return res.status(404).json({ message: "Certificado no encontrado" });
        }

        // Obtener la ruta del archivo desde la base de datos
        const filePath = certificado.var_certificado;

        // Verificar si el archivo existe en el disco
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "Archivo no encontrado" });
        }

        // Establecer los encabezados de la respuesta para descargar el archivo
        res.setHeader('Content-Type', 'application/pdf');  // Cambiar según el tipo de archivo
        res.setHeader('Content-Disposition', 'attachment; filename=certificado.pdf'); // Nombre del archivo

        // Enviar el archivo al cliente
        res.sendFile(path.resolve(filePath));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al descargar el certificado" });
    }
};

export { upload, subirCertificado, obtenerCertificadoPorId, obtenerCertificados, descargarCertificado };
