"use strict";
//con este formato de export, estoy exportando una función que retorna una función.
//por eso, donde la importe, además de poder elegir el nombre que desee por estar 
//exportando x default tengo que ejecutar esa función. 
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => (req, res, next) => {
    console.log('Accediendo al Middleware.');
    console.log('Fecha:', new Date().toLocaleDateString());
    console.log('Hora:', new Date().toLocaleTimeString());
    console.log('Saliendo del Middleware.');
    next();
};
