"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DBMongoDB_1 = require("../../lib/DBMongoDB");
const genUsuario_1 = __importDefault(require("../../lib/genUsuario"));
const producer_1 = require("../../kafka/producer");
exports.default = express_1.default.Router()
    .get('/', (req, res) => {
    (0, DBMongoDB_1.queryMongo)('clients', {})
        .then(queryResult => res.send(queryResult))
        .catch(error => res.status(500).send(error));
})
    .get('/filter', (req, res) => {
    const query = req.query;
    console.log('query:', query);
    (0, DBMongoDB_1.queryMongo)('clients', query)
        .then(queryResult => {
        queryResult.length > 0 ? res.send(queryResult[0])
            : res.status(404).send(`<h2>Cliente no encontrado</h2>`);
    })
        .catch(error => res.status(500).send(error));
})
    .get('/create', (req, res) => res.json((0, genUsuario_1.default)()))
    .get('/:id', (req, res) => {
    const { id } = req.params;
    console.log('id:', id);
    (0, DBMongoDB_1.findOneMongo)('clients', id)
        .then(queryResult => {
        queryResult ? res.send(queryResult)
            : res.status(404).send(`<h2>El id especificado no existe</h2>`);
    })
        .catch(error => res.status(500).send(error));
})
    .post('/', (req, res) => {
    const client = req.body;
    console.log('client:', client);
    // insertOneMongo('clients', client)
    (0, producer_1.kafkaProducer)(client)
        .then(r => res.status(201).send(r))
        .catch(error => {
        console.log(error.message);
        res.status(500).send(error.message);
    });
})
    .put('/:id', (req, res) => {
    const { id } = req.params;
    const client = req.body;
    console.log('id:', id);
    console.log('client:', client);
    (0, DBMongoDB_1.updateOneMongo)('clients', id, client)
        .then(updatedClient => res.status(200).send(updatedClient || {}))
        .catch(error => {
        console.log(error.message);
        res.status(500).send(error.message);
    });
})
    .delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log('id:', id);
    (0, DBMongoDB_1.deleteOneMongo)('clients', id)
        .then(deletedClient => res.status(200).send(deletedClient || {}))
        .catch(error => {
        console.log(error.message);
        res.status(500).send(error.message);
    });
});
