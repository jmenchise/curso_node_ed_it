import mysql from 'mysql2'



const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   database: 'cursonode'
});



export const savePrimeNumber = (number: number, onFinish: any) => {
   connection.connect(err => {
      if (err) {
         onFinish(err)
      }

      let newRecord = {
         // fecha: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
         fecha: new Date(),
         numero: number
      }

      connection.query('INSERT INTO numerosPrimos SET ?', newRecord, err => {
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


