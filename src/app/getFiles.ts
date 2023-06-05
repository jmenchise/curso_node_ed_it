import fs from 'fs/promises';
import mysql2Prom from 'mysql2/promise'


const saveStudent = (student) => {
   let tmplSQL = 'INSERT INTO users (id, firstName, lastName, city, streetName, country, accountName, account, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'

   const connection = mysql2Prom.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'alumnos'
   })
   .then(c => c.query(tmplSQL, [
      student.id,
      student.firstName,
      student.lastName,
      student.city,
      student.streetName,
      student.country,
      student.accountName,
      student.account,
      student.amount,
   ]))

   return connection;
}

let checkStr = (str: string | undefined): string => {
   if (str === undefined) {
      throw new Error('El parámetro "PATH_OUTPUT_FILES" no puede ser undefined.');
   }
   return str
}


export default () => {

   /* Debemos definir una función "checkStr" porque "readdir" no puede recibir como parámetro
   algo de tipo undefined, y "proces.env.ETC" puede contener valores de tipo T o undefined.
   
   Esto genera que readdir tire un error y no compile. 

   con la función checkStr nos aseguramos que el parámetro que reciba readdir va a ser 
   del tipo string SI O SI; si llegase a ser undefined arroja un error.

   Todo esto pasa porque estamos en typescript. con javascript no tendríamos este problema 
   */


   fs.readdir(checkStr(process.env.PATH_OUTPUT_FILES))
      .then((rs: string[]) => rs[0])
      .then(nameFile => {
         let pathFile = `${checkStr(process.env.PATH_OUTPUT_FILES)}/${nameFile}`
         console.log('pathFile:', pathFile);
         return pathFile
      })
      .then(pathFile => fs.readFile(pathFile, 'utf-8'))
      .then(r => {
         console.log(r);
         return r
      })
      .then(r => JSON.parse(r))
      .then(r => {
         console.log(r)
         return r
      })
      .then(r => saveStudent(r))

}

// queda por terminar. falta eliminar el archivo pero no podemos acceder a el porque se pierde
// en la cascada de promises. Se puede solucionar con async await, lo vamos a ver la proxima
// clase