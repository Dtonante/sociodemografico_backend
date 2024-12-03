import { upload } from '../config/multer.js'; 
import CertificadoModel from '../models/certificadoModel.js';
import fs from 'fs';
import path from 'path';
import FTP from 'basic-ftp';




const subirCertificado = async (req, res) => {
    const ftpClient = new FTP.Client(); // Crear una instancia de cliente FTP
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json({ message: "No se ha cargado ningún archivo" });
        }

        // Crear un nombre único para el archivo en el servidor FTP
        const tempFileName = `${Date.now()}-${file.originalname}`;
        
        // Conexión al servidor FTP
        await ftpClient.access({
            host: '10.1.2.24',
            port: 21,
            user: 'FTPESUMER',
            password: '35um3r@dm1n',
            secure: false, // Cambia a true si necesitas conexión FTP segura
        });

        console.log("Conexión exitosa con el servidor FTP de Anubis.");

        // Ruta remota en el servidor FTP
        const remotePath = `/${tempFileName}`;

        // Subir el archivo directamente desde el buffer al servidor FTP
        await ftpClient.uploadFrom(file.buffer, remotePath);

        console.log("Archivo cargado exitosamente en Anubis.");
        ftpClient.close();

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
