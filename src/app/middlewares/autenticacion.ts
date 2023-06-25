
export default () => (req, res, next) => {
   console.log('Se chequea si viene un token para autorizar o no al usuario');
   const xToken = req.headers['x-token'];
   if (!xToken) {
      console.log('Token no existe');
      res.status(401).send({});
   }
   if (xToken === '1234ab') {
      console.log('Token correcto');
      next();
      return
   }
   console.log('Token incorrecto');
   res.status(401).send({});
}