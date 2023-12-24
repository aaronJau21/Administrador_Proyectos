import { Request, Response } from "express";

import { User } from "../model/User";
import { hash, veri } from "../helpers/hash-password.helpers";
import { sharedEmail, sharedToken } from "../helpers/shared-user.helpers";
import { generarId } from "../helpers/generarId";
import { generarJWT } from "../services/jwt.services";
import { transporter } from "../config/nodemailer";

export const create = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  const userExists = await sharedEmail(email);

  if (userExists) {
    return res.status(400).send({
      msg: "Exists user",
    });
  }

  try {
    const hashPassword = hash(password);

    const user = await User.create({
      nombre,
      email,
      password: hashPassword,
      token: generarId(),
    });

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

  const user = await sharedEmail(email);

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

    const token = generarJWT(user.id, user.nombre, user.email);

    return res.send({
      msg: `Welcome ${user.nombre}`,
      user: {
        nombre: user.nombre,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const confirmCount = async (req: Request, res: Response) => {
  const { token } = req.params;

  const userToken = await sharedToken(token);
  if (!userToken) {
    return res.status(404).send({
      msg: "Not found token",
    });
  }

  try {
    userToken.confirmado = true;
    userToken.token = "";
    await userToken.save();
    await transporter.sendMail({
      from: "mensaje enviado por <aaronjau21@gmail.com>",
      to: userToken.email,
      html: `
      

      <a href='http://localhost:4000/api/v1/auth/confirm/${token}'>
        Confirmar cuenta
      </a>

      `,
    });
    return res.send({
      msg: "Confirmed User",
    });
  } catch (error) {
    console.log(error);
  }
};

export const resedPasswordToken = async (req: Request, res: Response) => {
  const { email } = req.params;

  const user = await sharedEmail(email);

  if (!user) {
    return res.status(404).send({
      msg: `Not found email: ${email}`,
    });
  }

  try {
    user.confirmado = false;
    user.token = generarId();
    await user.save();
    return res.send({
      msg: "Confirm your UserName in your email please",
      token: user.token,
    });
  } catch (error: any) {
    return res.status(500).send({
      msg: "Error Server",
      error: error.message,
    });
  }
};

export const resedPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  const UserToken = await sharedToken(token);

  if (!UserToken) {
    return res.status(404).send({
      msg: "Token Invalid",
    });
  }

  try {
    const hashPassword = hash(password);
    UserToken.password = hashPassword;
    UserToken.token = "";
    UserToken.confirmado = true;

    if (!UserToken.password) {
      return res.status(400).send({
        msg: "The password field must have content",
      });
    }

    await UserToken.save();
    return res.send({
      msg: "Password updated correctly",
    });
  } catch (error: any) {
    return res.status(500).send({
      msg: "Error Server",
      error: error.message,
    });
  }
};
