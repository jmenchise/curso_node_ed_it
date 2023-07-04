import { SECRET, time } from "./commons";
import jwt from 'jsonwebtoken';

export function createJWT() {
   const payload = {
      sub: '35205354',
      name: 'Joan',
      iat: time(),
      exp: time() + 40
   }

   const token = jwt.sign(JSON.stringify(payload), SECRET);
   console.log('token:', token);
   return token;
}