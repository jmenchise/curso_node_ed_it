"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DBmySql_1 = require("./lib/DBmySql");
const DBmySql_2 = require("./lib/DBmySql");
exports.default = () => {
    const app = (0, express_1.default)();
    app.get('/primer-get', (req, res) => {
        let response = {
            nombre: 'hola',
            apellido: 'mundo'
        };
        // Se puede hacer de cualquiera de las 3 formas.
        // res.status(200).send(response);
        // res.send(response);
        res.json(response);
    });
    app.get('/numeros-primos', (req, res) => (0, DBmySql_1.getPrimeNumbers)(r => res.send(r)));
    app.get('/client', (req, res) => {
        console.log(req.query);
        res.send([]);
    });
    app.get('/client/:id', (req, res) => {
        console.log('id:', req.params.id);
        res.send({});
    });
    app.post('/client', (req, res) => {
        console.log(req.body);
        res.send({});
    });
    app.put('/client/:id', (req, res) => {
        console.log(req.params.id);
        res.send({});
    });
    app.delete('/client/:id', (req, res) => {
        const id = req.params.id;
        console.log(id);
        (0, DBmySql_2.deleteClient)(id);
        res.send(`<h2>Cliente id: ${id} Borrado de la base de datos.</h2>`);
    });
    app.delete('/primer-delete', (req, res) => {
        let response = {
            nombre: 'borrado',
            apellido: 'borrado'
        };
        res.send(response);
    });
    app.get('/*', (req, res) => {
        res.status(404).send('RECURSO NO ENCONTRADO');
    });
    const server = app.listen(8080, () => console.log('Servidor express escuchando por el puerto 8080.'));
    server.on('error', error => console.error(`Error al intentar conectar con el servidor. Detalle: ${error.message}`));
};
