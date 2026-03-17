# Next.js Auth Template

Better Auth + MongoDB + Next.js boilerplate with full authentication system.

## Features

- Email/Password authentication
- Email OTP verification
- Google OAuth
- Forgot/Reset password flow
- Protected routes via middleware

## Tech Stack

- Next.js 14
- Better Auth v1.5
- MongoDB
- Nodemailer + Mailtrap
- Tailwind CSS + shadcn/ui

## Getting Started

### 1. Clone this template

Click **"Use this template"** button on GitHub.

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env.local
```

Fill in your values in `.env.local`:

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Random secret string |
| `BETTER_AUTH_URL` | Your app URL |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Your app URL (public) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `MAILTRAP_HOST` | Mailtrap SMTP host |
| `MAILTRAP_PORT` | Mailtrap SMTP port |
| `MAILTRAP_USER` | Mailtrap username |
| `MAILTRAP_PASS` | Mailtrap password |
| `EMAIL_FROM` | Sender email address |

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
