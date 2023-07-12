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
const DBmySql_1 = require("../../lib/DBmySql");
const createJWT_1 = require("../../lib/jwt/createJWT");
exports.default = express_1.default.Router()
    .get('/', (req, res) => {
})
    .post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    console.log('user:', user);
    try {
        const userFoundId = yield (0, DBmySql_1.validateUser)(user);
        const token = (0, createJWT_1.createJWT)(userFoundId, user.userName);
        yield (0, DBmySql_1.saveToken)(userFoundId, token);
        res.status(200).send({ token });
    }
    catch (error) {
        if (error.message.includes(DBmySql_1.ERROR_TYPE_MYSQL.TYPE_NOT_FOUND)) {
            res.status(404).send({ error: error.message });
        }
        ;
        if (error.message.includes(DBmySql_1.ERROR_TYPE_MYSQL.TYPE_NOT_VALIDATED)) {
            res.status(401).send({ error: error.message });
        }
        ;
        if (error.message.includes(DBmySql_1.ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR)) {
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
