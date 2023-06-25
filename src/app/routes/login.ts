import express from 'express';
import {v4 as uuid} from 'uuid';


export default express.Router()
   .get('/', (req, res) => {
      
   })
   .post('/', (req, res) => {
      const body = req.body;
      console.log('body:', body);

      /* TODO:con el usuario hacer una query en mysql y luego con la password 
      encriptarla usando el sha256 y el salt (que están dentro de la base de datos)
      y compararla con el password encriptada. si coinciden devolver un token
      */
      
      
      res.status(200).send({token: uuid()});
   })
   .put('/', (req, res) => {
      
   })
   .delete('/', (req, res) => {
      
   })

