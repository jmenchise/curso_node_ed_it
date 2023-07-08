import express from "express";


export default (PORT = '8080') => {
   
   const app = express();

   app.get('/', (req, res) => {
      res.status(200).send({
         url: req.hostname,
         port: PORT
      });
   })

   
   const server = app.listen(PORT, () => console.log(`Servidor express escuchando por el puerto: ${PORT}`));
   server.on('error', error => console.error(`Error al intentar conectar con el servidor. Detalle: ${error.message}`));
}