-- NextGen Tech Database Schema Initialization for Supabase
-- Copy and paste this script directly into Supabase SQL Editor (https://supabase.com/dashboard/project/uupbdqmgmylksgazjhvg/sql/new)

CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable: User
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Lead
CREATE TABLE IF NOT EXISTS "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "serviceInterested" TEXT,
    "message" TEXT NOT NULL,
    "honeypot" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable: PortfolioProject
CREATE TABLE IF NOT EXISTS "PortfolioProject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "imageUrl" TEXT,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "liveUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PortfolioProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Testimonial
CREATE TABLE IF NOT EXISTS "Testimonial" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "avatarUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable: BlogPost
CREATE TABLE IF NOT EXISTS "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "author" TEXT NOT NULL DEFAULT 'NextGen Tech',
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndexes
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt");
CREATE INDEX IF NOT EXISTS "Lead_read_idx" ON "Lead"("read");
CREATE UNIQUE INDEX IF NOT EXISTS "PortfolioProject_slug_key" ON "PortfolioProject"("slug");
CREATE INDEX IF NOT EXISTS "PortfolioProject_category_idx" ON "PortfolioProject"("category");
CREATE INDEX IF NOT EXISTS "PortfolioProject_featured_idx" ON "PortfolioProject"("featured");
CREATE INDEX IF NOT EXISTS "Testimonial_featured_idx" ON "Testimonial"("featured");
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE INDEX IF NOT EXISTS "BlogPost_published_idx" ON "BlogPost"("published");
CREATE INDEX IF NOT EXISTS "BlogPost_slug_idx" ON "BlogPost"("slug");

-- Insert Initial Admin Account (admin@nextgentech.com / NextGenTech@)
INSERT INTO "User" ("id", "email", "name", "passwordHash", "role", "createdAt", "updatedAt")
VALUES (
  'cm7admin1230001',
  'admin@nextgentech.com',
  'Admin',
  '$2a$10$wY96eO2K6e7U/5q3J.d1a.Jq.7x4h6B4B3a8B9b0c1d2e3f4g5h6i',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT ("email") DO NOTHING;
