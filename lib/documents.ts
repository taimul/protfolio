// Extra detail used only by the printable /resume and /cv pages (and the PDFs built from them).
// Everything shared with the site (roles, projects, stack, education) lives in content.ts.
import { earlier, education, experience, live, otherWork, profile, stack } from "./content";

export { earlier, education, experience, live, otherWork, profile, stack };

export const doc = {
  title: "Full Stack Developer · React, Next.js, TypeScript, Node.js",
  phone: "+880 1710 095595",
  summary:
    "Full stack developer with 3+ years of experience building production web platforms: payment gateways, e-commerce, and AI products. Strongest on the front end (React, Next.js, TypeScript, Redux Toolkit, Tailwind CSS), and comfortable ",
  resumeSummaryEnd: "shipping Node.js/Express APIs when a team needs them.",
  cvSummaryEnd:
    "building Node.js and Express APIs when a team needs them. Works well in a team with designers and back-end engineers, learns new tools quickly, and delivers under tight deadlines.",
};

/** Skills that appear on the CV on top of the shared stack. */
export const cvExtraSkills: Record<string, string[]> = {
  "Front end": ["Bootstrap", "Recharts", "TanStack Table"],
  "Back end": ["Mongoose"],
  "AI and payments": ["Google Maps"],
  Tools: ["Photoshop"],
};

/** Page-format a period from content.ts: "2025 to now" becomes "2025 – Present". */
export const docPeriod = (p: string) => p.replace(" to now", " – Present").replace(" to ", " – ");
export const docOrg = (o: string) => o.replace(", UAE", " (UAE)");

/** Bullets per role, same order as `experience`. **bold** marks a product name. */
export const jobBullets: { resume: string[]; cv: string[] }[] = [
  {
    resume: [
      "Build admin dashboards and customer-facing Next.js storefronts for the company's products (**Paytiks**, **Fleximart**, **GamersTopup**) with React, TypeScript, Redux Toolkit and Tailwind CSS, working in a team with back-end engineers.",
      "Contribute backend features in Node.js, Express and Prisma when needed: REST endpoints, authentication, and background jobs on Redis queues.",
    ],
    cv: [
      "Build the admin and merchant dashboards for **Paytiks**, a multi-gateway payment platform for merchants: transaction and settlement tables, charts and report export.",
      "Develop the Next.js storefronts and admin panels for **Fleximart** and **GamersTopup**, with multi-language support, form validation and international phone and address handling.",
      "Contribute backend features in Node.js, Express and Prisma when needed: REST endpoints, authentication, and background jobs on Redis queues.",
      "Work in a team with back-end engineers and designers, integrating APIs and keeping UI components consistent across products.",
    ],
  },
  {
    resume: [
      "Built responsive, cross-browser interfaces with Next.js in collaboration with designers and back-end developers.",
      "Led development of core front-end features and integrated APIs to deliver the full user flow.",
      "Cut duplicated code by introducing reusable components and modern JavaScript patterns.",
    ],
    cv: [
      "Built responsive, cross-browser interfaces with Next.js in collaboration with designers and back-end developers.",
      "Led development of core front-end features and integrated APIs to deliver the full user flow.",
      "Cut duplicated code by introducing reusable components and modern JavaScript patterns.",
    ],
  },
  {
    resume: [
      "Developed front-end and back-end features with the MERN stack, Next.js and TypeScript.",
      "Took part in code reviews, giving feedback that raised code quality and kept to team best practices.",
    ],
    cv: [
      "Developed front-end and back-end features with the MERN stack, Next.js and TypeScript.",
      "Took part in code reviews, giving feedback that raised code quality and kept to team best practices.",
    ],
  },
  {
    resume: [
      "Contributed to team web applications in React, Node.js and Express, and built the Weero Furniture e-commerce project.",
    ],
    cv: [
      "Contributed to team web applications in React, Node.js and Express, and built the Weero Furniture e-commerce project.",
    ],
  },
];

type ProjectDoc = {
  title: string; // shown after the product name, lower case
  resume: string[];
  cv: string[];
  tech: string;
};

/** Detail for each live product, keyed by its name in content.ts. */
export const projectDocs: Record<string, ProjectDoc> = {
  Paytiks: {
    title: "payment gateway for merchants",
    resume: [
      "Admin and merchant dashboards for a multi-gateway payment platform: transaction and settlement tables, charts and report export.",
    ],
    cv: [
      "Admin and merchant dashboards for a multi-gateway payment platform with transaction and settlement tables, charts and report export.",
      "Part of a team; I worked mainly on the front end.",
    ],
    tech: "React, TypeScript, Redux Toolkit, Tailwind CSS, Next.js",
  },
  Fleximart: {
    title: "multi-language e-commerce platform",
    resume: ["Next.js storefront and admin panel on a Node.js/Prisma backend with Redis queues and two-factor login."],
    cv: [
      "Next.js storefront and admin panel on a Node.js and Prisma backend with Redis queues and two-factor login.",
      "Multi-language pages, country and phone validation, and reCAPTCHA-protected forms.",
    ],
    tech: "Next.js, TypeScript, Zustand, next-intl, Node.js, Express, Prisma, Redis, BullMQ",
  },
  GamersTopup: {
    title: "game top-up store",
    resume: ["Game top-up store built on the same platform as Fleximart: Next.js storefront and admin panel."],
    cv: ["Game top-up store built on the same platform as Fleximart: Next.js storefront and admin panel."],
    tech: "Next.js, TypeScript, Zustand, next-intl, Node.js, Prisma, Redis",
  },
  Voruai: {
    title: "AI chat platform",
    resume: [
      "Customer app with AI chat, wallet, history and manual payments, rendering Markdown, math and code; separate admin panel; Node.js API connected to Claude, OpenAI and Gemini; background worker that reads PDF, Word and Excel uploads.",
    ],
    cv: [
      "Customer app with AI chat, wallet, history and manual payments, rendering Markdown, math and code blocks.",
      "Separate admin panel, and a Node.js API connected to Claude, OpenAI and Gemini.",
      "Background worker that reads PDF, Word and Excel uploads, with virus scanning and token counting.",
    ],
    tech: "React, Vite, Redux Toolkit, Tailwind CSS, Node.js, Express, Prisma, Redis, AWS S3, Sentry",
  },
  Ailoris: {
    title: "AI SEO automation platform",
    resume: [
      "Pulls content from REST or MySQL sources, generates SEO content with Claude, Gemini or GPT, and pushes it back on a schedule, with live progress and a cookie-based admin login.",
    ],
    cv: [
      "Pulls content from REST or MySQL sources, generates SEO content with Claude, Gemini or GPT, and pushes it back on a schedule.",
      "Live progress updates and a cookie-based admin login with rate limiting and input validation.",
    ],
    tech: "React, TypeScript, Redux Toolkit, Node.js, Express, MySQL, Zod, node-cron, WebSocket",
  },
  "ProBuild Supply Co": {
    title: "marketing site",
    resume: ["Animated landing site for an Australian building supply company."],
    cv: ["Animated landing site for an Australian building supply company."],
    tech: "Next.js, React, GSAP",
  },
};

/** Earlier projects shown on the CV, keyed by name in content.ts. */
export const earlierDocs: Record<string, { title: string; dates: string; bullets: string[]; tech: string }> = {
  Bitasouq: {
    title: "crypto gold e-commerce",
    dates: "Oct 2024 – Jan 2025",
    bullets: ["Bitcoin checkout with live payment status, role-based admin dashboard, and Google Maps address verification."],
    tech: "React, TypeScript, RTK Query, Tailwind CSS, Node.js, Express, MySQL, Sequelize",
  },
  "Weero Furniture": {
    title: "e-commerce (full stack)",
    dates: "May – Jun 2023",
    bullets: [
      "Responsive storefront with product, blog and payment management, plus an admin dashboard for products, blogs, users and orders.",
    ],
    tech: "React, Redux Toolkit, Tailwind CSS, Node.js, Express, MongoDB, Cloudinary, SSL Commerce",
  },
  MeatMoot: {
    title: "restaurant management API (backend)",
    dates: "Jun – Jul 2023",
    bullets: ["Branch and product management, table booking, orders, employee roles and notifications, documented with Swagger."],
    tech: "TypeScript, Node.js, Express, MySQL, Sequelize, Socket.IO, JWT, Swagger UI",
  },
};

export const otherWorkNote =
  "React and Next.js client and admin applications, some with Express and Prisma back ends.";

export const cvEducation = [
  { degree: "B.Sc. in CSE", institute: education.school, group: "Computer Science and Engineering", year: "2021", result: education.result.replace("CGPA ", "CGPA ") },
  { degree: "H.S.C.", institute: "Brahmanbaria Govt. College", group: "Science", year: "2011", result: "GPA 3.00 / 5.00" },
  { degree: "S.S.C.", institute: "Annada Govt. High School", group: "Science", year: "2009", result: "GPA 3.50 / 5.00" },
];

export const personal = [
  ["Name", profile.name],
  ["Date of birth", "10 May 1993"],
  ["Nationality", "Bangladeshi"],
  ["Languages", education.languages],
];
