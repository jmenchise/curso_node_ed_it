import express from 'express';
import { ERROR_TYPE_MYSQL, saveToken, validateUser } from '../../lib/DBmySql';
import { createJWT } from '../../lib/jwt/createJWT';



export default express.Router()
   .get('/', (req, res) => {

   })
   .post('/', async (req, res) => {
      const user = req.body;
      console.log('user:', user);
      try {
         const userFoundId = await validateUser(user);
         const token = createJWT(userFoundId, user.userName);
         await saveToken(userFoundId, token);
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

