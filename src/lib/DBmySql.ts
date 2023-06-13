import mysql from 'mysql2'
import mysql2Prom from 'mysql2/promise'



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
