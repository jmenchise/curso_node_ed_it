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
exports.deleteOneMongo = exports.updateOneMongo = exports.findOneMongo = exports.queryMongo = exports.insertOneMongo = void 0;
const mongodb_1 = require("mongodb");
let checkStr = (str) => {
    if (str === undefined) {
        throw new Error('El parámetro "DB_MONGODB_URL" no puede ser undefined.');
    }
    ;
    return str;
};
const insertOneMongo = (collectionName, document) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
    console.log('Conexión con Mongodb exitosa!');
    const DB = client.db(process.env.DB_MONGODB_NAME);
    const collection = DB.collection(collectionName);
    //guardo lo que retorna el insertOne en una variable para 
    //visualizar el resultado en la consola (si se pudo insertar
    // el documento o no).
    const result = yield collection.insertOne(document);
    yield client.close();
    return result;
});
exports.insertOneMongo = insertOneMongo;
const queryMongo = (collectionName, query) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
    console.log('Conexión con Mongodb exitosa!');
    const DB = client.db(process.env.DB_MONGODB_NAME);
    const collection = DB.collection(collectionName);
    const result = yield collection.find(query).toArray();
    yield client.close();
    return result;
});
exports.queryMongo = queryMongo;
const findOneMongo = (collectionName, id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
    console.log('Conexión con Mongodb exitosa!');
    const DB = client.db(process.env.DB_MONGODB_NAME);
    const collection = DB.collection(collectionName);
    const result = yield collection.findOne({ id: id });
    yield client.close();
    return result;
});
exports.findOneMongo = findOneMongo;
const updateOneMongo = (collectionName, id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
    console.log('Conexión con Mongodb exitosa!');
    const DB = client.db(process.env.DB_MONGODB_NAME);
    const collection = DB.collection(collectionName);
    const result = yield collection.findOneAndUpdate({ id: id }, { $set: obj }, {
        returnDocument: 'after'
    });
    yield client.close();
    return result.value;
});
exports.updateOneMongo = updateOneMongo;
const deleteOneMongo = (collectionName, id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield mongodb_1.MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
    console.log('Conexión con Mongodb exitosa!');
    const DB = client.db(process.env.DB_MONGODB_NAME);
    const collection = DB.collection(collectionName);
    const result = yield collection.findOneAndDelete({ id: id });
    yield client.close();
    return result.value;
});
exports.deleteOneMongo = deleteOneMongo;
