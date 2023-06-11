import { MongoClient } from 'mongodb'


export const pruebaMongo = async () => {
   const url = 'mongodb://0.0.0.0:27017'
   await MongoClient.connect(url);
   console.log('Conexión con Mongodb exitosa!')
   
}