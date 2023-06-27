import mysql2Prom from 'mysql2/promise';

export default () => {
   return mysql2Prom.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'cursonode'
   });
}