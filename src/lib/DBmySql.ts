import { v4 as uuid } from 'uuid';
import sha256 from 'sha256';
import createMySqlConnection from './DBmySqlConnection';
import { User } from '../interfaces/Usuario';


export const ERROR_TYPE_MYSQL = {
   TYPE_NOT_FOUND: 'error al encontrar el usuario',
   TYPE_NOT_VALIDATED: 'Usuario y/o contraseña incorrectos.',
   TYPE_CONNECT_ERR: 'error al conectar con la base de datos.'
}


export const saveUser = async (user: User) => {
   let tmplSQL = 'INSERT INTO users (user_id, user_name, encrypted_password, salt, token) VALUES (?, ?, ?, ?, ?)';
   let connection: any;

   try {
      connection = await createMySqlConnection();
      console.log('Conexión con MySql exitosa!');
   } catch (error) {
      throw new Error(ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR);
   };

   user.salt = [uuid(), uuid()].join('__');
   const passToEncrypt = [user.clearPassword, user.salt].join('');
   user.encryptedPassword = sha256(passToEncrypt);
   const arrToInsert = [uuid(), user.userName, user.encryptedPassword, user.salt, ''];
   try {
      await connection.query(tmplSQL, arrToInsert);
      console.log('Usuario creado en la DB con éxito!');
      console.log('user:', user);
      await connection.end();
   } catch (error: any) {
      throw new Error(`error al crear el usuario.`);
   };
};


export const validateUser = async (user: User) => {
   let tmplSQL = `SELECT * FROM users WHERE user_name = ? `;
   let connection: any;

   try {
      connection = await createMySqlConnection();
      console.log('Conexión con MySql exitosa!');
   } catch (error) {
      throw new Error(ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR);
   };
   const responseArr: object[] = await connection.query(tmplSQL, user.userName);
   const result: any = responseArr[0];
   console.log('result:', result);
   await connection.end();
   if (result.length === 0) {
      throw new Error(ERROR_TYPE_MYSQL.TYPE_NOT_FOUND);
   };
   const userFound = result[0];
   const tmpToCompare = sha256([user.clearPassword, userFound.salt].join(''));
   if (tmpToCompare !== userFound.encrypted_password) {
      throw new Error(ERROR_TYPE_MYSQL.TYPE_NOT_VALIDATED);
   };

   return userFound.user_id;
};

export const saveToken = async (userId: string, token: string) => {
   let tmplSQL = `UPDATE users SET token = ? WHERE user_id = ? `;
   let connection: any;

   try {
      connection = await createMySqlConnection();
      console.log('Conexión con MySql exitosa!');
   } catch (error) {
      throw new Error(ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR);
   };

   try {
      await connection.query(tmplSQL, [token, userId]);
      console.log('Token guardado con éxito!');
      await connection.end();
   } catch (error: any) {
      throw new Error(`error al guardar el token.`);
   };
};

export const validateToken = async (token: string) => {
   let tmplSQL = `SELECT * FROM users WHERE token = ? `;
   let connection: any;

   try {
      connection = await createMySqlConnection();
      console.log('Conexión con MySql exitosa!');
   } catch (error) {
      throw new Error(ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR);
   };
   const responseArr: object[] = await connection.query(tmplSQL, token);
   const result: any = responseArr[0];
   console.log('result:', result);
   await connection.end();
   if (result.length === 0) {
      throw new Error(ERROR_TYPE_MYSQL.TYPE_NOT_FOUND);
   };
};


export const deleteClient = async (id: string) => {
   let tmplSQL = `DELETE FROM clients WHERE id = '${id}'`;
   let connection: any;

   try {
      connection = await createMySqlConnection();
      console.log('Conexión con MySql exitosa!');
   } catch (error) {
      throw new Error(ERROR_TYPE_MYSQL.TYPE_CONNECT_ERR)
   };
   await connection.query(tmplSQL);
   await connection.end();
};
