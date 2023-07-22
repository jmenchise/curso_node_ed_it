"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const loggerConfig = {
    appenders: {
        file: {
            type: 'file',
            filename: '/Users/jmenc/OneDrive/Escritorio/Programacion/NodeJS-Backend/server-cursonode/logs/log.log'
        },
        console: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['file', 'console'],
            level: 'trace'
        }
    }
};
log4js_1.default.configure(loggerConfig);
exports.default = loggerName => log4js_1.default.getLogger(loggerName);
