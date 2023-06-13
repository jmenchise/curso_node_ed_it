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
exports.pruebaMongo = void 0;
const mongodb_1 = require("mongodb");
const genUsuario_1 = __importDefault(require("../lib/genUsuario"));
const pruebaMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'mongodb://0.0.0.0:27017';
    const client = yield mongodb_1.MongoClient.connect(url);
    console.log('Conexión con Mongodb exitosa!');
    const DB = client.db('nodebraker_10');
    const collection = DB.collection('alumnos');
    yield collection.insertOne((0, genUsuario_1.default)());
    yield client.close();
});
exports.pruebaMongo = pruebaMongo;
