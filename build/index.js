"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const numerosPrimos_1 = require("./app/numerosPrimos");
const server_1 = __importDefault(require("./server"));
const httpClient_1 = __importDefault(require("./http/httpClient"));
const DBmySqlPrimeNumbers_1 = require("./lib/DBmySqlPrimeNumbers");
require("dotenv/config");
const createFiles_1 = __importDefault(require("./app/createFiles"));
const uploadFiles_1 = __importDefault(require("./app/uploadFiles"));
const pruebaMongo_1 = require("./app/pruebaMongo");
const pruebaPasswords_1 = __importDefault(require("./app/pruebaPasswords"));
const createToken_1 = require("./lib/jwt/createToken");
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
        (0, DBmySqlPrimeNumbers_1.getPrimeNumbers)(r => console.log(r));
        break;
    case 'client':
        (0, httpClient_1.default)(r => console.log(r));
        break;
    case 'upload-files':
        (0, uploadFiles_1.default)();
        break;
    case 'mongo-test':
        (0, pruebaMongo_1.pruebaMongo)();
        break;
    case 'passwords':
        (0, pruebaPasswords_1.default)();
        break;
    case 'create-jwt':
        (0, createToken_1.createJWT)();
        break;
    case 'validate-jwt':
        break;
    default:
        console.log('Por favor debe cargar un parámetro.');
        break;
}
