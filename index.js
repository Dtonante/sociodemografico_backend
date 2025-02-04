import './tareasProgramadas/controladorActualizarAntiguedad.js'
import express from "express";
import path from "path";
import cors from "cors";
//funcion para sincronizar los modelos
import syncDB from "./database/syncDB.js";

// Importar todos los modelos
import UsuarioModel from "./models/usuarioModel.js";
import RolModel from "./models/rolesModel.js";

// importar las rutas
//Tipo documento rutas
import tipoDocumentoRoutes from "./routes/tipoDocumentoRoutes.js";
//Eps rutas
import epsRoutes from "./routes/epsRoutes.js";
//Servicios con los que no cuentan rutas
import serviciosQueNoCuentanRoutes from "./routes/servicioQueNoCuentanRoutes.js";
//Factores de riesgo rutas
import factoresDeRiesgoRouter from "./routes/factoresDeRiesgoRoutes.js";
//Tiempo libre rutas
import tiempoLibreRoutes from "./routes/tiempoLibreRoutes.js";
//Servicios de salud adicional rutas
import servicioSaludAdicionalRoutes from "./routes/servicioSaludAdicionalRoutes.js";
//Antecedentes medicos rutas
import antecedentesMedicosRoutes from "./routes/antecedentesMedicosRoutes.js";
//Fondos de pension rutas
import fondoPensionRoutes from "./routes/fondoPensionRoutes.js";
//Estructura organizacional rutas
import estructuraOrganizacionalRoutes from "./routes/estructuraOrganizacionalRoutes.js";
//Tipos de cuentas bancarias rutas
import cuentasBancariasRoutes from "./routes/cuentasBancariasRoutes.js";
//Transporte propio rutas
import transportePropioRoutes from "./routes/transportePropioRoutes.js";
//Usuarios rutas
import usuariosRoutes from "./routes/usuariosRoutes.js";
//Profesional rutas
import profesionalRoutes from "./routes/profesionalRoutes.js";
//Profesional antecedentes medicos rutas
import profesionalAntecedentesMedicosRoutes from "./routes/profesionalAntecedentesMedicosRoutes.js";
//Profesional factores de riesgo rutas
import profesionalFactoresDeRiesgoRoutes from "./routes/profesionalFactoresDeRiesgoRoutes.js";
//Profesional servicio rutas
import profesionalServicioSaludAdicionalRoutes from "./routes/profesionalServicioSaludAdicionalRoutes.js";
//Profesional servicio que no cuentan rutas
import profesionalServiciosQueNoCuentanRoutes from "./routes/profesionalServiciosQueNoCuentanRoutes.js";
//Profesional tiempo libre rutas
import profesionalTiempoLibreRoutes from "./routes/profesionalTiempoLibreRoutes.js";
//Profesional transporte propio rutas
import profesionalTransportePropioRoutes from "./routes/profesionalTransportePropioRoutes.js";
//login rutas
import loginRoutes from "./routes/loginRoutes.js";
//certificados rutas
import certificadosRoutes from "./routes/certificadoRoutes.js";
//roles rutas
import rolesRoutes from "./routes/rolesRoutes.js";
//privilegios rutas
import privilegioRoutes from "./routes/privilegiosRoutes.js";
//roles Privilegios
import rolPrivilegioRoutes from "./routes/rolPrivilegioRoutes.js";

const app = express();

app.use(cors());


// Middleware para servir archivos estáticos (como el HTML)
// Middleware para analizar cuerpos JSON
app.use(express.json());

// Configurar Express para servir archivos estáticos desde la carpeta 'static/img'
// app.use('/static', express.static(path.join(process.cwd(), 'static/img')));

//Rutas de cada modelo
//Tipo documento
app.use("/api/tipodocumentos", tipoDocumentoRoutes);
//Eps
app.use("/api/eps", epsRoutes);
//Servicios con los que no cuentan
app.use("/api/serviciosQueNoCuentan", serviciosQueNoCuentanRoutes);
//Factores de riesgo
app.use("/api/factoresRiesgo", factoresDeRiesgoRouter);
//Tiempo libre
app.use("/api/tiempoLibre", tiempoLibreRoutes);
//Servicios de salud adicional
app.use("/api/servicioSaludAdicional", servicioSaludAdicionalRoutes);
//Antecedentes medicos
app.use("/api/antecedentesMedicos", antecedentesMedicosRoutes);
//Fondos de pension
app.use("/api/fondoPension", fondoPensionRoutes);
//Estructura organizacional
app.use("/api/estructuraOrganizacional", estructuraOrganizacionalRoutes);
//Tipos de cuentas bancarias
app.use("/app/cuentasBancarias", cuentasBancariasRoutes);
//transporte propio
app.use("/app/transportePropio", transportePropioRoutes);
//Usuarios
app.use("/app/usuarios", usuariosRoutes);
//Profesional
app.use("/api/profesional", profesionalRoutes);
//Profesional antecedente medico
app.use("/api/profesionalAntecedenteMedico", profesionalAntecedentesMedicosRoutes);
//Profesional factores de riesgo medico
app.use("/api/profesionalFactoresRiesgo", profesionalFactoresDeRiesgoRoutes);
//Profesional servicio de salud adicional
app.use("/api/profesionalServicioSaludAdicional", profesionalServicioSaludAdicionalRoutes);
//Profesional servicio que no cuentan
app.use("/api/profesionalServiciosQueNoCuentan", profesionalServiciosQueNoCuentanRoutes);
//Profesional tiempo libre
app.use("/api/profesionalTiempoLibre", profesionalTiempoLibreRoutes);
//Profesional transporte propio
app.use("/api/profesionalTransportePropio", profesionalTransportePropioRoutes);
//Login
app.use("/api/login", loginRoutes);
//Certificados
app.use("/api/certificados", certificadosRoutes);
//roles
app.use("/api/roles", rolesRoutes);
//privilegios
app.use("/api/privilegio", privilegioRoutes);
//rol provilegios
app.use("/api/rolPrivilegio", rolPrivilegioRoutes);

// Establecer las asociaciones después de haber importado todos los modelos
UsuarioModel.associate({ RolModel });
RolModel.associate({ UsuarioModel });

// Sincronizar la base de datos antes de iniciar el servidor
syncDB()
  .then(() => {
    // Inicia el servidor solo después de que la sincronización se complete
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
