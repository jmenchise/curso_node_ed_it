import { validateJWT } from "../../lib/jwt/validateJWT";
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { ERROR_TYPE_MYSQL } from '../../lib/DBmySql';



export default async (req, res, next) => {
   console.log('Se chequea si viene un token para autorizar o no al usuario');
   try {
      const xToken = req.headers['x-token'];
      await validateJWT(xToken);
      next();
      return;
   } catch (error: any) {
      if (error instanceof TokenExpiredError) {
         console.log('Token expirado. Detalle:', error.message);
         res.status(401).send({ error: error.message });
         return;
      };
      if (error instanceof JsonWebTokenError) {
         console.log('Token incorrecto. Detalle:', error.message);
         res.status(401).send({ error: error.message });
         return;
      };
      if (error.message.includes(ERROR_TYPE_MYSQL.TYPE_NOT_FOUND)) {
         res.status(404).send({ error: error.message });
         return;
      };
   };
};