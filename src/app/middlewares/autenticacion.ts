import { decodeJWT } from "../../lib/jwt/decodeJWT";
import { validateJWT } from "../../lib/jwt/validateJWT";


export default (req, res, next) => {
   console.log('Se chequea si viene un token para autorizar o no al usuario');
   if (req.method === 'POST') {
      next();
   };

   const xToken = req.headers['x-token'];
   if (!xToken) {
      console.log('Token no existe');
      res.status(401).send({});
      return;
   };
   if (validateJWT(xToken)) {
      decodeJWT(xToken);
      next();
      return;
   };
   res.status(401).send({});
}