"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.numbersProducer = exports.kafkaProducer = void 0;
const kafkajs_1 = require("kafkajs");
let checkStr = (str) => {
    if (str === undefined) {
        throw new Error('El parámetro "KAFKA_TPOIC_NUMBERS" no puede ser undefined.');
    }
    return str;
};
const kafka = new kafkajs_1.Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: ['127.0.0.1:9092'],
    connectionTimeout: 5000
});
function kafkaProducer(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = kafka.producer({ createPartitioner: kafkajs_1.Partitioners.DefaultPartitioner });
        yield producer.connect();
        yield producer.send({
            topic: checkStr(process.env.KAFKA_DEFAULT_TOPIC),
            messages: [{ value: JSON.stringify(obj) }]
        });
        yield producer.disconnect();
    });
}
exports.kafkaProducer = kafkaProducer;
;
const numbersProducer = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 1; i < 1000; i++) {
        console.log(['---------', `num: ${i}`, '---------']);
        yield kafkaProducer({ num: i });
    }
    ;
});
exports.numbersProducer = numbersProducer;
