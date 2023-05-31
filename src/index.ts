import { recursiveFindPrimeNumbers } from "./app/numerosPrimos";
import { promisesExample1 } from "./app/promisesExamples";
import server from "./server";
import httpClient from "./http/httpClient";
import { getPrimeNumbers } from "./lib/DBmySql";

console.log(process.argv);

switch (process.argv[2]) {
   case 'numeros-primos':
      recursiveFindPrimeNumbers();
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

   default:
      break;
}