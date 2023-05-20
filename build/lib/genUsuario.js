"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require('faker');
const uuid_1 = require("uuid");
function createFakeObj() {
    return {
        id: (0, uuid_1.v4)(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        city: faker.address.city(),
        streetName: faker.address.streetName(),
        country: faker.address.country(),
        accountName: faker.finance.accountName(),
        account: faker.finance.account(),
        amount: faker.finance.amount()
    };
}
exports.default = createFakeObj;
