import { insertOneMongo } from '../lib/DBMongoDB';
import genUsuario from '../lib/genUsuario';

let client = genUsuario();

export const pruebaMongo = () => {
   insertOneMongo('clients', client)
   .then(r => console.log(r));
}


