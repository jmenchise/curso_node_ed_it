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
exports.deleteClient = exports.savePrimeNumber = exports.getPrimeNumbers = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const promise_1 = __importDefault(require("mysql2/promise"));
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
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let tmplSQL = `DELETE FROM clients WHERE id = '${id}'`;
    const connection = yield promise_1.default.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'cursonode'
    });
    yield connection.query(tmplSQL);
    yield connection.end();
});
exports.deleteClient = deleteClient;
