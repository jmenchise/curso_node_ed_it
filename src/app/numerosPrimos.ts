
let primeNumbersArr:number[] = [2,3]

const findPrimeNumbers = (arr:number[]) => {

   for (let number of arr) { //TODO: cambiar este for of por un for.
      console.log(arr) // esto es un cambio que se hizo con el celular.
      if (arr.length > 9) {
         console.log(arr);
         return
      }
      if (number % arr[number] === 0) {
         return
      }
      arr.push(number)
   }
}

console.log(primeNumbersArr);



export default () => findPrimeNumbers(primeNumbersArr);

