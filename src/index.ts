import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(express.json());

const port = process.env.PORT || 3000;

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("Authorization");

  if (!authorizationHeader) {
    res.set("WWW-Authenticate", "Basic");

    return res.status(401).send("No autenticado.");
  }

  const credentials = Buffer.from(authorizationHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  const username = credentials[0];
  const password = credentials[1];

  if (!(username === "admin" && password === "grupo1")) {
    res.set("WWW-Authenticate", "Basic");

    return res.status(401).send("No autenticado");
  }

  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Grupo 1 en Programacion Movil 1");
});

app.listen(port, () => {
  console.log(`[server]: Server running in port ${port}`);
});
