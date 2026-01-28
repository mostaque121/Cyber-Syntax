import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: ["CUSTOMER", "ADMIN", "MODERATOR"],
        required: true,
        defaultValue: "CUSTOMER",
      },
      companyName: {
        type: "string",
        required: false,
      },
      phoneNumber: {
        type: "string",
        required: false,
      },
      whatsappNumber: {
        type: "string",
        required: false,
      },
      fullAddress: {
        type: "string",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          console.log(email, type, otp);
        } else if (type === "forget-password") {
          console.log(email, type, otp);
        }
      },
    }),
    nextCookies(),
  ],
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
