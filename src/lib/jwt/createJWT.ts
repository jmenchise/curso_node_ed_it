import { SECRET, time } from "./commons";
import jwt from 'jsonwebtoken';

export function createJWT(userId: string, userName: string) {
   const payload = {
      sub: userId,
      name: userName,
      iat: time(),
      exp: time() + 40
   }

   const token = jwt.sign(JSON.stringify(payload), SECRET);
   console.log('token:', token);
   return token;
}