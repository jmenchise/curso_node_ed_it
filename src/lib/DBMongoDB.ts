import { MongoClient } from 'mongodb';

let checkStr = (str: string | undefined): string => {
   if (str === undefined) {
      throw new Error('El parámetro "DB_MONGODB_URL" no puede ser undefined.');
   };
   return str;
}


export const insertOneMongo = async (collectionName: string, document: object) => {

   const client = await MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
   console.log('Conexión con Mongodb exitosa!');
   const DB = client.db(process.env.DB_MONGODB_NAME);
   const collection = DB.collection(collectionName);
   //guardo lo que retorna el insertOne en una variable para 
   //visualizar el resultado en la consola (si se pudo insertar
   // el documento o no).
   const result = await collection.insertOne(document);
   await client.close();

   return result;
}


export const queryMongo = async (collectionName: string, query: object) => {

   const client = await MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
   console.log('Conexión con Mongodb exitosa!');
   const DB = client.db(process.env.DB_MONGODB_NAME);
   const collection = DB.collection(collectionName);

   const result = await collection.find(query).toArray();
   await client.close();

   return result;
}

export const findOneMongo = async (collectionName: string, id: string) => {

   const client = await MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
   console.log('Conexión con Mongodb exitosa!');
   const DB = client.db(process.env.DB_MONGODB_NAME);
   const collection = DB.collection(collectionName);

   const result = await collection.findOne({ id: id });
   await client.close();

   return result;
}

export const updateOneMongo = async (collectionName: string, id: string, obj: object) => {

   const client = await MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
   console.log('Conexión con Mongodb exitosa!');
   const DB = client.db(process.env.DB_MONGODB_NAME);
   const collection = DB.collection(collectionName);

   const result = await collection.findOneAndUpdate({ id: id }, { $set: obj }, {
      returnDocument: 'after'
   });
   await client.close();

   return result.value;
}

export const deleteOneMongo = async (collectionName: string, id: string) => {

   const client = await MongoClient.connect(checkStr(process.env.DB_MONGODB_URL));
   console.log('Conexión con Mongodb exitosa!');
   const DB = client.db(process.env.DB_MONGODB_NAME);
   const collection = DB.collection(collectionName);

   const result = await collection.findOneAndDelete({ id: id });
   await client.close();

   return result.value;
}