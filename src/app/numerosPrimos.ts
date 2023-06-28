import { savePrimeNumber } from "../lib/DBmySqlPrimeNumbers";

let primeNumbersArr: number[] = [2]


export const checkIfPrime = (number: number, arr: number[]) => {
   if (arr.includes(number)) {
      console.log(`el númnero ${number} es primo. ya está en el array`);
      return false
   }

   for (let primeNumber of arr) {
      if (number % primeNumber === 0) {
         console.log(`el número ${number} no es primo`);
         return false
      }
   }
   console.log(`el número ${number} es primo. Se agrega al array.`);
   return true
}


// export const findPrimeNumbers = (arr: number[], count: number) => {
//    for (let i = 3; ; i++) {
//       if (arr.length >= count) {
//          console.log('primeNumbersArr:', primeNumbersArr)
//          return
//       }

//       if (checkIfPrime(i, arr)) {
//          console.log(`el número ${i} es primo. Se agrega al array.`);
//          arr.push(i);
//       }
//    }
// }


export const recursiveFindPrimeNumbers = () => {
   (function recursive(number) {
      // Corte
      if (primeNumbersArr.length >= 100) {
         console.log('primeNumbersArr:', primeNumbersArr)
         return
      }
      if (checkIfPrime(number, primeNumbersArr)) {
         primeNumbersArr.push(number);
         savePrimeNumber(number, (err: any) => {
            console.error(err) 
            recursive(number + 1);
            return
         })
      } else {
         recursive(number + 1);
      }
   })(3)
}




