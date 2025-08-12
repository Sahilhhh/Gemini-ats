
import React, { createContext, useState, ReactNode } from 'react';
import { Job, Applicant } from '../types';
import { INITIAL_JOBS } from '../constants';

interface DataContextType {
  jobs: Job[];
  applicants: Applicant[];
  addJob: (job: Job) => void;
  addApplicant: (applicant: Applicant) => void;
  getJobById: (id: string) => Job | undefined;
  getApplicantsByJobId: (jobId: string) => Applicant[];
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const addJob = (job: Job) => {
    setJobs(prevJobs => [...prevJobs, job]);
  };

  const addApplicant = (applicant: Applicant) => {
    setApplicants(prevApplicants => [...prevApplicants, applicant]);
  };
  
  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const getApplicantsByJobId = (jobId: string) => {
    return applicants.filter(applicant => applicant.jobId === jobId);
  };

  const value = {
    jobs,
    applicants,
    addJob,
    addApplicant,
    getJobById,
    getApplicantsByJobId
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
