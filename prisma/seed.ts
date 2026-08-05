import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not set. Cannot seed.");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // ========== Admin User ==========
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@nextgentech.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@nextgentech.com",
      name: "Admin",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

  // ========== Portfolio Projects ==========
  const projects = [
    {
      title: "TechVista Platform Redesign",
      slug: "techvista-platform-redesign",
      description:
        "Complete redesign of a SaaS analytics platform with a new design system, improved UX, and 40% faster load times.",
      longDescription:
        "TechVista needed a complete overhaul of their analytics dashboard. We rebuilt the entire frontend with Next.js and implemented a custom design system that reduced development time for new features by 60%. The result was a 40% improvement in page load times and a 25% increase in user engagement.",
      category: "web-development",
      tags: ["Next.js", "React", "Design System", "TypeScript"],
      featured: true,
      liveUrl: "https://techvista.example.com",
    },
    {
      title: "GrowthPulse Social Campaign",
      slug: "growthpulse-social-campaign",
      description:
        "Multi-platform social media campaign that grew engagement by 300% and drove 50K qualified leads in 6 months.",
      longDescription:
        "GrowthPulse, a B2B SaaS startup, needed to build brand awareness from scratch. We developed a comprehensive social media strategy spanning LinkedIn, Twitter, and Instagram.",
      category: "social-media-marketing",
      tags: ["Instagram", "LinkedIn", "Content Strategy", "Paid Social"],
      featured: true,
    },
    {
      title: "Nexus AI Customer Support",
      slug: "nexus-ai-customer-support",
      description:
        "Custom AI chatbot integration that handles 80% of customer queries automatically, reducing support costs by 60%.",
      longDescription:
        "Nexus Commerce was drowning in customer support tickets. We built a custom AI chatbot powered by GPT-4 that understands context, handles complex queries, and seamlessly escalates to human agents when needed.",
      category: "ai-integration-automation",
      tags: ["LLM", "Chatbot", "Python", "Automation"],
      featured: true,
    },
    {
      title: "Meridian E-Commerce Store",
      slug: "meridian-ecommerce-store",
      description:
        "Headless commerce platform built with Next.js and Shopify that increased conversions by 180%.",
      longDescription:
        "Meridian Group needed an e-commerce experience as premium as their products. We built a headless commerce solution using Next.js as the frontend and Shopify as the backend.",
      category: "ecommerce-solutions",
      tags: ["Shopify", "Next.js", "Headless Commerce", "Stripe"],
      featured: false,
    },
    {
      title: "CloudSync Mobile App",
      slug: "cloudsync-mobile-app",
      description:
        "Cross-platform mobile app for file synchronization with real-time collaboration features.",
      longDescription:
        "CloudSync Solutions needed a mobile companion app for their desktop file sync product. We built a cross-platform app using React Native with real-time collaboration features and offline support.",
      category: "app-development",
      tags: ["React Native", "Firebase", "Real-time", "Encryption"],
      featured: false,
    },
    {
      title: "Quantum SEO & Content Strategy",
      slug: "quantum-seo-content-strategy",
      description:
        "Comprehensive SEO overhaul that increased organic traffic by 250% and improved domain authority from 25 to 55.",
      longDescription:
        "Quantum's website was invisible on search engines. We performed a complete technical SEO audit, rebuilt their content architecture, and implemented a data-driven content strategy.",
      category: "digital-marketing",
      tags: ["SEO", "Content Marketing", "Analytics", "Keyword Research"],
      featured: false,
    },
    {
      title: "Velocity Real-Time Dashboard",
      slug: "velocity-realtime-dashboard",
      description:
        "Real-time analytics dashboard for logistics with live map tracking and AI predictions.",
      longDescription:
        "Velocity Logistics needed to track thousands of shipments in real time. We built a custom dashboard with live map visualization, automated alerts, and AI-powered delivery time predictions.",
      category: "web-development",
      tags: ["React", "D3.js", "WebSockets", "Machine Learning"],
      featured: true,
    },
    {
      title: "Apex Workflow Automation",
      slug: "apex-workflow-automation",
      description:
        "End-to-end workflow automation for financial services, reducing manual processing time by 75%.",
      longDescription:
        "Apex Financial Services had dozens of manual processes costing millions in labor. We automated 35 key workflows using RPA and custom Python scripts.",
      category: "ai-integration-automation",
      tags: ["RPA", "Python", "Machine Learning", "Finance"],
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.portfolioProject.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`✅ ${projects.length} portfolio projects seeded`);

  // ========== Testimonials ==========
  const testimonials = [
    {
      clientName: "Sarah Chen",
      company: "TechVista Inc.",
      role: "CEO",
      content:
        "NextGen Tech transformed our entire digital presence. The AI integration they built saves us 20+ hours per week, and our new website converts 3x better than before.",
      rating: 5,
      featured: true,
    },
    {
      clientName: "Marcus Rodriguez",
      company: "GrowthPulse",
      role: "Head of Marketing",
      content:
        "The social media strategy NextGen Tech developed for us was a game-changer. We went from 2K to 50K engaged followers in 6 months.",
      rating: 5,
      featured: true,
    },
    {
      clientName: "Emily Watson",
      company: "Nexus Commerce",
      role: "Founder",
      content:
        "Our e-commerce platform needed a complete overhaul. NextGen Tech delivered a stunning, lightning-fast store that increased our revenue by 180%.",
      rating: 5,
      featured: true,
    },
    {
      clientName: "David Park",
      company: "CloudSync Solutions",
      role: "CTO",
      content:
        "As a fellow tech company, we had high standards. NextGen Tech exceeded every one. Their app development team built a cross-platform solution that our users love.",
      rating: 5,
      featured: true,
    },
    {
      clientName: "Aisha Patel",
      company: "Meridian Group",
      role: "Digital Director",
      content:
        "The digital transformation consulting from NextGen Tech helped us modernize decade-old processes. We're now fully cloud-based and automated.",
      rating: 5,
      featured: true,
    },
    {
      clientName: "James Liu",
      company: "Velocity Logistics",
      role: "VP of Technology",
      content:
        "The real-time dashboard NextGen Tech built for us processes 100K data points per minute. Our delivery accuracy improved by 35%.",
      rating: 5,
      featured: true,
    },
  ];

  await prisma.testimonial.deleteMany();
  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`);

  // ========== Blog Posts ==========
  const blogPosts = [
    {
      title: "The Future of AI in Business: What to Expect in 2026",
      slug: "future-of-ai-business-2026",
      excerpt:
        "AI is reshaping every industry. Here's what forward-thinking businesses need to know about leveraging AI in 2026.",
      content:
        "Artificial intelligence is no longer a futuristic concept — it's a present-day competitive advantage...",
      published: true,
      author: "NextGen Tech",
      tags: ["AI", "Business", "Strategy"],
    },
    {
      title: "Why Your Website Speed Matters More Than You Think",
      slug: "website-speed-matters",
      excerpt:
        "Every second of load time costs you conversions. Here's the data behind web performance.",
      content:
        "A one-second delay in page load time can reduce conversions by 7%. For an e-commerce site doing $100K/day, that's $2.5M in lost revenue per year...",
      published: true,
      author: "NextGen Tech",
      tags: ["Web Development", "Performance", "SEO"],
    },
    {
      title: "Social Media in 2026: Platform-Specific Strategies That Work",
      slug: "social-media-strategies-2026",
      excerpt:
        "Each social platform requires a unique approach. Here's our breakdown of what's working right now.",
      content:
        "Gone are the days when you could post the same content across all platforms and expect results...",
      published: false,
      author: "NextGen Tech",
      tags: ["Social Media", "Marketing", "Strategy"],
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✅ ${blogPosts.length} blog posts seeded`);

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
