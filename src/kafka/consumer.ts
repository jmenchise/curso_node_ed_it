import { Kafka } from "kafkajs";
import { insertOneMongo } from "../lib/DBMongoDB";

let checkStr = (str: any) => {
   if (str === undefined) {
      throw new Error('El parámetro "KAFKA_TPOIC_NUMBERS" no puede ser undefined.');
   }
   return str;
};

const kafka = new Kafka({
   clientId: 'my-App',
   brokers: ['127.0.0.1:9092'],
   connectionTimeout: 5000
});

const doTime = (time: number) => new Promise(resolve => setTimeout(resolve, time));


async function consumer() {
   const consumer = kafka.consumer({ groupId: 'group-1' });
   await consumer.connect();
   await consumer.subscribe({ topic: checkStr(process.env.KAFKA_DEFAULT_TOPIC), fromBeginning: true });
   await consumer.run({
      eachMessage: async ({ topic, partition, message, pause }) => {
         try {
            const objRecieved = JSON.parse(<string>message?.value?.toString());
            console.log({
               topic,
               partition,
               value: <string>message?.value?.toString()
            });
            const resume = pause();
            console.log('Se sube el cliente a mongoDB');
            await insertOneMongo('kafka_clients', objRecieved);
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            await doTime(500);
            resume();
         } catch (error) {
            console.log(error);
         };
      }
   });
};


export const initConsumer = () => {
   consumer();
}
