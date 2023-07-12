"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const decodeJWT_1 = require("../../lib/jwt/decodeJWT");
exports.default = express_1.default.Router()
    .get('/', (req, res) => {
    const xToken = req.headers['x-token'];
    const tokenObj = (0, decodeJWT_1.decodeJWT)(xToken);
    res.status(200).send(tokenObj);
})
    .post('/', (req, res) => {
})
    .put('/', (req, res) => {
})
    .delete('/', (req, res) => {
});
