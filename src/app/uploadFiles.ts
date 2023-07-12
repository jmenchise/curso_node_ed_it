import fs from 'fs/promises';
import mysql2Prom from 'mysql2/promise'


const saveStudent = async (student) => {
   let tmplSQL = 'INSERT INTO clients (id, firstName, lastName, city, streetName, country, accountName, account, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'

   const connection = await mysql2Prom.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'cursonode'
   })
   await connection.query(tmplSQL, [
      student.id,
      student.firstName,
      student.lastName,
      student.city,
      student.streetName,
      student.country,
      student.accountName,
      student.account,
      student.amount,
   ])

   await connection.end();
}

let checkStr = (str: string | undefined): string => {
   if (str === undefined) {
      throw new Error('El parámetro "PATH_OUTPUT_FILES" no puede ser undefined.');
   }
   return str
}


export default async () => {

   /* Debemos definir una función "checkStr" porque "readdir" no puede recibir como parámetro
   algo de tipo undefined, y "proces.env.ETC" puede contener valores de tipo T o undefined.
   
   Esto genera que readdir tire un error y no compile. 

   con la función checkStr nos aseguramos que el parámetro que reciba readdir va a ser 
   del tipo string SI O SI; si llegase a ser undefined arroja un error.

   Todo esto pasa porque estamos en typescript. con javascript no tendríamos este problema 
   */


   let files = await fs.readdir(checkStr(process.env.PATH_OUTPUT_FILES))
   console.log('files:', files)
   for (let file of files) {
      let pathFile = `${checkStr(process.env.PATH_OUTPUT_FILES)}/${file}`
      console.log('pathFile:', pathFile);
      let fileContent = await fs.readFile(pathFile, 'utf-8')
      console.log('fileContent:', fileContent);
      let fileContentParsed = JSON.parse(fileContent);
      console.log('fileContentParse:', fileContentParsed);
      await saveStudent(fileContentParsed);
      await fs.unlink(pathFile)
   }
}