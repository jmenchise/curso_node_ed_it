import { MongoClient } from 'mongodb';
import genUsuario from '../lib/genUsuario';


export const pruebaMongo = async () => {
   const url = 'mongodb://0.0.0.0:27017';
   const client = await MongoClient.connect(url);
   console.log('Conexión con Mongodb exitosa!');
   const DB = client.db('nodebraker_10');
   const collection = DB.collection('alumnos');
   await collection.insertOne(genUsuario());
   
   await client.close();
}