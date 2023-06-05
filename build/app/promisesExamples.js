"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisesExample1 = void 0;
const fs_1 = __importDefault(require("fs"));
const promisesExample1 = () => {
    const asyncFn = (number) => {
        return new Promise((resolve, reject) => {
            let fileName = `./var/arch/file ${number}.txt`;
            fs_1.default.writeFile(fileName, ` Archivo de prueba de promises número: ${number}`, 'utf-8', err => {
                if (err) {
                    return reject(err);
                }
                resolve(number + 1);
            });
        });
    };
    const syncFn = (number) => {
        console.log(number);
    };
    asyncFn(1000)
        .then(r => {
        console.log('Todo correcto!', r);
        return r + 1;
    })
        .then(r => {
        console.log('Sigue la cascada!', r);
        return r;
    })
        .then(r => asyncFn(r + 1))
        .then(r => console.log('Sigue la cascada!', r))
        .catch(err => console.log(err));
};
exports.promisesExample1 = promisesExample1;
