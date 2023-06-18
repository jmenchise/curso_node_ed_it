import express from 'express';
import { insertOneMongo, queryMongo, findOneMongo, updateOneMongo, deleteOneMongo } from '../../lib/DBMongoDB';


export default express.Router()
   .get('/', (req, res) => {
      queryMongo('clients', {})
         .then(queryResult => res.send(queryResult))
         .catch(error => res.status(500).send(error));
   })
   .get('/filter', (req, res) => {
      const query = req.query;
      console.log('query:', query);
      queryMongo('clients', query)
         .then(queryResult => res.send(queryResult[0]))
         .catch(error => res.status(500).send(error));
   })
   .get('/:id', (req, res) => {
      const { id } = req.params;
      console.log('id:', id);
      findOneMongo('clients', id)
         .then(queryResult => res.send(queryResult))
         .catch(error => res.status(500).send(error));
   })
   .post('/', (req, res) => {
      const client = req.body;
      console.log('client:', client);
      insertOneMongo('clients', client)
         .then(r => res.status(201).send(r))
         .catch(error => {
            console.log(error.message);
            res.status(500).send(error.message);
         })
   })
   .put('/:id', (req, res) => {
      const { id } = req.params;
      const client = req.body;
      console.log('id:', id);
      console.log('client:', client);
      updateOneMongo('clients', id, client)
         .then(updatedClient => res.status(200).send(updatedClient || {}))
         .catch(error => {
            console.log(error.message);
            res.status(500).send(error.message);
         })
   })
   .delete('/:id', (req, res) => {
      const { id } = req.params;
      console.log('id:', id);
      deleteOneMongo('clients', id)
         .then(deletedClient => res.status(200).send(deletedClient || {}))
         .catch(error => {
            console.log(error.message);
            res.status(500).send(error.message);
         })
   })

