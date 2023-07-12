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
const promises_1 = __importDefault(require("fs/promises"));
const DBMongoDB_1 = require("../lib/DBMongoDB");
let checkStr = (str) => {
    if (str === undefined) {
        throw new Error('El parámetro "PATH_OUTPUT_FILES" no puede ser undefined.');
    }
    return str;
};
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    /* Debemos definir una función "checkStr" porque "readdir" no puede recibir como parámetro
    algo de tipo undefined, y "proces.env.ETC" puede contener valores de tipo T o undefined.
    
    Esto genera que readdir tire un error y no compile.
 
    con la función checkStr nos aseguramos que el parámetro que reciba readdir va a ser
    del tipo string SI O SI; si llegase a ser undefined arroja un error.
 
    Todo esto pasa porque estamos en typescript. con javascript no tendríamos este problema
    */
    let files = yield promises_1.default.readdir(checkStr(process.env.PATH_OUTPUT_FILES));
    console.log('files:', files);
    for (let file of files) {
        let pathFile = `${checkStr(process.env.PATH_OUTPUT_FILES)}/${file}`;
        console.log('pathFile:', pathFile);
        let fileContent = yield promises_1.default.readFile(pathFile, 'utf-8');
        let fileContentParsed = JSON.parse(fileContent);
        console.log('fileContentParse:', fileContentParsed);
        (0, DBMongoDB_1.insertOneMongo)('clients', fileContentParsed);
        yield promises_1.default.unlink(pathFile);
    }
});
