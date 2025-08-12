
import { GoogleGenAI, Type } from "@google/genai";
import { ATSAnalysis } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder key. AI features will not work without a valid key.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: { 
            type: Type.INTEGER, 
            description: "A score from 0 to 100 indicating how well the resume matches the job description." 
        },
        summary: { 
            type: Type.STRING, 
            description: "A brief 2-3 sentence summary of the candidate's suitability for the role." 
        },
        extractedSkills: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "A list of key skills from the resume that are relevant to the job description."
        },
        extractedContact: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING, description: "Candidate's full name." },
                email: { type: Type.STRING, description: "Candidate's email address." },
                phone: { type: Type.STRING, description: "Candidate's phone number." }
            },
            required: ["name", "email"]
        }
    },
    required: ["matchScore", "summary", "extractedSkills", "extractedContact"]
};

export const analyzeResume = async (resumeContent: string, jobDescription: string): Promise<ATSAnalysis> => {
    try {
        const prompt = `
          You are an expert Applicant Tracking System (ATS). 
          Analyze the following resume against the provided job description.
          Your task is to return a JSON object with your analysis.

          Job Description:
          ---
          ${jobDescription}
          ---

          Resume Content:
          ---
          ${resumeContent}
          ---

          Based on the comparison, provide a match score, a summary of the candidate's fit,
          a list of extracted skills relevant to the job, and the candidate's contact information.
          If a contact detail is not found, return an empty string for it.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            }
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        // Ensure the parsed JSON conforms to the ATSAnalysis interface
        const validatedAnalysis: ATSAnalysis = {
            matchScore: parsedJson.matchScore || 0,
            summary: parsedJson.summary || 'No summary available.',
            extractedSkills: parsedJson.extractedSkills || [],
            extractedContact: {
                name: parsedJson.extractedContact?.name || 'N/A',
                email: parsedJson.extractedContact?.email || 'N/A',
                phone: parsedJson.extractedContact?.phone || 'N/A'
            }
        };
        
        return validatedAnalysis;

    } catch (error) {
        console.error("Error analyzing resume with Gemini API:", error);
        throw new Error("Failed to analyze resume. Please check the API key and network connection.");
    }
};
