// Frontend-only stub — Gemini AI SDK has been removed.

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  contactInfo: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
  };
  skills: string[];
  experience: {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  projects: {
    name: string;
    description: string;
  }[];
}
