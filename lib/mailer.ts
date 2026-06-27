import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = parseInt(process.env.SMTP_PORT || "465", 10);
const user = process.env.SMTP_USER || "ventas.dellcom@gmail.com";
const pass = process.env.SMTP_PASS;

if (!pass) {
  console.warn("[MAILER WARNING]: SMTP_PASS variable is empty or undefined in env!");
}
if (!user) {
  console.warn("[MAILER WARNING]: SMTP_USER variable is empty or undefined in env!");
}

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465, 
  auth: {
    user: user || "",
    pass: pass || "",
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const FROM = `DELLCOM SAC <${user || "ventas.dellcom@gmail.com"}>`;

