// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Configuración de Multer para almacenar archivos en disco
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = 'uploads/certificados';

//         // Verificar si la carpeta existe, si no, crearla
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }

//         // Establecer la ruta de destino donde se guardarán los archivos
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         // Usamos un nombre único para el archivo (puedes añadir el timestamp para evitar duplicados)
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// // Inicializamos Multer con la configuración de almacenamiento
// const upload = multer({ 
//     storage: storage,
//     // Validación de tamaño máximo del archivo (por ejemplo, 5MB)
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
//     // Validación de tipo de archivo (solo imágenes o PDFs por ejemplo)
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /pdf/;
//         const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = fileTypes.test(file.mimetype);

//         if (extname && mimetype) {
//             return cb(null, true);
//         } else {
//             return cb(new Error('Archivo no permitido. Solo se permiten PDFs'));
//         }
//     }
// });

// export { upload };

import path from 'path';
import multer from 'multer';

// Configuración de Multer para almacenar archivos en memoria
const storage = multer.memoryStorage();

// Inicializamos Multer con la configuración de almacenamiento
const upload = multer({ 
    storage: storage,
    // Validación de tamaño máximo del archivo (por ejemplo, 5MB)
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    // Validación de tipo de archivo (solo PDF)
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            return cb(new Error('Archivo no permitido. Solo se permiten PDFs'));
        }
    }
});

export { upload };
