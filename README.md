# NextGen Tech — Digital Agency Website

A full-stack, modern, visually striking 3D website built for a digital agency. 

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (inline theme)
- **3D & Animation**: React Three Fiber, Framer Motion, GSAP
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Email**: Resend
- **Icons**: Lucide React

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL database (local or hosted, e.g., Supabase/Neon)

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Rename `.env.example` to `.env` and fill in your details:
```env
# Update with your actual PostgreSQL connection string
DATABASE_URL=postgresql://user:password@localhost:5432/nextgentech

# Generate a secret: openssl rand -base64 32
AUTH_SECRET=your_secret_here
AUTH_URL=http://localhost:3000

# For contact form emails
RESEND_API_KEY=your_resend_api_key

# Default admin credentials
ADMIN_EMAIL=admin@nextgentech.com
ADMIN_PASSWORD=admin123
```

### 4. Database Setup
Push the schema to your database and generate the Prisma Client:
```bash
npm run db:push
npm run db:generate
```

Seed the database with placeholder data (Admin user, Portfolio projects, Testimonials, Blog posts):
```bash
npm run db:seed
```

### 5. Running the App
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

## Admin Dashboard
Access the CMS at `/admin`. Log in using the credentials defined in your `.env` file (default: `admin@nextgentech.com` / `admin123`).

From the dashboard you can manage:
- Lead submissions from the contact form
- Portfolio projects
- Testimonials
- Blog posts

## Design System
The site uses a unified design system configured via CSS variables in `app/globals.css`. It features a dark-mode-first "AI lab meets creative studio" aesthetic with a charcoal background (`#0A0A0B`) and electric violet/cyan accents.
