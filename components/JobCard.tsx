
import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';

interface JobCardProps {
    job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col h-full">
            <div className="flex-grow">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{job.title}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300 whitespace-nowrap">{job.type}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{job.company} - {job.location}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 line-clamp-3">
                    {job.description}
                </p>
            </div>
            <div className="mt-6 flex justify-end">
                <Link
                    to={`/job/${job.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default JobCard;