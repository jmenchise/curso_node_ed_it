"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = void 0;
const commons_1 = require("./commons");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createJWT(userId, userName) {
    const payload = {
        sub: userId,
        name: userName,
        iat: (0, commons_1.time)(),
        exp: (0, commons_1.time)() + 40
    };
    const token = jsonwebtoken_1.default.sign(JSON.stringify(payload), commons_1.SECRET);
    console.log('token:', token);
    return token;
}
exports.createJWT = createJWT;
