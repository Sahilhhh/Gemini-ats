
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import JobCard from '../components/JobCard';

const JobList: React.FC = () => {
    const { jobs } = useAppContext();

    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-5xl md:text-6xl">Find Your Next Opportunity</h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300">
                    Browse our curated list of genuine job openings and let our AI help you stand out.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default JobList;
