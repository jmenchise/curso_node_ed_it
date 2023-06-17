import express from 'express';
import { insertOneMongo, queryMongo } from '../../lib/DBMongoDB';


export default express.Router()
   .get('/', (req, res) => {
      const query = req.query;
      console.log(query);
      queryMongo('clients', query)
         .then(queryResult => res.send(queryResult))
         .catch(error => res.status(500).send(error));
   })
   .get('/:id', (req, res) => {
      const { id } = req.params;
      console.log(id);
      queryMongo('clients', { id: id })
         .then(queryResult => res.send(queryResult[0]))
         .catch(error => res.status(500).send(error));
   })
   .post('/', (req, res) => {
      const client = req.body;
      console.log(client);
      insertOneMongo('clients', client)
         .then(r => res.status(201).send(r))
         .catch(error => {
            console.log(error.message);
            res.status(500).send(error.message);
         })
   })
   .put('/:id', (req, res) => {
      console.log(req.params.id);
      res.send({});
      // TODO: Definir respuesta para PUT
   })
   .delete('/:id', (req, res) => {
      const { id } = req.params;
      console.log(id);
      res.send({});
      // TODO: Definir respuesta para DELETE
   })

