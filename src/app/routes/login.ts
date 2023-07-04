import express from 'express';
import { ERROR_TYPE, saveToken, validateToken, validateUser } from '../../lib/DBmySql';
import { createJWT } from '../../lib/jwt/createToken';
import { validateJWT } from '../../lib/jwt/validateToken';



export default express.Router()
   .get('/', (req, res) => {

   })
   .post('/', async (req, res) => {
      const user = req.body;
      console.log('user:', user);
      try {
         await validateUser(user);
         console.log('usuario autenticado correctamente.');
         const token = createJWT();
         console.log('token:', token);
         await saveToken(user, token);
         validateJWT(token);
         // await validateToken(token);
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

