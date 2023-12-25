import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../model/User";

interface ResUser extends Request {
  user?: any;
}

export const checkAuth = async (
  req: ResUser,
  res: Response,
  next: NextFunction
) => {
  let token;
  const kwy = process.env.SECRET_KEY as string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, kwy);
      req.user = await User.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );

      return next();
    } catch (error) {
      return res.status(404).send({
        msg: "Error",
        ERROR: error,
      });
    }
  }

  if (!token) {
    return res.status(401).send({
      msg: "Invalid token",
    });
  }
  next();
};
