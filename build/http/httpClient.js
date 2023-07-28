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
const logger_1 = __importDefault(require("../cfg/logger"));
const genUsuario_1 = __importDefault(require("../lib/genUsuario"));
const logger = (0, logger_1.default)('http-client.ts');
const urlConnect = 'http://localhost:8080/api/client';
const httpPost = (url, obj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fetch(url, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
    }
    catch (error) {
        logger.error(`Error al intentar conectar con el servidor. Detalle: ${error.message}`);
    }
});
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 1; i < 100; i++) {
        logger.info(`creando cliente N°: ${i}`);
        const newClient = (0, genUsuario_1.default)();
        yield httpPost(urlConnect, newClient);
        logger.info(`cliente N°: ${i} creado correctamente.`);
    }
    ;
});
