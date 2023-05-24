
let primeNumbersArr: number[] = [2, 3]


const checkIfPrime = (number: number, arr: number[]) => {
   if (arr.includes(number)) {
      console.log(`el númnero ${number} es primo. ya está en el array`);
      return false
   }

   for (let primeNumber of arr) {
      if (number % primeNumber === 0) {
         console.log(`el número ${number} no es primo`)
         return false
      }
   }
   return true
}



const findPrimeNumbers = (arr: number[], count: number) => {
   for (let i = 2; ; i++) {
      if (arr.length >= count) {
         console.log('primeNumbersArr:', primeNumbersArr)
         return
      }

      if (checkIfPrime(i, arr)) {
         console.log(`el número ${i} es primo. Se agrega al array.`)
         arr.push(i)
      }
   }
}

export default (count: number) => { findPrimeNumbers(primeNumbersArr, count) }



