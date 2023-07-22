"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../cfg/logger"));
exports.default = () => {
    const log = (0, logger_1.default)('test');
    console.log('Testing...');
    console.log('log:', log);
};
