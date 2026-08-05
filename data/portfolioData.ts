/**
 * Portfolio content — update this file to change your portfolio.
 *
 * UPDATE LOCATIONS:
 * - name, title, location, bio → profile & about
 * - experience[] → experience window
 * - projects[] → projects window
 * - skills[] → skills window
 * - education → education section
 * - contact, socialLinks → contact window & top bar
 * - resumeUrl → resume window / download
 */

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface ProjectItem {
  name: string;
  tech: string;
  description: string;
  link?: string;
}

export interface SkillsCategory {
  category: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export const portfolioData = {
  // ——— PROFILE (name, title, location) ———
  profile: {
    name: "Joel Mathew Jojan",
    title:
      "Computer Science Student | SWE Intern @ HubSpot | AI Captain @ Formula Trinity",
    location: "Dublin, Ireland",
    headline:
      "Computer Science Student at Trinity College Dublin | Software Engineering Intern at HubSpot | AI Captain at Formula Trinity",
  },

  // ——— ABOUT (bio / introduction) ———
  about: `Computer Science student at Trinity College Dublin, currently a Software Engineering Intern at HubSpot and AI Captain at Formula Trinity.

At HubSpot I build backend features for the Rep Quoting Experience, working on Java services in an event-driven architecture with Kafka, SQL-backed data flows, and internal APIs. At Formula Trinity I lead the autonomous software programme across perception, state estimation, path planning, control, simulation, and vehicle integration.

I work mainly in Java, Python, and C++, across Spring Boot, Django, React/Next.js, and ROS 2. Alongside development, I demonstrate practical labs in Engineering and Computer Science at Trinity.`,

  // ——— EXPERIENCE (aligned with resume) ———
  experience: [
    {
      company: "HubSpot",
      role: "Software Engineering Intern – Rep Quoting Experience",
      period: "May 2026 – Present",
      bullets: [
        "Develop backend features supporting sales representatives as they create and manage quotes and deals",
        "Build and maintain Java services in an event-driven architecture, working with Kafka, SQL-backed data flows, and internal APIs",
        "Write automated tests and contribute through code review and CI/CD workflows in a Kubernetes-based engineering environment",
        "Technologies: Java, Kafka, SQL, Kubernetes, CI/CD",
      ],
    },
    {
      company: "Formula Trinity",
      role: "AI Captain",
      period: "Jul 2026 – Present",
      bullets: [
        "Lead the autonomous software programme across perception, state estimation, path planning, control, simulation, and vehicle integration",
        "Coordinate AI–ADS integration for the team's first human-drivable autonomous vehicle, defining commands, feedback, readiness, and failure behaviour",
        "Contributed to the team's best Formula Student UK autonomous result: 5th overall, 4th in Trackdrive, and 1st in Real-World AI",
      ],
    },
    {
      company: "Formula Trinity",
      role: "Control Lead",
      period: "Aug 2025 – Jul 2026",
      bullets: [
        "Led development and validation of a ROS 2 control stack in C++ and Python, including path tracking, speed control, and vehicle command interfaces",
        "Technologies: C++, Python, ROS 2",
      ],
    },
    {
      company: "IBM Academic-Industry Project",
      role: "Product Owner and Software Engineer",
      period: "Jan 2026 – Apr 2026",
      bullets: [
        "Led an eight-person Agile team building a novice-friendly TORCS racing simulation package with a GUI, environment setup, and PPO training workflows",
        "Defined sprint scope, acceptance criteria, and documentation for an Ubuntu 22.04-compatible teaching and experimentation platform",
      ],
    },
    {
      company: "Guidewire Academic-Industry Project",
      role: "Software Engineer",
      period: "Jan 2025 – May 2025",
      bullets: [
        "Built a project-management dashboard using a React and Material UI frontend with a Django REST backend and JWT authentication",
        "Designed REST APIs and issue-tracking workflows while collaborating through GitLab in an Agile development team",
      ],
    },
    {
      company: "Trinity College Dublin",
      role: "Teaching Demonstrator – Engineering and Computer Science",
      period: "Sept 2025 – Present",
      bullets: [
        "Support practical labs in object-oriented programming, system design, and embedded development using C++, Arduino, and Processing",
      ],
    },
  ] as ExperienceItem[],

  // ——— PROJECTS (aligned with resume) ———
  projects: [
    {
      name: "Multithreaded HTTP/HTTPS Proxy (2026)",
      tech: "Java, TCP/IP, Sockets",
      description:
        "Java forward proxy supporting standard HTTP requests and HTTPS tunnelling through the CONNECT method. Handles concurrent clients, socket lifecycle, request parsing, bidirectional stream forwarding, and network error responses.",
      link: "https://github.com/dev-j03l/Forward-Web-Proxy-23376190",
    },
    {
      name: "Formula 1 Statistics Platform (2025)",
      tech: "Java, Spring Boot, MariaDB, Next.js",
      description:
        "Full-stack Formula 1 analytics platform built with Spring Boot 3, JPA, Flyway, MariaDB, Next.js 15, and React 19. Ingests and normalizes OpenF1 data through backend services and exposes race, driver, and standings data through REST APIs.",
    },
    {
      name: "Premier League Forecasting",
      tech: "Python, Web Scraping, Pandas, Monte Carlo Simulation",
      description:
        "Predictive model for Premier League outcomes using Monte Carlo simulations and player-level statistics. Simulated full seasons to forecast standings, goal statistics, and win/draw/loss probabilities.",
      link: "https://github.com/ZichengLiang/JLLA_Probablity",
    },
    {
      name: "D&D Storytelling with Gemini",
      tech: "Gemini, React, Firebase",
      description:
        "Gemini-powered prototype to increase immersion and storytelling for Dungeons and Dragons. Built at the Google AI Hackathon (Google IE) with a team of 5.",
      link: "https://github.com/LMol-4/Team8GoogleAIHackathon",
    },
  ] as ProjectItem[],

  // ——— SKILLS (aligned with resume) ———
  skills: [
    {
      category: "Languages",
      items: ["Java", "Python", "C++", "SQL", "TypeScript", "JavaScript"],
    },
    {
      category: "Frameworks and Systems",
      items: [
        "Spring Boot",
        "Django REST Framework",
        "React",
        "Next.js",
        "ROS 2",
        "Kafka",
      ],
    },
    {
      category: "Tools and Platforms",
      items: [
        "Docker",
        "Kubernetes",
        "Git",
        "GitHub",
        "GitLab",
        "Linux",
        "MariaDB",
        "CI/CD",
      ],
    },
  ] as SkillsCategory[],

  // ——— EDUCATION (aligned with resume) ———
  education: {
    institution: "Trinity College Dublin",
    degree: "BA (Mod.) and Master in Computer Science (MCS)",
    period: "Sept 2023 – May 2028 (Expected)",
    coursework:
      "Relevant coursework: Machine Learning, Computer Vision, Computer Graphics, Internet Applications, Artificial Intelligence, Data Structures and Algorithms",
  },

  // ——— CONTACT & LINKS (aligned with resume) ———
  contact: {
    email: "joelmathewjojan@gmail.com",
    phone: "+353 89 950 5581",
  },
  socialLinks: [
    { label: "LinkedIn", url: "https://linkedin.com/in/joel-mathew-jojan" },
    { label: "GitHub", url: "https://github.com/dev-j03l" },
  ] as SocialLink[],

  // ——— RESUME (path or URL for PDF) ———
  resumeUrl: "/resume.pdf",
};

export type PortfolioData = typeof portfolioData;
