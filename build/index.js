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
const createJWT_1 = require("./lib/jwt/createJWT");
const validateJWT_1 = require("./lib/jwt/validateJWT");
const decodeJWT_1 = require("./lib/jwt/decodeJWT");
const testServer_1 = __importDefault(require("./app/testServer"));
const childProcess_1 = require("./app/childProcess");
const loggerTest_1 = __importDefault(require("./app/loggerTest"));
const producer_1 = require("./kafka/producer");
const consumer_1 = require("./kafka/consumer");
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
        (0, httpClient_1.default)();
        break;
    case 'upload-files':
        (0, uploadFiles_1.default)();
        break;
    case 'upload-files-mongo':
        (0, pruebaMongo_1.uploadFilesMongo)();
        break;
    case 'mongo-test':
        (0, pruebaMongo_1.pruebaMongo)();
        break;
    case 'passwords':
        (0, pruebaPasswords_1.default)();
        break;
    case 'create-jwt':
        (0, createJWT_1.createJWT)('35205354', 'Joan');
        break;
    case 'validate-jwt':
        (0, validateJWT_1.validateJWT)(process.argv[3]);
        break;
    case 'read-jwt':
        (0, decodeJWT_1.decodeJWT)(process.argv[3]);
        break;
    case 'test-server':
        (0, testServer_1.default)(process.argv[3]);
        break;
    case 'child-process':
        (0, childProcess_1.execChildProcess)();
        break;
    case 'logger-test':
        (0, loggerTest_1.default)();
        break;
    case 'save-clients-mongo':
        (0, pruebaMongo_1.saveRandomClients)();
        break;
    case 'kafka-numbers-producer':
        (0, producer_1.numbersProducer)();
        break;
    case 'kafka-consumer':
        (0, consumer_1.initConsumer)();
        break;
    default:
        console.log('Por favor debe cargar un parámetro.');
        break;
}
