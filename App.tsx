
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Header from './components/Header';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';
import HrDashboard from './pages/HrDashboard';
import PostJob from './pages/PostJob';

const App: React.FC = () => {
    return (
        <DataProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <Routes>
                            <Route path="/" element={<JobList />} />
                            <Route path="/job/:jobId" element={<JobDetails />} />
                            <Route path="/hr" element={<HrDashboard />} />
                            <Route path="/hr/post-job" element={<PostJob />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </DataProvider>
    );
};

export default App;
