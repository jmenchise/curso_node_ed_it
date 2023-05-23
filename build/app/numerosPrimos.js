"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let primeNumbersArr = [2, 3];
const findPrimeNumbers = (arr) => {
    for (let number of arr) { //TODO: cambiar este for of por un for.
        if (arr.length > 9) {
            console.log(arr);
            return;
        }
        if (number % arr[number] === 0) {
            return;
        }
        arr.push(number);
    }
};
console.log(primeNumbersArr);
exports.default = () => findPrimeNumbers(primeNumbersArr);
