import jwt from 'jsonwebtoken';

export function decodeJWT(token: string) {
   const decoded = jwt.decode(token);
   console.log('decoded:', decoded);
};