import express from 'express';
import { v4 as uuid } from 'uuid';
import { ERROR_TYPE, validateUser } from '../../lib/DBmySql';


export default express.Router()
   .get('/', (req, res) => {

   })
   .post('/', async (req, res) => {
      const user = req.body;
      console.log('user:', user);
      try {
         await validateUser(user);
         console.log('usuario autenticado correctamente.');
         res.status(200).send({ token: uuid() });
      } catch (error: any) {
         console.log(error);
         if (error.message.includes(ERROR_TYPE.TYPE_NOT_FOUND)) {
            console.log('error:', error.message);
            res.status(404).send({ error: error.message });
         };
         if (error.message.includes(ERROR_TYPE.TYPE_NOT_VALIDATED)) {
            console.log('error:', error.message);
            res.status(401).send({ error: error.message });
         };
      };
   })
   .put('/', (req, res) => {

   })
   .delete('/', (req, res) => {

   });

