import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: "smtp.gmail.net",
  port: 465,
  secure: true,
  auth: {
    user: "aaronjau21@gmail.com",
    pass: process.env.PASSWORD_NODEMAILER,
  },
});

transporter
  .verify()
  .then(() => console.log("send and email"))
  .catch((error: any) => console.log(error.message));
