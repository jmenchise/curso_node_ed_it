/**
 * Curry o partial aplication es una forma de función que solo recibe un parámetro,
 * y luego retorna una función que utiliza ese parámetro.
 */


let suma = x => {
   return y => {
      return x + y
   }
}


console.log(suma(4)(6));

/**
 * esto me permite crear funciones a partir de otras. En este caso, por ejemplo yo puedo
 * crear una función que siempre sume 10. esto se llama "bind", es decir que la función
 * "suma" tiene "binding" o "bindeado"  un 10.
 */

let suma10 = suma(10);

console.log(suma10(1));


/**
 * hoy por hoy ya no se usa esta forma de crear funciones a partir de otras. Para 
 * obtener el mismo resultado se utiliza el "bind".
 * primero defino la función completa, o sea definiendole todos los parámetros que necesito;
 */

let suma2 = (x, y) => {
   return x + y
}


/**
 * y luego uso el bind
 */


let suma100 = suma2.bind(null, 100);

/**
 * esto lo que hace es "bindear" el 100 con el primer parámetro, y me retorna una función
 * que, en este caso, siempre suma 100. 
 * es decir que hace lo mismo que la línea 22 pero con 100 en lugar de 10
 */

console.log(suma100(20));



