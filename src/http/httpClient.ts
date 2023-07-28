import createLogger from "../cfg/logger";
import genUsuario from '../lib/genUsuario';


const logger = createLogger('http-client.ts');
const urlConnect = 'http://localhost:8080/api/client';


const httpPost = async (url: string, obj: object) => {
   try {
      await fetch(url, {
         method: 'post',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify(obj)
      });
   } catch (error: any) {
      logger.error(`Error al intentar conectar con el servidor. Detalle: ${error.message}`)
   }
}

export default async () => {
   for (let i = 1; i < 100; i++) {
      logger.info(`creando cliente N°: ${i}`);
      const newClient = genUsuario();
      await httpPost(urlConnect, newClient);
      logger.info(`cliente N°: ${i} creado correctamente.`);
   };
};