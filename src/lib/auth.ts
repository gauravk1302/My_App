import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { emailOTP } from "better-auth/plugins"; // ✅ add karo
import { MongoClient } from "mongodb";
import { sendEmail } from "./email";

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  trustedOrigins: ["http://localhost:3000"],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset Your Password",
        html: `
          <h2>Reset Password</h2>
          <p>Hello ${user.name}</p>
          <a href="${url}">Reset Password</a>
        `,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify Your Email",
        html: `
          <h2>Hello ${user.name}</h2>
          <p>Click the button below to verify your email.</p>
          <a href="${url}" style="padding:10px 20px;background:black;color:white;text-decoration:none;border-radius:6px;">
            Verify Email
          </a>
        `,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },


  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await sendEmail({
          to: email,
          subject: "Your verification code",
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; text-align: center; color: #333;">
    <h2 style="color: #1a73e8; margin-bottom: 10px;">Security Verification</h2>
    <p style="font-size: 15px; color: #5f6368;">Use the following One-Time Password (OTP) to complete your action. This code is valid for <b>5 minutes</b>.</p>
    
    <div style="margin: 30px 0;">
        <span style="display: inline-block; background-color: #f8f9fa; border: 2px dashed #1a73e8; border-radius: 8px; padding: 15px 25px; font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #1a73e8; min-width: 150px;">
            ${otp}
        </span>
    </div>
    
    <p style="font-size: 12px; color: #9aa0a6; line-height: 1.5;">
        If you didn't request this code, you can safely ignore this email. <br>
        <strong>Never share your OTP with anyone.</strong>
    </p>
    
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="font-size: 11px; color: #bdc1c6;">© 2026 YourBrand Inc. All rights reserved.</p>
</div>
          `,
        });
      },
      otpLength: 6,
      expiresIn: 300,
    }),
  ],

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
});
