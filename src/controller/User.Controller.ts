import { Request, Response } from "express";

import { User } from "../model/User";
import { hash, veri } from "../helpers/hash-password.helpers";
import { sharedPassword } from "../helpers/shared-user.helpers";

export const create = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  const userExists = await sharedPassword(email);

  if (userExists) {
    return res.status(400).send({
      msg: "Exists user",
    });
  }

  try {
    const hashPassword = hash(password);

    const user = await User.create({ nombre, email, password: hashPassword });

    return res.send({
      msg: "Successful created",
      user,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await sharedPassword(email);

  try {
    if (!user) {
      return res.status(404).send({
        msg: "User not found",
      });
    }

    const pwd = veri(password, user.password);
    if (!pwd) {
      return res.status(404).send({
        msg: "User not found",
      });
    }

    return res.send({
      msg: `Welcome ${user.nombre}`,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
