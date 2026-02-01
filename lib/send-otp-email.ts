import nodemailer from "nodemailer";
import brevoTransport from "nodemailer-brevo-transport";

const transporter = nodemailer.createTransport(
  new brevoTransport({
    apiKey: process.env.SENDINBLUE_API_KEY!,
  }),
);

type OTPType = "email-verification" | "forget-password" | "sign-in";

export async function sendOTPEmail(
  email: string,
  otp: string,
  type: OTPType,
): Promise<void> {
  const getEmailContent = () => {
    switch (type) {
      case "email-verification":
        return {
          subject: "Verify Your Email Address",
          title: "Email Verification",
          message: "Use the following OTP to verify your email address:",
        };
      case "forget-password":
        return {
          subject: "Reset Your Password",
          title: "Password Reset",
          message: "Use the following OTP to reset your password:",
        };
      case "sign-in":
        return {
          subject: "Sign In OTP",
          title: "Sign In Verification",
          message: "Use the following OTP to sign in to your account:",
        };
    }
  };

  const { subject, title, message } = getEmailContent();

  const mailOptions = {
    from: process.env.SENDER_EMAIL!,
    to: email,
    subject,
    text: `
------------------------------------------------------------
                ${title}
------------------------------------------------------------

${message}

        OTP: ${otp}

This code will expire in 10 minutes.
If you did not request this, please ignore this email.

------------------------------------------------------------
    `,
  };

  await transporter.sendMail(mailOptions);
}
