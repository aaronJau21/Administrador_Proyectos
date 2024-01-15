import "dotenv/config";
import cors from "cors";
import morgan from "morgan";

import express from "express";
import db from "./config/db";
import UserRouter from "./router/User.router";
import ProyectRouter from "./router/Proyect.router";
import TaskRouter from "./router/Task.router";

db();
const port = process.env.PORT;
const app = express();

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/proyects", ProyectRouter);
app.use("/api/v1/task", TaskRouter);

app.listen(port, () => console.log(`Running server on: ${port}`));
