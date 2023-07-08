import { saveUser } from '../lib/DBmySql';

// export default () => {
//    console.log(`voy a encriptar 'Hola' en sha256`);
//    const salt = [uuid(), uuid()].join('__');
//    const passToEncrypt = ['hola', salt].join('');
//    console.log('passToEncrypt:', passToEncrypt);
//    const encryptedPass = sha256(passToEncrypt);
//    console.log('encryptedPass:', encryptedPass);
// }


const testUser = {
   userName: 'choquita',
   clearPassword: 'choquita1234'
};

export default () => saveUser(testUser);
