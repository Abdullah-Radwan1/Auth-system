import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
 PASSWORD_RESET_REQUEST_TEMPLATE,
 PASSWORD_RESET_SUCCESS_TEMPLATE,
 VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemp.js";
export const sendVerification = async (email, verificationToken) => {
 const recipient = [{ email }];
 try {
  const response = await mailtrapClient.send({
   from: sender,
   to: recipient,
   subject: "Verify your email",
   html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
   category: "Email Verification",
  });

  console.log("Email sent successfully", response);
 } catch (error) {
  console.error(`Error sending verification`, error);

  throw new Error(`Error sending verification email: ${error}`);
 }
};

export const sendWelcomeEmail = async (email, name) => {
 const recipient = [{ email }];
 try {
  const response = await mailtrapClient.send({
   from: sender,
   to: recipient,
   template_uuid: "01646a6c-31b1-40fc-a0da-c52dc837458d",
   template_variables: {
    "name": name,
    "company_info_name": "Abdullah's company",
    "company_info_address": "Egypt, Palestine",
   },
  });
  console.log("welcoem Email was sent successfully ", response);
 } catch (error) {
  console.error(`Error sending verification`, error);

  throw new Error(`Error sending welcome email: ${error}`);
 }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
 const recipient = [{ email }];
 try {
  const response = await mailtrapClient.send({
   from: sender,
   to: recipient,
   subject: "reset your password",
   html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
   category: "password reset",
  });

  console.log("password reset successfully", response);
 } catch (error) {
  console.error(`Error reseting password`, error);
 }
};
