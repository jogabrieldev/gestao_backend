import "dotenv/config";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/validate";
import { prisma } from "./prisma/client";

const requiredEnvironment = ["DATABASE_URL", "JWT_SECRET"] as const;
for (const key of requiredEnvironment) {
  if (!process.env[key]) throw new Error(`A variável de ambiente ${key} é obrigatória.`);
}

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port <= 0) throw new Error("A variável PORT deve ser um número válido.");

const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json({ limit: "100kb" }));
app.use((req, res, next) => {
  res.locals.jwtSecret = process.env.JWT_SECRET;
  next();
});

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.use("/api", userRoutes, authRoutes, clientRoutes, supplierRoutes);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => console.log(`Servidor disponível na porta ${port}.`));

const shutdown = (signal: string) => {
  console.log(`${signal} recebido. Encerrando servidor...`);
  server.close(() => {
    void prisma.$disconnect().finally(() => process.exit(0));
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
