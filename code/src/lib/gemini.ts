import { GoogleGenAI, Type } from '@google/genai';

// Initialize the Gemini API client
// Set NEXT_PUBLIC_GEMINI_API_KEY in your environment to enable AI features
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

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

export async function parseCVToPortfolio(cvText: string): Promise<PortfolioData> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Extract the following information from the provided CV text to create a structured portfolio. If information is missing, infer it reasonably or leave it blank. CV Text:\n\n${cvText}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            title: { type: Type.STRING },
            bio: { type: Type.STRING, description: "A short, professional summary" },
            contactInfo: {
              type: Type.OBJECT,
              properties: {
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                location: { type: Type.STRING },
                linkedin: { type: Type.STRING },
                website: { type: Type.STRING }
              }
            },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  company: { type: Type.STRING },
                  role: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  institution: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  year: { type: Type.STRING }
                }
              }
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            }
          },
          required: ["name", "title", "bio", "skills", "experience", "education", "projects"]
        }
      }
    });

    if (!response.text) {
      throw new Error("Failed to generate portfolio data.");
    }

    return JSON.parse(response.text) as PortfolioData;
  } catch (error) {
    console.error("Error parsing CV:", error);
    throw error;
  }
}
