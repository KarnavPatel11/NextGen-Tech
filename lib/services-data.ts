export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  iconName: string;
  features: string[];
  benefits: string[];
}

export const services: Service[] = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Digital Marketing",
    description:
      "Data-driven campaigns that amplify your brand reach and convert audiences into loyal customers across every digital channel.",
    longDescription:
      "Our digital marketing strategies combine cutting-edge analytics with creative storytelling to deliver measurable results. We craft multi-channel campaigns that span search engines, display networks, email, and content marketing — all optimized in real-time to maximize your ROI. From brand awareness to lead generation and customer retention, we build full-funnel strategies tailored to your unique business goals.",
    iconName: "Globe",
    features: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click Advertising (PPC)",
      "Content Marketing Strategy",
      "Email Marketing Automation",
      "Conversion Rate Optimization",
      "Analytics & Performance Tracking",
    ],
    benefits: [
      "Increase organic traffic by up to 300%",
      "Lower customer acquisition costs",
      "Build sustainable brand authority",
      "Data-backed decision making",
    ],
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    shortTitle: "Social Media",
    description:
      "Strategic social campaigns that build communities, drive engagement, and transform followers into brand advocates.",
    longDescription:
      "We don't just post — we engineer social media experiences. Our team develops platform-specific strategies for Instagram, LinkedIn, TikTok, X, and Facebook that resonate with your target audience. Through a blend of organic content, paid advertising, and influencer partnerships, we create campaigns that generate measurable business outcomes while building an authentic brand presence.",
    iconName: "Share2",
    features: [
      "Platform-Specific Strategy",
      "Paid Social Advertising",
      "Influencer Marketing",
      "Community Building",
      "Social Listening & Monitoring",
      "Performance Analytics",
    ],
    benefits: [
      "Grow engaged follower base",
      "Drive qualified website traffic",
      "Build authentic brand community",
      "Maximize social ad ROI",
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    shortTitle: "Social Management",
    description:
      "End-to-end social presence management — from content creation to community engagement to reputation monitoring.",
    longDescription:
      "Managing a consistent, engaging social media presence is a full-time job. Our social media management service handles everything: content calendars, graphic design, copywriting, scheduling, community management, and crisis response. We become an extension of your team, maintaining your brand voice across all platforms while you focus on running your business.",
    iconName: "Users",
    features: [
      "Content Calendar Planning",
      "Graphic Design & Visual Content",
      "Copywriting & Brand Voice",
      "Community Management",
      "Reputation Monitoring",
      "Monthly Reporting & Insights",
    ],
    benefits: [
      "Consistent brand presence 24/7",
      "Professional content creation",
      "Faster response to customers",
      "Free up your team's time",
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Dev",
    description:
      "High-performance, beautifully crafted websites and web applications built with cutting-edge technologies.",
    longDescription:
      "We architect and build web experiences that set new standards. From blazing-fast marketing sites to complex SaaS platforms, our development team leverages Next.js, React, and modern cloud infrastructure to deliver solutions that are fast, accessible, secure, and scalable. Every project is built with clean code, SEO best practices, and a mobile-first philosophy that ensures your digital presence performs flawlessly.",
    iconName: "Code",
    features: [
      "Custom Website Development",
      "Progressive Web Apps (PWAs)",
      "SaaS Application Development",
      "CMS Integration & Headless CMS",
      "API Development & Integration",
      "Performance Optimization",
    ],
    benefits: [
      "Lightning-fast page load speeds",
      "Mobile-first responsive design",
      "SEO-optimized architecture",
      "Scalable & maintainable codebase",
    ],
  },
  {
    slug: "app-development",
    title: "App Development",
    shortTitle: "App Dev",
    description:
      "Native and cross-platform mobile applications that deliver exceptional user experiences on every device.",
    longDescription:
      "We build mobile applications that users love. Whether you need a native iOS/Android app or a cross-platform solution with React Native or Flutter, our team delivers polished, performant applications with intuitive UX. From concept and prototyping through development, testing, and App Store deployment, we handle the complete mobile lifecycle.",
    iconName: "Smartphone",
    features: [
      "iOS & Android Native Development",
      "Cross-Platform (React Native / Flutter)",
      "UI/UX Design & Prototyping",
      "Backend & API Development",
      "App Store Optimization",
      "Maintenance & Updates",
    ],
    benefits: [
      "Reach users on every platform",
      "Intuitive, polished user experience",
      "Robust performance & security",
      "Ongoing support & updates",
    ],
  },
  {
    slug: "ai-integration-automation",
    title: "AI Integration & Automation",
    shortTitle: "AI & Automation",
    description:
      "Harness artificial intelligence and intelligent automation to streamline operations and unlock new capabilities.",
    longDescription:
      "The AI revolution isn't coming — it's here. We help businesses integrate large language models, machine learning, computer vision, and intelligent automation into their workflows. From custom chatbots and AI-powered customer support to predictive analytics and process automation, we build solutions that make your business smarter, faster, and more efficient.",
    iconName: "Bot",
    features: [
      "Custom AI/LLM Integration",
      "Intelligent Chatbots & Assistants",
      "Process Automation (RPA)",
      "Predictive Analytics",
      "Computer Vision Solutions",
      "AI Strategy Consulting",
    ],
    benefits: [
      "Reduce operational costs by 40%+",
      "24/7 intelligent customer support",
      "Data-driven business insights",
      "Competitive technology advantage",
    ],
  },
  {
    slug: "festival-poster-logo-design",
    title: "Festival Poster & Logo Design",
    shortTitle: "Poster & Logo Design",
    description:
      "Create eye-catching festival posters and memorable logo designs that strengthen your brand identity.",
    longDescription:
      "Create eye-catching festival posters and memorable logo designs that strengthen your brand identity. We craft creative, modern, and professional visuals tailored to your business, helping you connect with customers, build trust, and leave a lasting impression across social media, print, and digital platforms. From custom festival greetings and promotional graphics to complete brand identity and logo suites, our design team ensures your visuals stand out every single time.",
    iconName: "Palette",
    features: [
      "Custom Festival & Event Posters",
      "Professional Logo Design & Re-branding",
      "Social Media Branding Kits",
      "High-Resolution Print & Digital Formats",
      "Creative Typography & Custom Illustration",
      "Brand Identity Guidelines",
    ],
    benefits: [
      "Strengthen brand identity & recognition",
      "Connect with customers on festivals & events",
      "Leave a lasting impression across all platforms",
      "Custom, modern, and professional artwork",
    ],
  },
  {
    slug: "ecommerce-solutions",
    title: "E-Commerce Solutions",
    shortTitle: "E-Commerce",
    description:
      "Scalable online stores and commerce platforms that turn browsers into buyers and maximize revenue per visitor.",
    longDescription:
      "We build e-commerce experiences that sell. From custom Shopify and WooCommerce stores to fully bespoke headless commerce platforms, our team creates shopping experiences optimized for conversion. We handle everything from product catalog architecture and payment integration to inventory management and post-purchase automation.",
    iconName: "ShoppingCart",
    features: [
      "Custom E-Commerce Development",
      "Shopify / WooCommerce Solutions",
      "Headless Commerce Architecture",
      "Payment Gateway Integration",
      "Inventory & Order Management",
      "Conversion Optimization",
    ],
    benefits: [
      "Higher conversion rates",
      "Seamless checkout experience",
      "Scalable to millions of products",
      "Integrated analytics & insights",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
