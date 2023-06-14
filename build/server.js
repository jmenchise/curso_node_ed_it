"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DBmySql_1 = require("./lib/DBmySql");
const genUsuario_1 = __importDefault(require("./lib/genUsuario"));
const DBMongoDB_1 = require("./lib/DBMongoDB");
exports.default = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
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
    app.get('/create-client', (req, res) => res.json((0, genUsuario_1.default)()));
    app.get('/numeros-primos', (req, res) => (0, DBmySql_1.getPrimeNumbers)(r => res.send(r)));
    // Forma .then()
    app.get('/client', (req, res) => {
        const query = req.query;
        console.log(query);
        (0, DBMongoDB_1.queryMongo)('clients', query)
            .then(queryResult => res.send(queryResult))
            .catch(error => res.status(500).send(error));
    });
    //Forma async await
    // app.get('/client', async (req, res) => {
    //    const query = req.query;
    //    console.log(query);
    //    try {
    //       res.send(await queryMongo('clients', query));
    //    } catch (error) {
    //       res.status(500).send(error)
    //    }
    // })
    app.get('/client/:id', (req, res) => {
        console.log('id:', req.params.id);
        res.send({});
    });
    // Forma .then()
    app.post('/client', (req, res) => {
        const client = req.body;
        console.log(client);
        (0, DBMongoDB_1.insertOne)('clients', client)
            .then(r => res.status(201).send(r))
            .catch(error => {
            console.log(error.message);
            res.status(500).send(error.message);
        });
    });
    //Forma async await
    // app.post('/client', async (req, res) => {
    //    const client = req.body;
    //    console.log(client);
    //    try {
    //       res.status(201).send(await insertOne('clients', client))
    //    } catch (error) {
    //       res.status(500).send(error);
    //    }
    // })
    app.put('/client/:id', (req, res) => {
        console.log(req.params.id);
        res.send({});
    });
    app.delete('/client/:id', (req, res) => {
        console.log(req.params.id);
        res.send({});
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
