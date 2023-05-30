import mysql from 'mysql2'





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


