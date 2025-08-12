
import React from 'react';
import { Applicant } from '../types';

interface ApplicantCardProps {
    applicant: Applicant;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant }) => {
    const { atsAnalysis } = applicant;
    const { matchScore, summary, extractedSkills, extractedContact } = atsAnalysis;

    const getScoreColor = (score: number) => {
        if (score >= 85) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        if (score >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex-1">
                    <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">{extractedContact.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{extractedContact.email} {extractedContact.phone && `| ${extractedContact.phone}`}</p>
                </div>
                <div className="flex items-center gap-3">
                     <span className={`text-sm font-bold px-3 py-1 rounded-full ${getScoreColor(matchScore)}`}>
                        {matchScore}% Match
                    </span>
                </div>
            </div>
            <div className="mt-4 border-t border-slate-200 dark:border-slate-600 pt-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">{summary}</p>
                {extractedSkills.length > 0 && (
                    <div className="mt-3">
                        <h5 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Relevant Skills</h5>
                        <div className="flex flex-wrap gap-2">
                            {extractedSkills.slice(0, 5).map(skill => (
                                <span key={skill} className="bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium px-2 py-1 rounded-md">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicantCard;
