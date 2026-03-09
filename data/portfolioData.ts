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
      "Computer Science Student | Incoming SWE Intern @ HubSpot",
    location: "Dublin, Ireland",
    headline:
      "Computer Science Student at Trinity College Dublin | Incoming Software Engineering Intern at HubSpot | Control Lead at Formula Trinity",
  },

  // ——— ABOUT (bio / introduction) ———
  about: `Computer Science student at Trinity College Dublin with experience in full-stack development, control systems, and collaborative engineering projects.

I have worked with technologies including C++, Java, Python, React.js, and Django, and have built both software applications and embedded control systems. I have led the control systems team at Formula Trinity and collaborated in agile teams at Guidewire and elsewhere.

Alongside development, I have experience mentoring students as a module demonstrator and contributing to projects from web apps to autonomous systems.`,

  // ——— EXPERIENCE (aligned with resume) ———
  experience: [
    {
      company: "Guidewire Software",
      role: "Software Engineering Intern",
      period: "Jan 2025 – May 2025",
      bullets: [
        "Collaborated in an 8-member AGILE team to design and deploy a project management dashboard for tracking tasks, deadlines, and team progress",
        "Developed and optimized Django-based backend services and RESTful APIs, reducing response times by 10%",
        "Developed responsive user interfaces in React.js, enhancing user experience and interactivity",
        "Containerized the full-stack application with Docker, streamlining development, testing, and deployment workflows",
        "Technologies: React, Django, RESTful APIs, Docker, GitLab",
      ],
    },
    {
      company: "Formula Trinity",
      role: "Control Lead",
      period: "Sept 2024 – Present",
      bullets: [
        "Designed and implemented control algorithms for an Autonomous Driving System (ADS) using ROS 2.0 and EUFS Simulator",
        "Optimized ADS algorithms, achieving a 2Hz performance boost in FSUK benchmark testing",
        "Technologies: C, Python, ROS 2.0, EUFS Simulator",
      ],
    },
    {
      company: "Trinity College Dublin",
      role: "Module Demonstrator",
      period: "—",
      bullets: [
        "Demonstrated for CSU22E03 - Computer Engineering",
        "Helped students comprehend OOP in C++",
        "Technologies: C++, OOP",
      ],
    },
    {
      company: "Project Blue",
      role: "Web Developer",
      period: "Oct 2023 – Dec 2023",
      bullets: [
        "Migrated static websites to React, modernized codebases, improved maintainability and boosted traffic by 20%",
        "Technologies: React, JavaScript, HTML, CSS",
      ],
    },
    {
      company: "Google Inc.",
      role: "Google AI Hackathon",
      period: "June 2025",
      bullets: [
        "Competed in a highly selective AI Hackathon held in Google IE as part of a team of 5",
        "Created a Gemini-powered prototype to help increase immersion and storytelling for Dungeons and Dragons",
        "Technologies: Gemini, React, Firebase",
      ],
    },
  ] as ExperienceItem[],

  // ——— PROJECTS (aligned with resume) ———
  projects: [
    {
      name: "MiaoNance – Investment Notebook",
      tech: "Django, Next.js, Binance API, Docker",
      description:
        "Full-stack application (in development) with Django backend and Next.js frontend for live crypto market tracking and note-taking. Planning to integrate Binance API to fetch and display real-time coin data.",
    },
    {
      name: "Premier League Forecasting",
      tech: "Python, Web Scraping, Pandas, Monte Carlo Simulation",
      description:
        "Predictive model for Premier League outcomes using Monte Carlo simulations and player-level statistics. Simulated full seasons to forecast standings, goal statistics, and win/draw/loss probabilities.",
    },
    {
      name: "Project Management Dashboard",
      tech: "React, Django, RESTful APIs, Docker, GitLab",
      description:
        "Project management dashboard built at Guidewire for tracking tasks, deadlines, and team progress. Full-stack with Django backend and React frontend, containerized with Docker.",
    },
    {
      name: "Formula Trinity ADS",
      tech: "C, Python, ROS 2.0, EUFS Simulator",
      description:
        "Control algorithms for an Autonomous Driving System using ROS 2.0 and EUFS Simulator; optimized for FSUK benchmark performance.",
    },
  ] as ProjectItem[],

  // ——— SKILLS (aligned with resume) ———
  skills: [
    { category: "Languages", items: ["Python", "C++", "Java", "JavaScript"] },
    { category: "Frameworks", items: ["React", "Django", "ROS 2.0"] },
    { category: "Tools", items: ["Docker", "Git", "GitLab", "GitHub", "Firebase"] },
    {
      category: "Concepts",
      items: [
        "Full-stack development",
        "Embedded systems",
        "Control algorithms",
        "Agile development",
      ],
    },
  ] as SkillsCategory[],

  // ——— EDUCATION (aligned with resume) ———
  education: {
    institution: "Trinity College Dublin",
    degree: "BA Integrated Computer Science (Expected May 2027)",
    period: "Sept 2023 – Present",
    coursework: "Data Structures & Algorithms I/II, Software Engineering, Computer Architecture, Discrete Mathematics",
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
