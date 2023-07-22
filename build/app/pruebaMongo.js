"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRandomClients = exports.uploadFilesMongo = exports.pruebaMongo = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const DBMongoDB_1 = require("../lib/DBMongoDB");
const genUsuario_1 = __importDefault(require("../lib/genUsuario"));
const logger_1 = __importDefault(require("../cfg/logger"));
const log = (0, logger_1.default)('prueba-mongo');
let client = (0, genUsuario_1.default)();
const pruebaMongo = () => {
    (0, DBMongoDB_1.insertOneMongo)('clients', client)
        .then(r => console.log(r));
};
exports.pruebaMongo = pruebaMongo;
let checkStr = (str) => {
    if (str === undefined) {
        throw new Error('El parámetro "PATH_OUTPUT_FILES" no puede ser undefined.');
    }
    return str;
};
const uploadFilesMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    /* Debemos definir una función "checkStr" porque "readdir" no puede recibir como parámetro
    algo de tipo undefined, y "proces.env.ETC" puede contener valores de tipo T o undefined.
    
    Esto genera que readdir tire un error y no compile.
 
    con la función checkStr nos aseguramos que el parámetro que reciba readdir va a ser
    del tipo string SI O SI; si llegase a ser undefined arroja un error.
 
    Todo esto pasa porque estamos en typescript. con javascript no tendríamos este problema
    */
    let files = yield promises_1.default.readdir(checkStr(process.env.PATH_OUTPUT_FILES));
    for (let file of files) {
        try {
            let pathFile = `${checkStr(process.env.PATH_OUTPUT_FILES)}/${file}`;
            console.log('pathFile:', pathFile);
            let fileContent = yield promises_1.default.readFile(pathFile, 'utf-8');
            let fileContentParsed = JSON.parse(fileContent);
            console.log('fileContentParsed:', fileContentParsed);
            yield (0, DBMongoDB_1.insertOneMongo)('clients', fileContentParsed);
            console.log('Archivo cargado correctamente.');
            yield promises_1.default.unlink(pathFile);
        }
        catch (error) {
            console.log(error);
        }
        ;
    }
    ;
});
exports.uploadFilesMongo = uploadFilesMongo;
const saveRandomClients = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 1; i <= 30; i++) {
        const randomClient = (0, genUsuario_1.default)();
        log.info('generando cliente aleatorio para insertar en mongo n°:' + ' ' + i);
        yield (0, DBMongoDB_1.insertOneMongo)('clients', randomClient);
        log.info(`Cliente ${i} insertado exisosamente`);
    }
    ;
});
exports.saveRandomClients = saveRandomClients;
