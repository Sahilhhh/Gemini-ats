
export interface ATSAnalysis {
  matchScore: number;
  summary: string;
  extractedSkills: string[];
  extractedContact: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface Applicant {
  id: string;
  jobId: string;
  resumeContent: string;
  atsAnalysis: ATSAnalysis;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  responsibilities: string[];
  qualifications: string[];
}
