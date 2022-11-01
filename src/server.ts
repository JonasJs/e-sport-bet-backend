import Fastify from "fastify";
import cors from "@fastify/cors";
import dontenv from "dotenv";

import { PrismaClient } from "@prisma/client";

dontenv.config();

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});


async function bootstrap() {
  const port = Number(process.env.PORT) || 3333;

  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return {
      count,
    }
  });

  await fastify.listen({ port, host: '0.0.0.0' });
}

bootstrap();