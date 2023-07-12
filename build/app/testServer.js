"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.default = (PORT = '8080') => {
    const app = (0, express_1.default)();
    app.get('/', (req, res) => {
        res.status(200).send({
            url: req.hostname,
            port: PORT
        });
    });
    const server = app.listen(PORT, () => console.log(`Servidor express escuchando por el puerto: ${PORT}`));
    server.on('error', error => console.error(`Error al intentar conectar con el servidor. Detalle: ${error.message}`));
};
