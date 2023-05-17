let fn = (x, y, z) => {
   console.log(x + y + z);
}


fn(1, 2, 3);
fn.call(null, 3, 4, 5);
fn.apply(null, [6, 7, 8]); 
/**
 * el .apply es muy util cuando tengo que ejecutar una función
 * que recibe un parámetro y yo no conozco su estructura, por lo que no se
 * como manejarlo. entonces lo cargo dentro de una variable y lo paso dentro de un array
 * con el apply.
 */

