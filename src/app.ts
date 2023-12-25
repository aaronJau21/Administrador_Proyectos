import "dotenv/config";
import cors from "cors";
import morgan from "morgan";

import express from "express";
import db from "./config/db";
import UserRouter from "./router/User.router";

db();
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", UserRouter);

app.listen(port, () => console.log(`Running server on: ${port}`));
