
import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', text }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-8 h-8 border-4',
        lg: 'w-12 h-12 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div
                className={`animate-spin rounded-full border-slate-300 border-t-slate-600 ${sizeClasses[size]}`}
            ></div>
            {text && <p className="text-slate-600 dark:text-slate-300">{text}</p>}
        </div>
    );
};

export default Spinner;
