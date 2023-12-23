import { User } from "../model/User";

export const sharedEmail = async (email: string) => {
  const userEmail = await User.findOne({ email });

  return userEmail;
};

export const sharedToken = async (token: string) => {
  const userToken = await User.findOne({ token });
  return userToken;
};
