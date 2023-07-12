import fs from 'fs/promises';
import { insertOneMongo } from '../lib/DBMongoDB';
import genUsuario from '../lib/genUsuario';

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
   console.log('files:', files)
   for (let file of files) {
      try {
         let pathFile = `${checkStr(process.env.PATH_OUTPUT_FILES)}/${file}`
         console.log('pathFile:', pathFile);
         let fileContent = await fs.readFile(pathFile, 'utf-8')
         let fileContentParsed = JSON.parse(fileContent);
         console.log('fileContentParsed:', fileContentParsed);
         insertOneMongo('clients', fileContentParsed);
         await fs.unlink(pathFile)
      } catch (error) {
         console.log(error);
      }
   }
}