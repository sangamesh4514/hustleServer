import Fastify from "fastify";
import "dotenv/config";
import fastifyCors from "@fastify/cors";
import mongoose, { ConnectOptions } from "mongoose";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import hustlerRoutes from "./routes/hustlerRoutes";
import commentRoutes from "./routes/commentRoutes";

const fastify = Fastify();
fastify.register(fastifyCors);
fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(userRoutes, { prefix: "/users" });
fastify.register(hustlerRoutes, { prefix: "/hustlers" });
fastify.register(commentRoutes, { prefix: "/comments" });

const CONNECTION_URL = process.env.CONNECTION_URL || "";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(async () => {
    console.log("connected to database");
    const serverPort = parseInt(process.env.PORT || "");
    const port = Number.isInteger(serverPort) ? serverPort : 3000;
    await fastify.listen({ port: port, host: "0.0.0.0" });
    console.log(`Server started at port ${port}`);
  })
  .catch((err) => {
    console.log(err);
  });
