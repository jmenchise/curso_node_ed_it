import { Usuario } from './interfaces/Usuario';
import genUsuario from './lib/genUsuario'
import fs from 'fs';


let createUserFile = (iteration:number) => {
   console.log('iteration N°:', iteration);
   let user:Usuario = genUsuario();
   console.log('user:', user); 
   let fileName:string = `./var/arch/${user.id}.json`
   
   fs.writeFile(fileName, JSON.stringify(user), 'utf-8',err => {
      console.log(err? err : '');
      iteration < 10 && createUserFile(++iteration);
   })

}


createUserFile(1);
