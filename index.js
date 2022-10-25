"use strict";

const { request, response } = require("express");

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (request, response) => {
    response.send("hello world from api bo3 how does internet work");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(' app listening on PORT ${port}'));

