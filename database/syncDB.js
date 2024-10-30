
import db from "./db.js";
//todos los modelos para sincronizar
import TipoDocumentoModel from "../models/tipoDocumentoModel.js";
import EpsModel from "../models/epsModel.js";
import ServicioSaludAdicionalModel from "../models/servicioSaludAdicionalModel.js";
import FondoPensionModel from "../models/fondoPensionModel.js";
import CuentasBancariasModel from "../models/cuentasBancariasModel.js";
import EstructuraOrgranizacionalModel from "../models/estructuraOrganizacionalModel.js";
import AntecedentesMedicosModel from "../models/antecedentesMedicosModel.js";
import EspaciosHogarModel from "../models/espaciosHogarModel.js";
import ServiciosQueNoCuentanModel from "../models/serviciosQueNoCuentanModel.js";
import FactoresDeRiesgoModel from "../models/factoresDeRiesgoModel.js";
import TransportePropioModel from "../models/transportePropioModel.js";
import TiempoLibreModel from "../models/timpoLibreModel.js";
import UsuarioModel from "../models/usuarioModel.js";
import ProfesionalModel from "../models/profesionalModel.js"
import ProfesionalServicioSaludAdicionalModel from "../models/profesionalServicioSaludAdicionalModel.js"
import ProfesionalAntecedentesMedicosModel from "../models/profesionalAntecedentesMedicosModel.js"
import ProfesionalEspacioHogarModel from "../models/profesionalEspacioHogarModel.js";
import ProfesionalFactoresRiesgo from "../models/profesionalFactoresDeRiesgoModel.js";
import ProfesionalServiciosQueNoCuentan from "../models/profesionalServiciosQueNoCuentanModel.js";
import ProfesionalTiempoLibreModel from "../models/profesionalTiempoLibreModel.js";
import ProfesionalTransportePropio from "../models/profesionalTransportePropioModel.js";



const syncDB = async () => {
    try {
        // Sincroniza todos los modelos
        await db.sync({ force: false }); 
        console.log('Todos los modelos sincronizados con la base de datos');
    } catch (error) {
        console.error('Error al sincronizar los modelos:', error);
    }
};

export default syncDB;
