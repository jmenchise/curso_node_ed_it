import { v4 as uuid } from 'uuid';
import sha256 from 'sha256';
import mysql from 'mysql2';
import mysql2Prom from 'mysql2/promise';


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

   const connection = await mysql2Prom.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'cursonode'
   });
   user.salt = [uuid(), uuid()].join('__');
   const passToEncrypt = [user.clearPassword, user.salt].join('');
   user.encryptedPassword = sha256(passToEncrypt);
   const arrToInsert = [uuid(), user.userName, user.encryptedPassword, user.salt, ''];
   await connection.query(tmplSQL, arrToInsert);
   await connection.end();
}


export const validateUser = async (user: any) => {
   let tmplSQL = `SELECT * FROM users WHERE user_name = ? `;

   const connection = await mysql2Prom.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'cursonode'
   });

   const responseArr: any = await connection.query(tmplSQL, user.userName);
   const result: any = responseArr[0];
   console.log('result:', result);

   if (result.length === 0) {
      console.log('error al encontrar el usuario');
      await connection.end();
      return
   }
   const userFound = result[0];
   const tmpToCompare = [user.clearPassword, userFound.salt].join('');

   if (tmpToCompare === userFound.encrypted_password) {
      console.log('usuario autenticado correctamente. token: ...');
      await connection.end();
      return
   }

   await connection.end();
}



export const deleteClient = async (id: string) => {
   let tmplSQL = `DELETE FROM clients WHERE id = '${id}'`;

   const connection = await mysql2Prom.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'cursonode'
   });
   await connection.query(tmplSQL);

   await connection.end();
}
