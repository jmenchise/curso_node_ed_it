import log4js from 'log4js';


const loggerConfig = {
   appenders: {
      file: {
         type: 'file',
         filename: '/Users/jmenc/OneDrive/Escritorio/Programacion/NodeJS-Backend/server-cursonode/logs/log.log'
      },
      console: {
         type: 'stdout'
      }
   },
   categories: {
      default: {
         appenders: ['file', 'console'],
         level: 'trace'
      }
   }
}



log4js.configure(loggerConfig);

export default loggerName => log4js.getLogger(loggerName); 