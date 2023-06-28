import express from 'express';
import { v4 as uuid } from 'uuid';
import { ERROR_TYPE, createToken, validateToken, validateUser } from '../../lib/DBmySql';


export default express.Router()
   .get('/', (req, res) => {

   })
   .post('/', async (req, res) => {
      const user = req.body;
      console.log('user:', user);
      try {
         await validateUser(user);
         console.log('usuario autenticado correctamente.');
         const token = `unToken__${uuid()}`;
         await createToken(user, token);
         await validateToken(token);
         console.log('token:', token);
         res.status(200).send({ token });
      } catch (error: any) {
         if (error.message.includes(ERROR_TYPE.TYPE_NOT_FOUND)) {
            console.log('error message:', error.message);
            res.status(404).send({ error: error.message });
         };
         if (error.message.includes(ERROR_TYPE.TYPE_NOT_VALIDATED)) {
            console.log('error message:', error.message);
            res.status(401).send({ error: error.message });
         };
         if (error.message.includes(ERROR_TYPE.TYPE_CONNECT_ERR)) {
            console.log('error message:', error.message);
            res.status(403).send({ error: error.message });
         };
      };
   })
   .put('/', (req, res) => {

   })
   .delete('/', (req, res) => {

   });

