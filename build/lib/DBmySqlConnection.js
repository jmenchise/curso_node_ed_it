"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
exports.default = () => {
    return promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'cursonode'
    });
};
