# Next.js Auth Template

Better Auth + MongoDB + Next.js 14 boilerplate.

## Features
- Email/Password auth
- Email OTP verification
- Google OAuth
- Forgot/Reset password
- Protected routes (middleware)

## Setup

1. Clone this template
2. Install dependencies
```bash
   npm install
```
3. `.env.local` banao
```env
   MONGODB_URI=
   BETTER_AUTH_SECRET=
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   MAILTRAP_HOST=
   MAILTRAP_PORT=
   MAILTRAP_USER=
   MAILTRAP_PASS=
   EMAIL_FROM=
```
4. Run
```bash
   npm run dev
```
