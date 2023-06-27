"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DBmySql_1 = require("../../lib/DBmySql");
exports.default = express_1.default.Router()
    .get('/', (req, res) => {
})
    .post('/', (req, res) => {
    const user = req.body;
    console.log('user:', user);
    (0, DBmySql_1.validateUser)(user);
    // res.status(200).send({token: uuid()});
})
    .put('/', (req, res) => {
})
    .delete('/', (req, res) => {
});
