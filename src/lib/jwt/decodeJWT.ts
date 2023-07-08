import jwt from 'jsonwebtoken';

export function decodeJWT(token: string) {
   return jwt.decode(token);
};