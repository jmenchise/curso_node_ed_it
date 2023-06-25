import { recursiveFindPrimeNumbers } from "./app/numerosPrimos";
import server from "./server";
import httpClient from "./http/httpClient";
import { getPrimeNumbers } from "./lib/DBmySql";
import 'dotenv/config';
import createUserFile from "./app/createFiles";
import uploadFiles from "./app/uploadFiles";
import { pruebaMongo } from "./app/pruebaMongo";
import pruebaPasswords from "./app/pruebaPasswords";


switch (process.argv[2]) {
   case 'numeros-primos':
      recursiveFindPrimeNumbers();
      break;

   case 'create-files':
      createUserFile();
      break;

   case 'server':
      server();
      break;

   case 'test':
      getPrimeNumbers(r => console.log(r));
      break;

   case 'client':
      httpClient(r => console.log(r));
      break;

   case 'upload-files':
      uploadFiles();
      break;

   case 'mongo-test':
      pruebaMongo();
      break;
   
   case 'passwords':
      pruebaPasswords();
      break

   default:
      console.log('Por favor debe cargar un parámetro.');
      break;
}