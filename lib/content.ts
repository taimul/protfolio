export const profile = {
  name: "Taimul Haque Pathan",
  role: "Full stack developer",
  location: "Dhaka, Bangladesh",
  employer: "Flexitech LLC FZ",
  email: "taimul.haque@gmail.com",
  github: "https://github.com/taimul",
  linkedin: "https://www.linkedin.com/in/taimullinked",
  cv: "/Taimul_Haque_Pathan_CV_2026.pdf",
  resume: "/Taimul_Haque_Pathan_Resume_2026.pdf",
  since: "Apr 2023",
  projectCount: "50+",
};

export type LiveProduct = {
  name: string;
  kind: string;
  scope: string;
  stack: string;
  href: string;
  host: string;
  shot?: string;
  /** pixel size of the screenshot, so the frame never crops it */
  shotSize?: [number, number];
};

export const live: LiveProduct[] = [
  {
    name: "Paytiks",
    kind: "Payment gateway for merchants",
    scope: "Admin and merchant dashboards",
    stack: "React, TypeScript, Redux Toolkit, Next.js",
    href: "https://paytiks.com",
    host: "paytiks.com",
    shot: "/shots/paytiks.png",
  },
  {
    name: "Fleximart",
    kind: "Multi-language e-commerce platform",
    scope: "Storefront and admin panel",
    stack: "Next.js, TypeScript, Zustand, next-intl",
    href: "https://fleximart.ae",
    host: "fleximart.ae",
    shot: "/shots/fleximart.png",
  },
  {
    name: "GamersTopup",
    kind: "Game top-up store",
    scope: "Storefront and admin panel",
    stack: "Next.js, TypeScript, Zustand, next-intl",
    href: "https://gamerstopup.com",
    host: "gamerstopup.com",
    shot: "/shots/gamerstopup.png",
  },
  {
    name: "Voruai",
    kind: "AI chat platform",
    scope: "Customer app, admin panel, API, worker",
    stack: "React, Node.js, Prisma, Claude, OpenAI, Gemini",
    href: "https://voruai.com",
    host: "voruai.com",
    shot: "/shots/voruai.png",
  },
  {
    name: "Ailoris",
    kind: "AI SEO automation platform",
    scope: "Platform and API",
    stack: "React, TypeScript, Express, MySQL",
    href: "https://ailoris.com",
    host: "ailoris.com",
    shot: "/shots/ailoris.png",
  },
  {
    name: "ProBuild Supply Co",
    kind: "Marketing site for a building supplier",
    scope: "Animated landing site",
    stack: "Next.js, GSAP",
    href: "https://www.probuildsupplyco.com.au/",
    host: "probuildsupplyco.com.au",
    shot: "/shots/probuild.png",
  },
];

export const earlier = [
  {
    name: "Bitasouq",
    kind: "Crypto gold e-commerce",
    period: "2024 to 2025",
    stack: "React, TypeScript, Express, MySQL",
  },
  {
    name: "Weero Furniture",
    kind: "Full stack e-commerce",
    period: "2023",
    stack: "React, Redux Toolkit, Node.js, MongoDB",
  },
  {
    name: "MeatMoot",
    kind: "Restaurant management API",
    period: "2023",
    stack: "TypeScript, Express, MySQL, Swagger",
  },
];

export const otherWork = [
  "Gamingty",
  "Metabriz",
  "Medico",
  "PV Shop",
  "GV Shop",
  "Reservenfly",
  "SMS Gateway",
  "AIM Scheme",
  "MRK Equipment Hire",
  "Fahim Telecom",
];

export const experience = [
  {
    period: "2025 to now",
    role: "Full Stack Developer",
    org: "Flexitech LLC FZ, UAE",
    points: [
      "Build admin and merchant dashboards for Paytiks, a multi-gateway payment platform.",
      "Develop the Next.js storefronts and admin panels for Fleximart and GamersTopup.",
      "Add backend features in Node.js, Express and Prisma when the team needs them.",
    ],
  },
  {
    period: "Mar 2024 to Feb 2025",
    role: "Junior Front-End Developer",
    org: "Monday Digital",
    points: [
      "Built responsive, cross-browser interfaces with Next.js alongside designers and back-end developers.",
      "Led core front-end features and integrated the APIs behind them.",
    ],
  },
  {
    period: "Jul 2023 to Feb 2024",
    role: "Full Stack Developer",
    org: "GBL",
    points: [
      "Built front-end and back-end features with the MERN stack, Next.js and TypeScript.",
      "Reviewed code and gave feedback that kept quality and practices consistent.",
    ],
  },
  {
    period: "Apr to Jun 2023",
    role: "MERN Stack Intern",
    org: "Weero Digital",
    points: [
      "Contributed to team web applications and built the Weero Furniture e-commerce project.",
    ],
  },
];

export const stack = [
  {
    label: "Front end",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux Toolkit",
      "RTK Query",
      "Zustand",
      "Tailwind CSS",
      "React Hook Form",
      "Zod",
      "next-intl",
      "GSAP",
    ],
  },
  {
    label: "Back end",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "Prisma",
      "MySQL",
      "Sequelize",
      "MongoDB",
      "Redis",
      "BullMQ",
      "JWT",
      "Swagger",
    ],
  },
  {
    label: "AI and payments",
    items: ["Claude API", "OpenAI API", "Gemini API", "Socket.IO", "Stripe", "Payment gateways"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Figma", "Postman", "Vercel", "Netlify", "AWS S3", "Cloudinary", "Chrome DevTools"],
  },
];

export const education = {
  degree: "B.Sc. in Computer Science and Engineering",
  school: "Eastern University",
  period: "2017 to 2021",
  result: "CGPA 3.92 / 4.00",
  languages: "Bangla (native), English, Hindi, Urdu",
};
