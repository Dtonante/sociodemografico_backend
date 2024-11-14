import { upload } from '../config/multer.js'; 
import CertificadoModel from '../models/certificadoModel.js';
import fs from 'fs';
import path from 'path';

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

// Controlador para manejar la carga del archivo
const subirCertificado = async (req, res) => {
    try {
        // Accedemos al archivo cargado desde la petición
        const { file } = req;

        // Verificamos que el archivo exista
        if (!file) {
            return res.status(400).json({ message: "No se ha cargado ningún archivo" });
        }

        // Construimos la ruta del archivo (la ruta en el disco donde se guardó)
        const filePath = path.join('uploads/certificados', file.filename);

        // Guardamos la ruta del archivo en la base de datos (en lugar del binario)
        const nuevoCertificado = await CertificadoModel.create({
            var_certificado: filePath,  // Guardamos la ruta del archivo
        });

        // Suponiendo que el servidor es accesible en localhost:3001
        const fileUrl = `http://localhost:3001/${filePath}`;  // Construimos la URL completa del archivo

        res.status(201).json({ 
            message: "Certificado cargado correctamente", 
            id: nuevoCertificado.id_certificadoPK, 
            url: fileUrl  // Incluimos la URL en la respuesta
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al cargar el certificado" });
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
