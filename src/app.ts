import "dotenv/config";
import express from "express";
import db from "./config/db";

db();
const port = process.env.PORT;
const app = express();

app.listen(port, () => console.log(`Running server on: ${port}`));
