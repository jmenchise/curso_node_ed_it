import express from "express";
import { getPrimeNumbers } from "./lib/DBmySql";
import dateAndTime from './app/middlewares/hora';
import { deleteClient } from "./lib/DBmySql";
import routerClient from "./app/routes/routes";


export default () => {

   const app = express();

   app.use(express.json());
   app.use(dateAndTime());
   app.use('/client', routerClient);

   app.get('/primer-get', (req, res) => {
      let response = {
         nombre: 'hola',
         apellido: 'mundo'
      }
      // Se puede hacer de cualquiera de las 3 formas.
      // res.status(200).send(response);
      // res.send(response);
      res.json(response);
   })

   app.get('/numeros-primos', (req, res) => getPrimeNumbers(r => res.send(r)));


   // Este delete es de mySql
   // app.delete('/client/:id', (req, res) => {
   //    const id = req.params.id;
   //    console.log(id);
   //    deleteClient(id);
   //    res.send(`<h2>Cliente id: ${id} Borrado de la base de datos.</h2>`);
   // })


   app.delete('/primer-delete', (req, res) => {
      let response = {
         nombre: 'borrado',
         apellido: 'borrado'
      }
      res.send(response);
   })



   app.get('/*', (req, res) => {
      res.status(404).send('RECURSO NO ENCONTRADO');
   })

   const server = app.listen(8080, () => console.log('Servidor express escuchando por el puerto 8080.'));
   server.on('error', error => console.error(`Error al intentar conectar con el servidor. Detalle: ${error.message}`));
}
