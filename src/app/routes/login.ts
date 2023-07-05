import express from 'express';
import { ERROR_TYPE_MYSQL, saveToken, validateUser } from '../../lib/DBmySql';
import { createJWT } from '../../lib/jwt/createJWT';
import autenticacionRouter from '../middlewares/autenticacion';



export default express.Router()
   .use('/', autenticacionRouter)
   .get('/', (req, res) => {
      res.send({ response: 'Usuario autenticado correctamente.' });
   })
   .post('/', async (req, res) => {
      const user = req.body;
      console.log('user:', user);
      try {
         await validateUser(user);
         const token = createJWT();
         await saveToken(user, token);
         res.status(200).send({ token });
      } catch (error: any) {
         if (error.message.includes(ERROR_TYPE_MYSQL.TYPE_NOT_FOUND)) {
            res.status(404).send({ error: error.message });
         };
         if (error.message.includes(ERROR_TYPE_MYSQL.TYPE_NOT_VALIDATED)) {
            res.status(401).send({ error: error.message });
         };
         if (error.message.includes(ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR)) {
            res.status(403).send({ error: error.message });
         };
      };
   })
   .put('/', (req, res) => {

   })
   .delete('/', (req, res) => {

   });

