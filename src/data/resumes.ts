export type ResumeData = {
  id: string;
  role: string;
  title: string;
  fileName: string;
  summary: string;
  skills: {
    frontend: string;
    backend: string;
    ai: string;
    cloud: string;
    data: string;
  };
  experience: {
    company: string;
    role: string;
    period: string;
    points: string[];
  }[];
  projects: {
    name: string;
    role: string;
    description: string;
    points: string[];
  }[];
  certifications: string[];
  education: string[];
};

const commonSkills = {
  frontend: "React, Next.js, TypeScript, Tailwind CSS, Socket.IO (client), SSE",
  backend: "Node.js, Express.js, FastAPI, REST APIs, Multi-Tenancy, Microservices",
  ai: "OpenAI, RAG, LangChain, Qdrant, Agentic AI, Tool Calling, n8n",
  cloud: "AWS (ECS/Fargate, Lambda, S3, EC2), Docker, GitHub Actions, CI/CD",
  data: "MySQL, MongoDB, Redis, Elasticsearch, OAuth2, RBAC, SSO/OIDC, JWT, OWASP"
};

const commonExperience = [
  {
    company: "Dietary Business Intelligence Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Jul 2024 - Present",
    points: [
      "Lead author across 6 of 20 production services in a multi-tenant B2B SaaS platform, with 2,300+ authored commits.",
      "Led end-to-end delivery of an embeddable AI customer-support platform (React, Node.js, RAG, realtime, integrations) - translating business requirements into tenant-isolated knowledge bases, SSE token streaming, Socket.IO communication, human handoff, visitor presence, SLA timers, and agent assignment.",
      "Built reliability and scalability mechanisms: bounded concurrency, leaderless presence, crash-safe background workflows, cache-stampede protection, and tenant-isolated authorization.",
      "Integrated OpenAI, LangChain, and Qdrant with Redis, MySQL, MongoDB, n8n, and third-party APIs to connect AI capabilities to business workflows.",
      "Load-tested realistic Socket.IO/WebSocket journeys from 20 to 1,000 concurrent connections using JMeter.",
      "Implemented fail-closed permissions, tenant isolation, OIDC-based deployment workflows, and host allowlisting."
    ]
  },
  {
    company: "Cypress Innovative Solutions",
    role: "Full Stack Developer",
    period: "Jan 2024 - Jul 2024",
    points: [
      "Built and maintained React/Node/MongoDB business applications and admin workflows used by 200+ daily active users.",
      "Improved report performance by ~50% through backend and data-access optimization; supported testing, AWS services, and production issue resolution."
    ]
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "Jan 2023 - Dec 2023",
    points: [
      "Built a serverless restaurant-ordering platform using React, Python, AWS Lambda, API Gateway, and DynamoDB.",
      "Built a MERN-based vehicle service-management platform spanning frontend workflows, backend APIs, and business logic."
    ]
  },
  {
    company: "Neovibe Innovative Technologies",
    role: "Junior Software Engineer",
    period: "Aug 2022 - Jan 2023",
    points: [
      "Developed Node.js REST APIs and React/Next.js interfaces for web applications.",
      "Worked with AWS EC2, S3, and Lambda; remediated security issues including IDOR, XSS, and token exposure."
    ]
  }
];

const commonProjects = [
  {
    name: "Embeddable AI Customer Support Platform",
    role: "Lead Developer",
    description: "Production, multi-tenant AI customer-support product embeddable on any business website via a single script tag - shipped end-to-end from AI design through deployment. Each tenant gets an isolated knowledge base, branding, agents, and analytics.",
    points: [
      "Designed tenant-scoped RAG pipelines (Qdrant + OpenAI/LangChain) grounded in per-tenant business context from MySQL/MongoDB, with prompt engineering and agentic tool-calling to trigger real business actions - order lookup, product info, callback scheduling.",
      "Built the full customer-facing delivery surface: SSE token streaming for progressive AI responses, realtime visitor presence and human handover over Socket.IO, and a permission-aware React/TypeScript agent console.",
      "Engineered for production reliability: bounded concurrency to protect the realtime server from long AI calls, leaderless presence, and crash-safe SLA timers across distributed instances.",
      "Built a self-contained embeddable widget (Shadow DOM, host allowlisting) and connected the platform to business systems via n8n workflows, translating business requirements directly into deployed automation.",
      "Load-tested real WebSocket journeys from 20 to 1,000 concurrent users with JMeter; shipped on Docker/AWS ECS-Fargate with GitHub Actions CI/CD."
    ]
  },
  {
    name: "Communications & Notification Service",
    role: "Lead Author",
    description: "Tenant-configurable outbound communications service (SMTP + Microsoft OAuth2) with reusable templates, delivery history, order tracking, and survey workflows - built to plug directly into partner tenants' existing business processes via webhook-driven n8n automation.",
    points: []
  },
  {
    name: "B2B Ingredients E-commerce",
    role: "Feature Owner",
    description: "Integrated the realtime AI support platform into a live Next.js storefront: lazy-loaded chat, presence, auto-assignment, inactivity handling, and error boundaries - deploying a shared platform capability into a distinct customer-facing product.",
    points: []
  },
  {
    name: "Sourcing & Supplier Collaboration Platform",
    role: "Feature Owner",
    description: "Sourcing-price workbench and supplier collaboration workflows with S3-backed document handling, connecting supplier-side business processes to a shared platform backend (React, Python/Django/DRF, Celery).",
    points: []
  }
];

const commonCertifications = [
  "Generative AI with Large Language Models - DeepLearning.AI / Coursera",
  "Complete Web Developer Bootcamp - Zero to Mastery",
  "Node.js Application Developer - Udemy"
];

const commonEducation = [
  "Master of Computer Applications (MCA) - St. Joseph's Engineering College, Mangalore - 2019",
  "Bachelor of Computer Applications (BCA) - Srinivas Institute of Management Studies, Mangalore - 2017"
];

export const resumesData: Record<string, ResumeData> = {
  "ai-engineer": {
    id: "ai-engineer",
    role: "AI Engineer",
    title: "AI Engineer | RAG & LLM Systems | Full Stack",
    fileName: "AI_Engineer.docx",
    summary: "AI Engineer with 3.3+ years building production RAG pipelines and LLM-powered features - from tenant-scoped vector search and agentic tool-calling to realtime backend systems and React interfaces. Strong across OpenAI, LangChain, Qdrant, Node.js, FastAPI, and TypeScript, with practical AWS deployment experience shipping AI systems into real business workflows.",
    skills: commonSkills,
    experience: commonExperience,
    projects: commonProjects,
    certifications: commonCertifications,
    education: commonEducation
  },
  "forward-deployed-engineer": {
    id: "forward-deployed-engineer",
    role: "Forward Deployed Engineer",
    title: "Forward Deployed Engineer | Full Stack | Integrations",
    fileName: "Forward_Deployed_Engineer.docx",
    summary: "Forward Deployed Engineer with 3.3+ years deploying and integrating complex software solutions into customer environments. Expert at bridging business requirements with technical execution across React, Node.js, and real-time backend systems. Skilled in deploying multi-tenant architectures, resolving production issues, and ensuring seamless platform adoption.",
    skills: commonSkills,
    experience: commonExperience,
    projects: commonProjects,
    certifications: commonCertifications,
    education: commonEducation
  },
  "full-stack-engineer": {
    id: "full-stack-engineer",
    role: "Full Stack Engineer",
    title: "Full Stack Engineer | React & Node.js | Microservices",
    fileName: "Full_Stack_Engineer.docx",
    summary: "Full Stack Engineer with 3.3+ years of experience architecting and building scalable web applications. Proficient in React, Node.js, and TypeScript, delivering robust APIs, real-time features, and responsive UIs. Strong background in microservices, multi-tenancy, and cloud deployments on AWS, with a focus on performance and reliability.",
    skills: commonSkills,
    experience: commonExperience,
    projects: commonProjects,
    certifications: commonCertifications,
    education: commonEducation
  },
  "solutions-engineer": {
    id: "solutions-engineer",
    role: "Solutions Engineer",
    title: "Solutions Engineer | Full Stack | AI | Integrations",
    fileName: "Solutions_Engineer.docx",
    summary: "Solutions Engineer with 3.3+ years turning business requirements into deployed, customer-facing systems - from RAG pipelines and realtime backend systems to production React interfaces. Strong across Node.js, FastAPI, React, TypeScript, AI/LLM systems, integrations, and automation, with practical AWS deployment experience.",
    skills: commonSkills,
    experience: commonExperience,
    projects: commonProjects,
    certifications: commonCertifications,
    education: commonEducation
  }
};
