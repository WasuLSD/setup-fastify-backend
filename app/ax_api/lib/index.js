"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const delay_1 = require("./utils/axDelay/delay");
const app = (0, fastify_1.default)({
    logger: true,
});
app.get("/axApi", (req, reply) => {
    setTimeout(() => {
        console.log("Response from AX Endpoint");
    }, (0, delay_1.randDelay)());
    reply.status(200).send({ msg: "Response from AX Endpoint" });
});
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const start = async () => {
    try {
        await app.listen({ port: 3000, host: "0.0.0.0" });
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
