"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genUsuario_1 = __importDefault(require("../lib/genUsuario"));
const fs_1 = __importDefault(require("fs"));
let createUserFile = (iteration) => {
    if (iteration > 10) {
        return;
    }
    console.log('iteration N°:', iteration);
    let user = (0, genUsuario_1.default)();
    console.log('user:', user);
    let fileName = `./var/arch/${user.id}.json`;
    fs_1.default.writeFile(fileName, JSON.stringify(user, null, '\t'), 'utf-8', err => {
        console.log(err ? err : '');
        createUserFile(++iteration);
    });
};
exports.default = () => createUserFile(1);
