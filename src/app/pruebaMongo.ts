import { insertOne } from '../lib/DBMongoDB';
import genUsuario from '../lib/genUsuario';

let client = genUsuario();

export const pruebaMongo = () => {
   insertOne('clients', client)
   .then(r => console.log(r));
}


