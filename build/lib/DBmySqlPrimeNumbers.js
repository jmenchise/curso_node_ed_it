"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePrimeNumber = exports.getPrimeNumbers = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const getPrimeNumbers = (onFinish) => {
    const connection = mysql2_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'cursonode'
    });
    connection.connect(err => {
        if (err) {
            onFinish(err);
            return;
        }
        connection.query('SELECT * FROM numerosprimos', (err, results, fields) => {
            if (err) {
                onFinish(err);
                return;
            }
            connection.end(err => {
                if (err) {
                    onFinish(err);
                    return;
                }
            });
            onFinish(results);
        });
    });
};
exports.getPrimeNumbers = getPrimeNumbers;
const savePrimeNumber = (number, onFinish) => {
    const connection = mysql2_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'cursonode'
    });
    connection.connect(err => {
        if (err) {
            onFinish(err);
            return;
        }
        connection.query('INSERT INTO numerosprimos (fecha, numero) VALUES (CURRENT_TIMESTAMP(), ?)', number, err => {
            if (err) {
                onFinish(err);
            }
            connection.end(err => {
                if (err) {
                    onFinish(err);
                    return;
                }
            });
        });
        onFinish(null);
    });
};
exports.savePrimeNumber = savePrimeNumber;
