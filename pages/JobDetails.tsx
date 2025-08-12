
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ApplyModal from '../components/ApplyModal';
import { Job } from '../types';

const JobDetails: React.FC = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const { getJobById } = useAppContext();
    const [isModalOpen, setModalOpen] = useState(false);

    if (!jobId) {
        return <div className="text-center text-red-500">Job ID not found.</div>;
    }

    const job = getJobById(jobId);

    if (!job) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Job not found</h2>
                <Link to="/" className="text-indigo-600 hover:underline">Back to listings</Link>
            </div>
        );
    }
    
    const renderSection = (title: string, items: string[]) => (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{title}</h3>
            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                {items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>
    );

    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">{job.title}</h1>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{job.company} &middot; {job.location}</p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300 whitespace-nowrap">{job.type}</span>
                </div>
                <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Job Description</h3>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{job.description}</p>
                </div>
                
                {job.responsibilities.length > 0 && renderSection('Responsibilities', job.responsibilities)}
                {job.qualifications.length > 0 && renderSection('Qualifications', job.qualifications)}

                <div className="mt-10 text-center">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
                    >
                        Apply for this position
                    </button>
                </div>
            </div>
            <ApplyModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} job={job} />
        </>
    );
};

export default JobDetails;
