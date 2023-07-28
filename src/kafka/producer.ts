import { Kafka, Partitioners } from "kafkajs";

let checkStr = (str: any) => {
   if (str === undefined) {
      throw new Error('El parámetro "KAFKA_TPOIC_NUMBERS" no puede ser undefined.');
   }
   return str;
};

const kafka = new Kafka({
   clientId: process.env.KAFKA_CLIENT_ID,
   brokers: ['127.0.0.1:9092'],
   connectionTimeout: 5000
});

export async function kafkaProducer(obj: object) {
   const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })

   await producer.connect();
   await producer.send({
      topic: checkStr(process.env.KAFKA_DEFAULT_TOPIC),
      messages: [{ value: JSON.stringify(obj) }]
   });

   await producer.disconnect();
};


export const numbersProducer = async () => {
   for (let i = 1; i < 1000; i++) {
      console.log(['---------', `num: ${i}`, '---------']);
      await kafkaProducer({ num: i });
   };
};

