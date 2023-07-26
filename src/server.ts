import express from "express";
import { getPrimeNumbers } from "./lib/DBmySqlPrimeNumbers";
import clientRouter from "./app/routes/client";
import loginRouter from './app/routes/login';
import autenticacionRouter from "./app/middlewares/autenticationRouter";
import userRouter from "./app/routes/user";
import createLogger from "./cfg/logger";

const logger = createLogger('server.ts');


export default () => {

   logger.info('levantando Servidor Express');
   //de esta forma, en este archivo server, dejamos de usar el console.log y en su lugar
   //usamos los logger.info, .error, trace, etc...
   //de esta forma no solo lo mostramos en pantalla sino que tmb se guarda en un archivo.

   const app = express();

   app.use(express.json());


   app.use('/login', loginRouter);
   app.use('/user', autenticacionRouter, userRouter);

   app.use('/api/client', clientRouter);

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

   const server = app.listen(8080, () => logger.info('Servidor express escuchando por el puerto 8080.'));
   server.on('error', error => logger.error(`Error al intentar conectar con el servidor. Detalle: ${error.message}`));
}
