import fastify from "fastify";

import { randDelay } from "./utils/axDelay/delay";
const app = fastify({
  logger: true,
});

app.get("/axApi", (req, reply) => {
  setTimeout(() => {
    console.log("Response from AX Endpoint");
  }, randDelay());
  reply.status(200).send({ msg: "Response from AX Endpoint" });
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
