"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../cfg/logger"));
exports.default = () => {
    const log = (0, logger_1.default)('test');
    console.log('Testing...');
    console.log('log:', log);
    log.trace('Este es el trace, solo para ambientes locales (?)');
    log.debug('Este se puede utilizar en ambientes de prueba, ademas del local (?)');
    log.info('Este puede ir en producción, un tiempo (?)');
    log.warn('Este SI tiene que ir en producción.');
    log.error('SI O SI EN PRODUCCIÓN!');
    log.fatal('NUNCA LO USÉ (???????????????)');
    //basicamente lo que hacemos es un console log personalizado. trace es el nivel mas bajo de todos, el que levanta
    //todo. ese valor viene del archivo de configuración del  logger que creamos con createLog. 
    //creando un logger lo que hago es reemplazar el console.log en el archivo que lo use, dandome mayor control
    //sobre los errores y sobre toda la información que quiero registrar. Todos estos mensajes también se guardan
    //en un archivo externo; a modo de registro.
};
