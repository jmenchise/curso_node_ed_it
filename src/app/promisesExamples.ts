import fs from 'fs';


export const promisesExample1 = () => {

   const asyncFn = (number: number) => {
      return new Promise<number>((resolve, reject) => {
         let fileName: string = `./var/arch/file ${number}.txt`

         fs.writeFile(fileName, ` Archivo de prueba de promises número: ${number}`, 'utf-8', err => {
            if (err) {
               return reject(err)
            }
            resolve(number + 1);
         })

      })
   }

   const syncFn = (number: number) => {
      console.log(number);
   }

   asyncFn(1000)
   .then(r => {
      console.log('Todo correcto!', r)
      return r + 1
   })
   .then(r => {
      console.log('Sigue la cascada!', r)
      return r
   })
   .then(r => asyncFn(r + 1))
   .then(r => console.log('Sigue la cascada!', r))
   .catch(err => console.log(err))
   
}