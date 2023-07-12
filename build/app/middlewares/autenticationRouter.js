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
const validateJWT_1 = require("../../lib/jwt/validateJWT");
const jsonwebtoken_1 = require("jsonwebtoken");
const DBmySql_1 = require("../../lib/DBmySql");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Se chequea si viene un token para autorizar o no al usuario');
    try {
        const xToken = req.headers['x-token'];
        yield (0, validateJWT_1.validateJWT)(xToken);
        next();
        return;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            console.log('Token expirado. Detalle:', error.message);
            res.status(401).send({ error: error.message });
            return;
        }
        ;
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.log('Token incorrecto. Detalle:', error.message);
            res.status(401).send({ error: error.message });
            return;
        }
        ;
        if (error.message.includes(DBmySql_1.ERROR_TYPE_MYSQL.TYPE_NOT_FOUND)) {
            res.status(404).send({ error: error.message });
            return;
        }
        ;
    }
    ;
});
