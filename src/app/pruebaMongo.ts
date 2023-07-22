import fs from 'fs/promises';
import { insertOneMongo } from '../lib/DBMongoDB';
import genUsuario from '../lib/genUsuario';
import createLogger from '../cfg/logger';

const log = createLogger('prueba-mongo');

let client = genUsuario();

export const pruebaMongo = () => {
   insertOneMongo('clients', client)
      .then(r => console.log(r));
}


let checkStr = (str: string | undefined): string => {
   if (str === undefined) {
      throw new Error('El parámetro "PATH_OUTPUT_FILES" no puede ser undefined.');
   }
   return str
}


export const uploadFilesMongo = async () => {

   /* Debemos definir una función "checkStr" porque "readdir" no puede recibir como parámetro
   algo de tipo undefined, y "proces.env.ETC" puede contener valores de tipo T o undefined.
   
   Esto genera que readdir tire un error y no compile. 

   con la función checkStr nos aseguramos que el parámetro que reciba readdir va a ser 
   del tipo string SI O SI; si llegase a ser undefined arroja un error.

   Todo esto pasa porque estamos en typescript. con javascript no tendríamos este problema 
   */


   let files = await fs.readdir(checkStr(process.env.PATH_OUTPUT_FILES))
   for (let file of files) {
      try {
         let pathFile = `${checkStr(process.env.PATH_OUTPUT_FILES)}/${file}`
         console.log('pathFile:', pathFile);
         let fileContent = await fs.readFile(pathFile, 'utf-8')
         let fileContentParsed = JSON.parse(fileContent);
         console.log('fileContentParsed:', fileContentParsed);
         await insertOneMongo('clients', fileContentParsed);
         console.log('Archivo cargado correctamente.');
         await fs.unlink(pathFile)
      } catch (error) {
         console.log(error);
      };
   };
};

export const saveRandomClients = async () => {
   for (let i = 1; i <= 30; i++) {
      const randomClient = genUsuario();
      log.info('generando cliente aleatorio para insertar en mongo n°:' + ' '  + i);
      await insertOneMongo('clients', randomClient);
      log.info(`Cliente ${i} insertado exisosamente`);
   };
};