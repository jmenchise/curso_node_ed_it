import { saveUser, validateUser } from '../lib/DBmySql';

// export default () => {
//    console.log(`voy a encriptar 'Hola' en sha256`);
//    const salt = [uuid(), uuid()].join('__');
//    const passToEncrypt = ['hola', salt].join('');
//    console.log('passToEncrypt:', passToEncrypt);
//    const encryptedPass = sha256(passToEncrypt);
//    console.log('encryptedPass:', encryptedPass);
// }



export default () => saveUser({userName: 'pepe', clearPassword: 'pepe1234'});
// export default () => validateUser({userName: 'joan', clearPassword: 'hola12344'});