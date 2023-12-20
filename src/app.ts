import "dotenv/config";
import express from "express";
import db from "./config/db";
import UserRouter from "./router/User.router";

db();
const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/api/v1/auth", UserRouter);

app.listen(port, () => console.log(`Running server on: ${port}`));
