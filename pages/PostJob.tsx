
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Job } from '../types';

const PostJob: React.FC = () => {
    const navigate = useNavigate();
    const { addJob } = useAppContext();
    const [job, setJob] = useState<Omit<Job, 'id' | 'responsibilities' | 'qualifications'> & {responsibilities: string, qualifications: string}>({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        description: '',
        responsibilities: '',
        qualifications: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJob(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newJob: Job = {
            ...job,
            id: new Date().toISOString(),
            responsibilities: job.responsibilities.split('\n').filter(r => r.trim() !== ''),
            qualifications: job.qualifications.split('\n').filter(q => q.trim() !== ''),
        };
        addJob(newJob);
        navigate('/hr');
    };
    
    const inputClasses = "mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
    const labelClasses = "block text-sm font-medium text-slate-700 dark:text-slate-300";

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Post a New Job</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className={labelClasses}>Job Title</label>
                    <input type="text" name="title" id="title" value={job.title} onChange={handleChange} className={inputClasses} required />
                </div>
                 <div>
                    <label htmlFor="company" className={labelClasses}>Company</label>
                    <input type="text" name="company" id="company" value={job.company} onChange={handleChange} className={inputClasses} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="location" className={labelClasses}>Location</label>
                        <input type="text" name="location" id="location" value={job.location} onChange={handleChange} className={inputClasses} required />
                    </div>
                    <div>
                        <label htmlFor="type" className={labelClasses}>Job Type</label>
                        <select name="type" id="type" value={job.type} onChange={handleChange} className={inputClasses}>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className={labelClasses}>Job Description</label>
                    <textarea name="description" id="description" rows={4} value={job.description} onChange={handleChange} className={inputClasses} required />
                </div>
                 <div>
                    <label htmlFor="responsibilities" className={labelClasses}>Responsibilities (one per line)</label>
                    <textarea name="responsibilities" id="responsibilities" rows={4} value={job.responsibilities} onChange={handleChange} className={inputClasses} />
                </div>
                 <div>
                    <label htmlFor="qualifications" className={labelClasses}>Qualifications (one per line)</label>
                    <textarea name="qualifications" id="qualifications" rows={4} value={job.qualifications} onChange={handleChange} className={inputClasses} />
                </div>
                <div className="flex justify-end pt-4">
                     <button type="button" onClick={() => navigate('/hr')} className="bg-white dark:bg-slate-700 py-2 px-4 border border-slate-300 dark:border-slate-500 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3">
                        Cancel
                    </button>
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Post Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostJob;
