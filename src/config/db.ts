import mongoose from "mongoose";

const db_uri: string = process.env.DB_URI as string;

const db = async () => {
  try {
    await mongoose.connect(db_uri);
    console.log("Successful Connection");
  } catch (error) {
    console.log(error);
  }
};

export default db;
