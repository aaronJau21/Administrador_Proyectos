import { User } from "../model/User";

export const sharedPassword = async (email: string) => {
  const userEmail = await User.findOne({ email });

  return userEmail;
};
