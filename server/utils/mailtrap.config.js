// Import the required modules using ES module syntax
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import dotenv from "dotenv";
// Token for Mailtrap

dotenv.config();
// Create a transport object using Mailtrap
export const transport = nodemailer.createTransport(
 MailtrapTransport({
  token: process.env.MAIL_TOKEN,
 }),
);

// Sender and recipient details
export const sender = {
 address: "hello@demomailtrap.com",
 name: "Mailtrap Test",
};
const recipients = ["abdallahbeedo855@gmail.com"];

// Send the email
transport
 .sendMail({
  from: sender,
  to: recipients,
  subject: "You are awesome!",
  text: "Congrats for sending test email with Mailtrap!",
  category: "Integration Test",
 })
 .then(console.log)
 .catch(console.error);
