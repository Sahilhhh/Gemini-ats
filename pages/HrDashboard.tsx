
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ApplicantCard from '../components/ApplicantCard';

const HrDashboard: React.FC = () => {
    const { jobs, applicants } = useAppContext();

    // In a real app, this would be filtered to jobs posted by the logged-in HR user
    const hrJobs = jobs; 

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Employer Dashboard</h1>
                <Link
                    to="/hr/post-job"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
                >
                    Post a New Job
                </Link>
            </div>

            <div className="space-y-12">
                {hrJobs.length > 0 ? hrJobs.map(job => {
                    const jobApplicants = applicants.filter(a => a.jobId === job.id)
                        .sort((a, b) => b.atsAnalysis.matchScore - a.atsAnalysis.matchScore);

                    return (
                        <div key={job.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{job.title}</h2>
                            <p className="text-slate-600 dark:text-slate-400">{job.location}</p>
                            
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                                    {jobApplicants.length} Applicant{jobApplicants.length !== 1 && 's'}
                                </h3>
                                {jobApplicants.length > 0 ? (
                                    <div className="space-y-4">
                                        {jobApplicants.map(applicant => (
                                            <ApplicantCard key={applicant.id} applicant={applicant} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                                        <p className="text-slate-500 dark:text-slate-400">No applicants for this position yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }) : (
                     <div className="text-center py-12 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">No Jobs Posted</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Get started by posting your first job opening.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HrDashboard;
