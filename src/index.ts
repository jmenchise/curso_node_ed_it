import { recursiveFindPrimeNumbers } from "./app/numerosPrimos";
import server from "./server";
import httpClient from "./http/httpClient";
import { getPrimeNumbers } from "./lib/DBmySqlPrimeNumbers";
import 'dotenv/config';
import createUserFile from "./app/createFiles";
import uploadFiles from "./app/uploadFiles";
import { pruebaMongo } from "./app/pruebaMongo";
import pruebaPasswords from "./app/pruebaPasswords";
import { createJWT } from "./lib/jwt/createJWT";
import { validateJWT } from "./lib/jwt/validateJWT";
import { decodeJWT } from "./lib/jwt/decodeJWT";
import testServer from "./app/testServer";


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
      break;

   case 'create-jwt':
      createJWT('35205354', 'Joan');
      break;

   case 'validate-jwt':
      validateJWT(process.argv[3]);
      break;

   case 'read-jwt':
      decodeJWT(process.argv[3]);
      break;

   case 'test-server':
      testServer(process.argv[3]);
      break;


   default:
      console.log('Por favor debe cargar un parámetro.');
      break;
}