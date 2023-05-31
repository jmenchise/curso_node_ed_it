import fs from 'fs/promises';
const https = require('follow-redirects').http;
const qs = require('querystring');


export default onFinish => {
   let options = {
      'method': 'GET',
      'hostname': 'localhost',
      'port': 8080,
      'path': '/primer-get',
      headers: {
         'Content-Type': 'application/json',
      },
      maxRedirects: 20
   };

   let req = https.request(options, function (res) {
      let chunks: any[] = [];
      res.on('data', function (chunk) {
         chunks.push(chunk);
      });

      res.on('end', function (chunk) {
         let body = Buffer.concat(chunks)
         onFinish(body.toString())
      });

      res.on('error', function (error) {
         console.error(error)
      });
   });


   req.end();
}