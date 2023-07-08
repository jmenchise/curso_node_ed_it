import express from 'express';
import { decodeJWT } from '../../lib/jwt/decodeJWT';



export default express.Router()
   .get('/', (req, res) => {
      const xToken: any = req.headers['x-token'];
      const tokenObj = decodeJWT(xToken);
      res.status(200).send(tokenObj);
   })
   .post('/', (req, res) => {

   })
   .put('/', (req, res) => {

   })
   .delete('/', (req, res) => {

   })