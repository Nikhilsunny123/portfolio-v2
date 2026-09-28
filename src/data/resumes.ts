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
    tags?: string[];
    points: string[];
  }[];
  projects: {
    name: string;
    role: string;
    description: string;
    tags?: string[];
    metrics?: string;
    points: string[];
  }[];
  certifications: string[];
  education: {
    degree: string;
    field: string;
    focus: string;
  }[];
};

const commonSkills = {
  frontend: "React, Next.js, TypeScript, Tailwind CSS, Socket.IO, SSE Streaming",
  backend: "Node.js, Express.js, FastAPI, REST APIs, Multi-Tenancy, Microservices",
  ai: "OpenAI, RAG Architectures, LangChain, Qdrant, Agentic AI, Tool Calling",
  cloud: "AWS (ECS/Fargate, Lambda, S3, EC2), Docker, GitHub Actions, CI/CD",
  data: "Redis, MongoDB, MySQL, Elasticsearch, OAuth2, RBAC, JWT Security"
};

const commonExperience = [
  {
    company: "Enterprise SaaS & AI Systems",
    role: "Lead Full Stack & AI Developer",
    period: "Current Focus",
    tags: ["React", "Node.js", "RAG", "Socket.IO", "AWS ECS"],
    points: [
      "Architected multi-tenant AI support suite with isolated RAG pipelines, SSE streaming, and real-time agent handoff.",
      "Engineered core services across 6 microservices with bounded concurrency, leaderless state, and crash-safe workflows.",
      "Optimized real-time WebSocket infrastructure to sustain 1,000+ concurrent connections."
    ]
  },
  {
    company: "B2B Cloud Solutions",
    role: "Full Stack Developer",
    period: "Prior Milestone",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    points: [
      "Delivered high-throughput operational dashboards and business workflows for 200+ daily active users.",
      "Halved backend reporting and query latency by 50% via optimized data caching and indexing."
    ]
  },
  {
    company: "Independent Product Engineering",
    role: "Full Stack Engineer",
    period: "Contract & Products",
    tags: ["Serverless", "Python", "React", "DynamoDB"],
    points: [
      "Engineered serverless ordering platform on AWS Lambda, API Gateway, and DynamoDB.",
      "Built end-to-end MERN operational workflows with dynamic service management and scheduling."
    ]
  },
  {
    company: "Digital Solutions Studio",
    role: "Software Engineer",
    period: "Early Milestone",
    tags: ["REST APIs", "Node.js", "Next.js", "Security"],
    points: [
      "Developed high-velocity Node.js REST APIs and responsive Next.js interfaces.",
      "Hardened authentication flows and audited systems against OWASP security vulnerabilities."
    ]
  }
];

const commonProjects = [
  {
    name: "Embeddable AI Customer Support Platform",
    role: "Lead Architect",
    description: "Multi-tenant AI support widget with isolated RAG knowledge bases, SSE token streaming, and real-time agent handover.",
    tags: ["RAG", "LangChain", "Qdrant", "Socket.IO", "AWS ECS"],
    metrics: "1,000 Concurrent Users • <100ms Stream",
    points: [
      "Tenant-isolated vector retrieval with Qdrant and OpenAI tool-calling.",
      "Sub-100ms SSE token streaming with leaderless Socket.IO presence.",
      "Self-contained Shadow DOM drop-in widget with automated webhook integrations."
    ]
  },
  {
    name: "Communications & Notification Service",
    role: "Core Author",
    description: "Enterprise outbound messaging engine with Microsoft OAuth2 security, templating, and automated delivery tracking.",
    tags: ["Node.js", "OAuth2", "SMTP", "n8n", "Webhooks"],
    metrics: "Automated Dispatch • Multi-Tenant Delivery",
    points: [
      "Centralized email & notification delivery via Microsoft OAuth2 and SMTP.",
      "Event-driven webhook automations powering tenant communication pipelines."
    ]
  },
  {
    name: "B2B Ingredients E-commerce",
    role: "Platform Integrator",
    description: "Next.js commerce storefront integrated with embedded real-time AI assistance and proactive visitor routing.",
    tags: ["Next.js", "TypeScript", "Realtime AI", "Tailwind"],
    metrics: "Instant Agent Handover • Dynamic Catalog",
    points: [
      "Lazy-loaded AI chat widget with automated agent routing and presence.",
      "Dynamic catalog sync with error boundaries and offline resilience."
    ]
  },
  {
    name: "Sourcing & Supplier Collaboration Platform",
    role: "Backend Engineer",
    description: "Pricing workbench and supplier collaboration system with automated document pipelines and secure S3 vaults.",
    tags: ["React", "Python", "Django", "Celery", "AWS S3"],
    metrics: "Async Processing • S3 Document Vault",
    points: [
      "Asynchronous Celery task queues for high-volume document workflows.",
      "Fine-grained role-based access control for supplier negotiations."
    ]
  }
];

const commonCertifications = [
  "Generative AI with Large Language Models — DeepLearning.AI",
  "Complete Web Developer Bootcamp — Zero to Mastery",
  "Node.js Application Developer — Udemy"
];

const commonEducation = [
  {
    degree: "Master of Computer Applications (MCA)",
    field: "Computer Science & Engineering",
    focus: "Distributed Systems & Advanced Software Architecture"
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Applications",
    focus: "Software Development & Database Fundamentals"
  }
];

export const resumesData: Record<string, ResumeData> = {
  "ai-engineer": {
    id: "ai-engineer",
    role: "AI Engineer",
    title: "AI Engineer • RAG & LLM Systems",
    fileName: "AI_Engineer.docx",
    summary: "Architecting production RAG pipelines, agentic tool-calling, and real-time streaming interfaces integrated with resilient cloud backends.",
    skills: commonSkills,
    experience: commonExperience,
    projects: commonProjects,
    certifications: commonCertifications,
    education: commonEducation
  },
  "forward-deployed-engineer": {
    id: "forward-deployed-engineer",
    role: "Forward Deployed Engineer",
    title: "Forward Deployed Engineer • Enterprise Integrations",
    fileName: "Forward_Deployed_Engineer.docx",
    summary: "Translating enterprise requirements into high-availability distributed systems, real-time telemetry, and seamless multi-tenant deployments.",
    skills: commonSkills,
    experience: commonExperience,
    projects: commonProjects,
    certifications: commonCertifications,
    education: commonEducation
  },
  "full-stack-engineer": {
    id: "full-stack-engineer",
    role: "Full Stack Engineer",
    title: "Full Stack Engineer • Scalable Systems",
    fileName: "Full_Stack_Engineer.docx",
    summary: "Engineering scalable web platforms, distributed microservices, and reactive user interfaces backed by resilient cloud infrastructure.",
    skills: commonSkills,
    experience: commonExperience,
    projects: commonProjects,
    certifications: commonCertifications,
    education: commonEducation
  },
  "solutions-engineer": {
    id: "solutions-engineer",
    role: "Solutions Engineer",
    title: "Solutions Engineer • Systems Architecture",
    fileName: "Solutions_Engineer.docx",
    summary: "Bridging business domain challenges with deployed AI solutions, unified API gateways, and automated webhook workflows.",
    skills: commonSkills,
    experience: commonExperience,
    projects: commonProjects,
    certifications: commonCertifications,
    education: commonEducation
  }
};
