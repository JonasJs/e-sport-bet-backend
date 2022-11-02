import Fastify from "fastify";
import cors from "@fastify/cors";
import dontenv from "dotenv";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";

dontenv.config();

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

// https://github.dev/ryands17/fastify-prisma/tree/main/src

async function bootstrap() {
  const port = Number(process.env.PORT) || 3333;

  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/users/count", async () => {
    const count = await prisma.user.count();

    return {
      count,
    }
  });

  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count();

    return {
      count,
    }
  });
  

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return {
      count,
    }
  });

  fastify.post("/pools", async (request, reply) => {
    try {
      
      const createPoolBody = z.object({
        title: z.string({
          required_error: "title is required",
        }),
        ownerId: z.string().optional()
      });
      
      const {
        title,
      } = createPoolBody.parse(request.body);
      
      const generate = new ShortUniqueId({ length: 6 });

      const code = String(generate()).toUpperCase();

      await prisma.pool.create({
        data: {
          title,
          code,
        }
      });

      return reply.status(201).send({
        title,
        code 
      });

    } catch (error) {
      if (error instanceof z.ZodError) {

        return reply.status(500).send({
          statusCode: 500,
          error: "Params Error.",
          message: error.issues
        });
      }
      
      return reply.status(500).send(error);
    }
  });

  await fastify.listen({ port, host: '0.0.0.0' });
}

bootstrap();