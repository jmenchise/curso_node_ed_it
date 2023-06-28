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
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const DBmySql_1 = require("../../lib/DBmySql");
exports.default = express_1.default.Router()
    .get('/', (req, res) => {
})
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    console.log('user:', user);
    try {
        yield (0, DBmySql_1.validateUser)(user);
        console.log('usuario autenticado correctamente.');
        const token = `unToken__${(0, uuid_1.v4)()}`;
        yield (0, DBmySql_1.createToken)(user, token);
        yield (0, DBmySql_1.validateToken)(token);
        console.log('token:', token);
        res.status(200).send({ token });
    }
    catch (error) {
        if (error.message.includes(DBmySql_1.ERROR_TYPE.TYPE_NOT_FOUND)) {
            console.log('error message:', error.message);
            res.status(404).send({ error: error.message });
        }
        ;
        if (error.message.includes(DBmySql_1.ERROR_TYPE.TYPE_NOT_VALIDATED)) {
            console.log('error message:', error.message);
            res.status(401).send({ error: error.message });
        }
        ;
        if (error.message.includes(DBmySql_1.ERROR_TYPE.TYPE_CONNECT_ERR)) {
            console.log('error message:', error.message);
            res.status(403).send({ error: error.message });
        }
        ;
    }
    ;
}))
    .put('/', (req, res) => {
})
    .delete('/', (req, res) => {
});
