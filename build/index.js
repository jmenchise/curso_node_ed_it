"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const numerosPrimos_1 = require("./app/numerosPrimos");
const server_1 = __importDefault(require("./server"));
const httpClient_1 = __importDefault(require("./http/httpClient"));
const DBmySql_1 = require("./lib/DBmySql");
require("dotenv/config");
const createFiles_1 = __importDefault(require("./app/createFiles"));
const getFiles_1 = __importDefault(require("./app/getFiles"));
switch (process.argv[2]) {
    case 'numeros-primos':
        (0, numerosPrimos_1.recursiveFindPrimeNumbers)();
        break;
    case 'create-files':
        (0, createFiles_1.default)();
        break;
    case 'server':
        (0, server_1.default)();
        break;
    case 'test':
        (0, DBmySql_1.getPrimeNumbers)(r => console.log(r));
        break;
    case 'client':
        (0, httpClient_1.default)(r => console.log(r));
        break;
    case 'get-files':
        (0, getFiles_1.default)();
        break;
    default:
        console.log('Por favor debe cargar un parámetro.');
        break;
}
