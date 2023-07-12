"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function decodeJWT(token) {
    return jsonwebtoken_1.default.decode(token);
}
exports.decodeJWT = decodeJWT;
;
