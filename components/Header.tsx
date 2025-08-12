
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    const activeLinkClass = "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white";
    const inactiveLinkClass = "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800";
    
    return (
        <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="flex-shrink-0 flex items-center space-x-2">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400"><path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"></path><path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"></path><path d="M15 2v5h5"></path></svg>
                            <span className="text-xl font-bold text-slate-800 dark:text-slate-100">Gemini ATS</span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        isActive ? activeLinkClass : inactiveLinkClass
                                    }`
                                }
                            >
                                Find a Job
                            </NavLink>
                            <NavLink
                                to="/hr"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        isActive ? activeLinkClass : inactiveLinkClass
                                    }`
                                }
                            >
                                For Employers
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
