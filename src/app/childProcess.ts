import { exec } from 'child_process';

export const execChildProcess = () => {
   exec('git status', (err, stdout, stderr) => {
      console.log(stdout);
   }) ;
};