
import React, { useState, useRef } from 'react';
import { Job, Applicant } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { analyzeResume } from '../services/geminiService';
import Spinner from './Spinner';

interface ApplyModalProps {
    isOpen: boolean;
    onClose: () => void;
    job: Job;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, job }) => {
    const { addApplicant } = useAppContext();
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
             // Simple check, real app might need more robust validation
            if (file.size > 10 * 1024 * 1024) { 
                setError("File is too large (max 10MB).");
                setResumeFile(null);
                return;
            }
            setResumeFile(file);
            setError(null);
        }
    };
    
     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resumeFile) {
            setError("Please upload your resume.");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Reading file as text. This works well for .txt, but for .pdf and .docx, 
            // the output will be binary gibberish. A real-world app would need a
            // proper text extraction library (like pdf.js) or a server-side parser.
            // For this demo, we'll proceed assuming the user uploads a text-based file.
            const resumeContent = await resumeFile.text(); 
            const jobDescription = `${job.description}\n\nResponsibilities:\n${job.responsibilities.join('\n')}\n\nQualifications:\n${job.qualifications.join('\n')}`;

            const atsAnalysis = await analyzeResume(resumeContent, jobDescription);
            
            const newApplicant: Applicant = {
                id: `${job.id}-${new Date().toISOString()}`,
                jobId: job.id,
                resumeContent: atsAnalysis.extractedContact.name, // Just store name for demo
                atsAnalysis,
            };

            addApplicant(newApplicant);
            setIsSubmitting(false);
            onClose();
            alert(`Thank you for applying, ${atsAnalysis.extractedContact.name}! Your application has been submitted.`);
        
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md relative" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Close modal">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Apply for {job.title}</h2>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Our AI will analyze your resume against the job description to find the best fit. Your contact details will be extracted automatically.</p>
                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Resume</label>
                         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                               <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                               <div className="flex text-sm text-slate-600 dark:text-slate-400">
                                   <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:ring-offset-slate-900">
                                       <span>Upload a file</span>
                                       <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} ref={fileInputRef} accept=".pdf,.txt,.doc,.docx" />
                                   </label>
                                   <p className="pl-1">or drag and drop</p>
                               </div>
                               <p className="text-xs text-slate-500 dark:text-slate-500">TXT, PDF, DOCX up to 10MB</p>
                               {resumeFile && <p className="text-sm text-green-600 dark:text-green-400 mt-2">{resumeFile.name}</p>}
                            </div>
                         </div>
                    </div>
                     {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}
                    <div className="pt-2">
                        <button type="submit" disabled={isSubmitting || !resumeFile} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-900">
                            {isSubmitting ? <Spinner size="sm" /> : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyModal;
