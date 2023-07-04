import { SECRET } from "./commons";
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

export function validateJWT(token: string): boolean {
   try {
      jwt.verify(token, SECRET);
   } catch (error) {
      if (error instanceof TokenExpiredError) {
         console.log('Token expirado. Detalle:', error.message);
         return false;
      };

      if (error instanceof JsonWebTokenError) {
         console.log('Token mal formateado. Detalle:', error.message);
         return false;
      };
   }
   console.log('JWT validado con éxito!');
   return true;
}