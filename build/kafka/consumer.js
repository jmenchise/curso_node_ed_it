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
exports.initConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const DBMongoDB_1 = require("../lib/DBMongoDB");
let checkStr = (str) => {
    if (str === undefined) {
        throw new Error('El parámetro "KAFKA_TPOIC_NUMBERS" no puede ser undefined.');
    }
    return str;
};
const kafka = new kafkajs_1.Kafka({
    clientId: 'my-App',
    brokers: ['127.0.0.1:9092'],
    connectionTimeout: 5000
});
const doTime = (time) => new Promise(resolve => setTimeout(resolve, time));
function consumer() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: 'group-1' });
        yield consumer.connect();
        yield consumer.subscribe({ topic: checkStr(process.env.KAFKA_DEFAULT_TOPIC), fromBeginning: true });
        yield consumer.run({
            eachMessage: ({ topic, partition, message, pause }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    const objRecieved = JSON.parse((_a = message === null || message === void 0 ? void 0 : message.value) === null || _a === void 0 ? void 0 : _a.toString());
                    console.log({
                        topic,
                        partition,
                        value: (_b = message === null || message === void 0 ? void 0 : message.value) === null || _b === void 0 ? void 0 : _b.toString()
                    });
                    const resume = pause();
                    console.log('Se sube el cliente a mongoDB');
                    yield (0, DBMongoDB_1.insertOneMongo)('kafka_clients', objRecieved);
                    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                    yield doTime(500);
                    resume();
                }
                catch (error) {
                    console.log(error);
                }
                ;
            })
        });
    });
}
;
const initConsumer = () => {
    consumer();
};
exports.initConsumer = initConsumer;
