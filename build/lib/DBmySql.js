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
exports.deleteClient = exports.validateToken = exports.saveToken = exports.validateUser = exports.saveUser = exports.ERROR_TYPE_MYSQL = void 0;
const uuid_1 = require("uuid");
const sha256_1 = __importDefault(require("sha256"));
const DBmySqlConnection_1 = __importDefault(require("./DBmySqlConnection"));
exports.ERROR_TYPE_MYSQL = {
    TYPE_NOT_FOUND: 'error al encontrar el usuario',
    TYPE_NOT_VALIDATED: 'Usuario y/o contraseña incorrectos.',
    TYPE_CONNECT_ERR: 'error al conectar con la base de datos.'
};
const saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let tmplSQL = 'INSERT INTO users (user_id, user_name, encrypted_password, salt, token) VALUES (?, ?, ?, ?, ?)';
    let connection;
    try {
        connection = yield (0, DBmySqlConnection_1.default)();
        console.log('Conexión con MySql exitosa!');
    }
    catch (error) {
        throw new Error(exports.ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR);
    }
    ;
    user.salt = [(0, uuid_1.v4)(), (0, uuid_1.v4)()].join('__');
    const passToEncrypt = [user.clearPassword, user.salt].join('');
    user.encryptedPassword = (0, sha256_1.default)(passToEncrypt);
    const arrToInsert = [(0, uuid_1.v4)(), user.userName, user.encryptedPassword, user.salt, ''];
    try {
        yield connection.query(tmplSQL, arrToInsert);
        console.log('Usuario creado en la DB con éxito!');
        console.log('user:', user);
        yield connection.end();
    }
    catch (error) {
        throw new Error(`error al crear el usuario.`);
    }
    ;
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
        throw new Error(exports.ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR);
    }
    ;
    const responseArr = yield connection.query(tmplSQL, user.userName);
    const result = responseArr[0];
    console.log('result:', result);
    yield connection.end();
    if (result.length === 0) {
        throw new Error(exports.ERROR_TYPE_MYSQL.TYPE_NOT_FOUND);
    }
    ;
    const userFound = result[0];
    const tmpToCompare = (0, sha256_1.default)([user.clearPassword, userFound.salt].join(''));
    if (tmpToCompare !== userFound.encrypted_password) {
        throw new Error(exports.ERROR_TYPE_MYSQL.TYPE_NOT_VALIDATED);
    }
    ;
    return userFound.user_id;
});
exports.validateUser = validateUser;
const saveToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    let tmplSQL = `UPDATE users SET token = ? WHERE user_id = ? `;
    let connection;
    try {
        connection = yield (0, DBmySqlConnection_1.default)();
        console.log('Conexión con MySql exitosa!');
    }
    catch (error) {
        throw new Error(exports.ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR);
    }
    ;
    try {
        yield connection.query(tmplSQL, [token, userId]);
        console.log('Token guardado con éxito!');
        yield connection.end();
    }
    catch (error) {
        throw new Error(`error al guardar el token.`);
    }
    ;
});
exports.saveToken = saveToken;
const validateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let tmplSQL = `SELECT * FROM users WHERE token = ? `;
    let connection;
    try {
        connection = yield (0, DBmySqlConnection_1.default)();
        console.log('Conexión con MySql exitosa!');
    }
    catch (error) {
        throw new Error(exports.ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR);
    }
    ;
    const responseArr = yield connection.query(tmplSQL, token);
    const result = responseArr[0];
    console.log('result:', result);
    yield connection.end();
    if (result.length === 0) {
        throw new Error(exports.ERROR_TYPE_MYSQL.TYPE_NOT_FOUND);
    }
    ;
});
exports.validateToken = validateToken;
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let tmplSQL = `DELETE FROM clients WHERE id = '${id}'`;
    let connection;
    try {
        connection = yield (0, DBmySqlConnection_1.default)();
        console.log('Conexión con MySql exitosa!');
    }
    catch (error) {
        throw new Error(exports.ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR);
    }
    ;
    yield connection.query(tmplSQL);
    yield connection.end();
});
exports.deleteClient = deleteClient;
