

let m3 = () => {
   console.log('Estoy en m3');
   setTimeout(() => {
      console.log('Función ejecutada bien (de forma asincrónica)');
   }, 0); //por mas que le ponga 0, se ejecuta al final porque es una función asincrónica. Pertenece a la "pila" de ejecuciones asincrónicas, que se ejecutan luego del código sincrónico.
   console.log('salgo de m3');
}

let m2 = () => {
   console.log('Antes de llamar a m3');
   m3();
   console.log('despues de llamar a m3');
}


let m1 = () => {
   console.log('Antes de llamar a m2');
   m2();
   console.log('despues de llamar a m2');
}


m1();

