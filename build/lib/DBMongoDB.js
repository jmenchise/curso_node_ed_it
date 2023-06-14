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
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMongo = exports.insertOne = void 0;
const mongodb_1 = require("mongodb");
const insertOne = (collectionName, document) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'mongodb://0.0.0.0:27017';
    const client = yield mongodb_1.MongoClient.connect(url);
    console.log('Conexión con Mongodb exitosa!');
    const DB = client.db('nodebraker_10');
    const collection = DB.collection(collectionName);
    //guardo lo que retorna el insertOne en una variable para 
    //visualizar el resultado en la consola (si se pudo insertar
    // el documento o no).
    const result = yield collection.insertOne(document);
    yield client.close();
    return result;
});
exports.insertOne = insertOne;
const queryMongo = (collectionName, query) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'mongodb://0.0.0.0:27017';
    const client = yield mongodb_1.MongoClient.connect(url);
    console.log('Conexión con Mongodb exitosa!');
    const DB = client.db('nodebraker_10');
    const collection = DB.collection(collectionName);
    const result = yield collection.find(query).toArray();
    yield client.close();
    return result;
});
exports.queryMongo = queryMongo;
