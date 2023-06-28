"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveFindPrimeNumbers = exports.checkIfPrime = void 0;
const DBmySqlPrimeNumbers_1 = require("../lib/DBmySqlPrimeNumbers");
let primeNumbersArr = [2];
const checkIfPrime = (number, arr) => {
    if (arr.includes(number)) {
        console.log(`el númnero ${number} es primo. ya está en el array`);
        return false;
    }
    for (let primeNumber of arr) {
        if (number % primeNumber === 0) {
            console.log(`el número ${number} no es primo`);
            return false;
        }
    }
    console.log(`el número ${number} es primo. Se agrega al array.`);
    return true;
};
exports.checkIfPrime = checkIfPrime;
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
const recursiveFindPrimeNumbers = () => {
    (function recursive(number) {
        // Corte
        if (primeNumbersArr.length >= 100) {
            console.log('primeNumbersArr:', primeNumbersArr);
            return;
        }
        if ((0, exports.checkIfPrime)(number, primeNumbersArr)) {
            primeNumbersArr.push(number);
            (0, DBmySqlPrimeNumbers_1.savePrimeNumber)(number, (err) => {
                console.error(err);
                recursive(number + 1);
                return;
            });
        }
        else {
            recursive(number + 1);
        }
    })(3);
};
exports.recursiveFindPrimeNumbers = recursiveFindPrimeNumbers;
