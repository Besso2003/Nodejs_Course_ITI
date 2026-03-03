import nodemailer from "nodemailer";
import { template } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

export async function sendEmail(email) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bassantalikamal@gmail.com",
      pass: "uocs lytx stfo zdgp",
    },
  });

let emailToken = jwt.sign(email, "emailToken")

  const info = await transporter.sendMail({
    from: '"From My App" <bassantalikamal@gmail.com>',
    to: email,
    subject: "Welcome to My App 🎉",
    html: template(emailToken),
  });

  console.log("Message sent:", info.messageId);
}