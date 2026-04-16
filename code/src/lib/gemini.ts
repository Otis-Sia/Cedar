import { GoogleGenAI } from '@google/genai';

// ── Types ────────────────────────────────────────────────────────────
export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  valueProp: string;
  yearsExperience: number | null;
  contactInfo: {
    email?: string;
    phone?: string;
    city?: string;
    country?: string;
    linkedin?: string;
    github?: string;
    behance?: string;
    website?: string;
  };
  skills: string[];
  certifications: string;
  experience: {
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate: string;
    achievements: string;
  }[];
  education: {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    honors: string;
    coursework: string;
  }[];
  projects: {
    title: string;
    role: string;
    problem: string;
    results: string;
    url: string;
    timeline: string;
  }[];
  about: {
    whoYouHelp: string;
    workingStyle: string;
    keyClients: string;
    toolsUsed: string;
  };
  testimonials: {
    quote: string;
    name: string;
    title: string;
    company: string;
  }[];
  contact: {
    availability: string;
    cta: string;
  };
}

// ── Gemini Parsing Function ──────────────────────────────────────────
export async function parseCVToPortfolio(cvText: string): Promise<PortfolioData> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are an expert CV/resume parser for a premium portfolio builder platform called Cedar.

Analyze the following CV/resume text and extract ALL relevant information into a structured JSON object.

IMPORTANT RULES:
- Extract data EXACTLY as written in the CV — do not invent or fabricate any information.
- If a field is not found in the CV, use an empty string "" for strings, null for numbers, and empty arrays [] for arrays.
- For dates, use the format "YYYY-MM" (e.g., "2023-06"). If only a year is given, use "YYYY-01".
- If an end date says "Present" or "Current", use "Present".
- For the "valueProp" field, synthesize a concise one-sentence value proposition based on the person's experience and skills.
- For the "bio" field, write a 2-3 sentence professional summary based on the CV content.
- For the "availability" field, infer from the CV if possible (e.g., "freelance", "fulltime", "both", "contract", "not_available"), or use "" if unknown.
- Clean up and normalize skill names (e.g., "JS" → "JavaScript", "py" → "Python").
- For achievements, rephrase with quantifiable metrics when the data supports it.

Return ONLY valid JSON matching this exact schema (no markdown, no code fences, no explanation):

{
  "name": "Full Name",
  "title": "Professional Title / Headline",
  "bio": "2-3 sentence professional summary",
  "valueProp": "One sentence value proposition",
  "yearsExperience": null,
  "contactInfo": {
    "email": "",
    "phone": "",
    "city": "",
    "country": "",
    "linkedin": "",
    "github": "",
    "behance": "",
    "website": ""
  },
  "skills": ["Skill1", "Skill2"],
  "certifications": "Comma-separated list of certifications",
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "location": "City, Country",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM or Present",
      "achievements": "Bullet-point achievements as a single multi-line string"
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University Name",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "honors": "First Class, GPA, etc.",
      "coursework": "Relevant courses"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "role": "Your role in the project",
      "problem": "Context and problem solved",
      "results": "Quantifiable results",
      "url": "",
      "timeline": "Duration or date range"
    }
  ],
  "about": {
    "whoYouHelp": "Who you help and how",
    "workingStyle": "Working philosophy",
    "keyClients": "Key clients or companies",
    "toolsUsed": "Primary tools used"
  },
  "testimonials": [
    {
      "quote": "Testimonial text",
      "name": "Person's name",
      "title": "Person's title",
      "company": "Person's company"
    }
  ],
  "contact": {
    "availability": "",
    "cta": ""
  }
}

CV/RESUME TEXT:
---
${cvText}
---

Return ONLY the JSON object, nothing else.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: {
      temperature: 0.1,
      maxOutputTokens: 8192,
    },
  });

  const text = response.text?.trim() ?? '';

  // Strip potential markdown code fences the model may emit
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned) as PortfolioData;
  } catch {
    throw new Error('Gemini returned invalid JSON. Please try again.');
  }
}
