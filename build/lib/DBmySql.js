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
exports.deleteClient = exports.validateUser = exports.saveUser = exports.savePrimeNumber = exports.getPrimeNumbers = void 0;
const uuid_1 = require("uuid");
const sha256_1 = __importDefault(require("sha256"));
const mysql2_1 = __importDefault(require("mysql2"));
const DBmySqlConnection_1 = __importDefault(require("./DBmySqlConnection"));
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
const saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let tmplSQL = 'INSERT INTO users (id_user, user_name, encrypted_password, salt, token) VALUES (?, ?, ?, ?, ?)';
    let connection;
    try {
        connection = yield (0, DBmySqlConnection_1.default)();
        console.log('Conexión con MySql exitosa!');
    }
    catch (error) {
        throw new Error('error al conectar con la base de datos.');
    }
    user.salt = [(0, uuid_1.v4)(), (0, uuid_1.v4)()].join('__');
    const passToEncrypt = [user.clearPassword, user.salt].join('');
    user.encryptedPassword = (0, sha256_1.default)(passToEncrypt);
    const arrToInsert = [(0, uuid_1.v4)(), user.userName, user.encryptedPassword, user.salt, ''];
    yield connection.query(tmplSQL, arrToInsert);
    yield connection.end();
});
exports.saveUser = saveUser;
const validateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let tmplSQL = `SELECT * FROM users WHERE user_name = ? `;
    let connection;
    try {
        connection = yield (0, DBmySqlConnection_1.default)();
        console.log('Conexión con MySql exitosa!');
    }
    catch (error) {
        throw new Error('error al conectar con la base de datos.');
    }
    const responseArr = yield connection.query(tmplSQL, user.userName);
    const result = responseArr[0];
    console.log('result:', result);
    yield connection.end();
    if (result.length === 0) {
        throw new Error('error al encontrar el usuario');
    }
    const userFound = result[0];
    const tmpToCompare = (0, sha256_1.default)([user.clearPassword, userFound.salt].join(''));
    if (tmpToCompare !== userFound.encrypted_password) {
        throw new Error('error al encontrar el usuario');
    }
    console.log('usuario autenticado correctamente. token: ...');
    return true;
});
exports.validateUser = validateUser;
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let tmplSQL = `DELETE FROM clients WHERE id = '${id}'`;
    let connection;
    try {
        connection = yield (0, DBmySqlConnection_1.default)();
        console.log('Conexión con MySql exitosa!');
    }
    catch (error) {
        throw new Error('error al conectar con la base de datos.');
    }
    yield connection.query(tmplSQL);
    yield connection.end();
});
exports.deleteClient = deleteClient;
