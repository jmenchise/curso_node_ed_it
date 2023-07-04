import { SECRET, time } from "./commons";
import jwt from 'jsonwebtoken';

export function validateJWT(token: string) {
   try {
      jwt.verify(token, SECRET);
   } catch (error) {
      console.log(error);
   }
   console.log('JWT validado con éxito!');
}