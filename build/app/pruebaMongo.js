"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruebaMongo = void 0;
const DBMongoDB_1 = require("../lib/DBMongoDB");
const genUsuario_1 = __importDefault(require("../lib/genUsuario"));
let client = (0, genUsuario_1.default)();
const pruebaMongo = () => {
    (0, DBMongoDB_1.insertOneMongo)('clients', client)
        .then(r => console.log(r));
};
exports.pruebaMongo = pruebaMongo;
