import bcrypt from "bcrypt";

export const hash = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const veri = (password: string, hashPassword: string) => {
  const pass = bcrypt.compareSync(password, hashPassword);

  return pass;
};
