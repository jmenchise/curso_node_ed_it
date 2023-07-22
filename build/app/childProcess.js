"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execChildProcess = void 0;
const child_process_1 = require("child_process");
const execChildProcess = () => {
    (0, child_process_1.exec)('git status', (err, stdout, stderr) => {
        console.log(stdout);
    });
};
exports.execChildProcess = execChildProcess;
