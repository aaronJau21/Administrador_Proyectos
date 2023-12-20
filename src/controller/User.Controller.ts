import { Request, Response } from "express";

import { User } from "../model/User";

export const create = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  try {
    const user = await User.create({ nombre, email, password });

    res.send({
      msg: "Successful created",
      user,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
