import jwt from "jsonwebtoken";
import moment from "moment";

const key = process.env.SECRET_KEY as string;
const expiresIn = moment().add(1, "days").unix();

export const generarJWT = (id: string, nombre: string, email: string) => {
  return jwt.sign({ id, nombre, email }, key, { expiresIn });
};
