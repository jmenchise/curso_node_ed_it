import {v4 as uuid} from 'uuid';
import sha256 from 'sha256';

export default () => {
   console.log(`voy a encriptar 'Hola' en sha256`);
   const salt = [uuid(), uuid()].join('__');
   const passToEncrypt = ['hola', salt].join('');
   console.log('passToEncrypt:', passToEncrypt);
   const encryptedPass = sha256(passToEncrypt);
   console.log('encryptedPass:', encryptedPass);
}