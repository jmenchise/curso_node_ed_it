"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const promise_1 = __importDefault(require("mysql2/promise"));
const saveStudent = () => {
    const connection = promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'cursonode'
    });
};
let checkStr = (str) => {
    if (str === undefined) {
        throw new Error('El parámetro "PATH_OUTPUT_FILES" no puede ser undefined.');
    }
    return str;
};
exports.default = () => {
    /* Debemos definir una función "checkStr" porque "readdir" no puede recibir como parámetro
    algo de tipo undefined, y "proces.env.ETC" puede contener valores de tipo T o undefined.
    
    Esto genera que readdir tire un error y no compile.
 
    con la función checkStr nos aseguramos que el parámetro que reciba readdir va a ser
    del tipo string SI O SI; si llegase a ser undefined arroja un error.
 
    Todo esto pasa porque estamos en typescript. con javascript no tendríamos este problema
    */
    promises_1.default.readdir(checkStr(process.env.PATH_OUTPUT_FILES))
        .then((rs) => rs[0])
        .then();
};
