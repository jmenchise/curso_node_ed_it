import { v4 as uuid } from 'uuid';
import sha256 from 'sha256';
import mysql from 'mysql2';
import createMySqlConnection from './DBmySqlConnection'


export const getPrimeNumbers = (onFinish: any) => {

   const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'cursonode'
   });

   connection.connect(err => {
      if (err) {
         onFinish(err)
         return
      }

      connection.query('SELECT * FROM numerosprimos', (err, results, fields) => {
         if (err) {
            onFinish(err)
            return
         }

         connection.end(err => {
            if (err) {
               onFinish(err)
               return
            }
         })
         onFinish(results)
      })
   })


}



export const savePrimeNumber = (number: number, onFinish: any) => {

   const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'cursonode'
   });

   connection.connect(err => {
      if (err) {
         onFinish(err)
         return
      }

      connection.query('INSERT INTO numerosprimos (fecha, numero) VALUES (CURRENT_TIMESTAMP(), ?)', number, err => {
         if (err) {
            onFinish(err)
         }
         connection.end(err => {
            if (err) {
               onFinish(err)
               return
            }
         })
      })
      onFinish(null)
   })
}

export const saveUser = async (user: any) => {
   let tmplSQL = 'INSERT INTO users (id_user, user_name, encrypted_password, salt, token) VALUES (?, ?, ?, ?, ?)';
   let connection: any;

   try {
      connection = await createMySqlConnection();
      console.log('Conexión con MySql exitosa!');
   } catch (error) {
      throw new Error('error al conectar con la base de datos.')
   }

   user.salt = [uuid(), uuid()].join('__');
   const passToEncrypt = [user.clearPassword, user.salt].join('');
   user.encryptedPassword = sha256(passToEncrypt);
   const arrToInsert = [uuid(), user.userName, user.encryptedPassword, user.salt, ''];

   await connection.query(tmplSQL, arrToInsert);
   await connection.end();
}


export const validateUser = async (user: any) => {
   let tmplSQL = `SELECT * FROM users WHERE user_name = ? `;
   let connection: any;

   try {
      connection = await createMySqlConnection();
      console.log('Conexión con MySql exitosa!');
   } catch (error) {
      throw new Error('error al conectar con la base de datos.')
   }

   const responseArr: any = await connection.query(tmplSQL, user.userName);
   const result: any = responseArr[0];
   console.log('result:', result);
   await connection.end();

   if (result.length === 0) {
      throw new Error('error al encontrar el usuario')
   }

   const userFound = result[0];
   const tmpToCompare = sha256([user.clearPassword, userFound.salt].join(''));

   if (tmpToCompare !== userFound.encrypted_password) {
      throw new Error('error al encontrar el usuario')
   }

   console.log('usuario autenticado correctamente. token: ...');
   return true
}



export const deleteClient = async (id: string) => {
   let tmplSQL = `DELETE FROM clients WHERE id = '${id}'`;
   let connection: any;

   try {
      connection = await createMySqlConnection();
      console.log('Conexión con MySql exitosa!');
   } catch (error) {
      throw new Error('error al conectar con la base de datos.')
   }

   await connection.query(tmplSQL);
   await connection.end();
}
