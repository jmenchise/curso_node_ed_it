/*=========================================================
=                   callback Sincrónico                   =
==========================================================*/


let syncFn = cb => {
   console.log('Antes de llamar al callback');
   cb([1, 2, 3, 4, 5, 6]);
   console.log('Despues de llamar al callback');
}


function callBackFn(x) {
   console.log('Acá estoy dentro de la función callback...', x);
}

syncFn(callBackFn2)


/*============  End of callback Sincrónico  =============*/





/*=========================================================
=                   callback Asincrónico                  =
==========================================================*/

let asyncFn = cb => {
   console.log('Antes de llamar al callback (async)');
   setTimeout(() => {
      cb([1, 2, 3, 4, 5, 6]);
   }, 0);
   console.log('Despues de llamar al callback (async)');
}

function callBackFn2(xs) {
   for(x of xs) {
      console.log(x);
   }
}

asyncFn(callBackFn2);

/*============  End of callback Asincrónico  =============*/


