import express from 'express';
import {v4 as uuid} from 'uuid';
import { saveUser, validateUser } from '../../lib/DBmySql';


export default express.Router()
   .get('/', (req, res) => {
      
   })
   .post('/', (req, res) => {
      const user = req.body;
      console.log('user:', user);
      validateUser(user);
      // res.status(200).send({token: uuid()});
   })
   .put('/', (req, res) => {
      
   })
   .delete('/', (req, res) => {
      
   })

