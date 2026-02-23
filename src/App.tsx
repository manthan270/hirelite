import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Home } from '@/pages/Home';
import { Jobs } from '@/pages/candidate/Jobs';
import { JobDetail } from '@/pages/candidate/JobDetail';
import ResumeAnalyzer from '@/pages/candidate/ResumeAnalyzer';
import CompanyProfile from '@/pages/jobs/CompanyProfile';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import CandidateDashboard from '@/pages/dashboard/CandidateDashboard';
import EmployerDashboard from '@/pages/dashboard/EmployerDashboard';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { ComingSoon } from '@/pages/ComingSoon';
import { useAuthStore } from '@/store/useAuthStore';
import { Toaster } from 'react-hot-toast';

function AppContent() {
    const [searchParams] = useSearchParams();
    const login = useAuthStore((state) => state.login);
    const { isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        const demoRole = searchParams.get('demo');
        if (demoRole === 'candidate') {
            login('demo@candidate.com', 'candidate');
        } else if (demoRole === 'employer') {
            login('demo@employer.com', 'employer');
        }
    }, [searchParams, login]);

    return (
        <>
            <Toaster position="top-right" />
            <Routes>
                {/* Public Routes - Wrapped in MainLayout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/:id" element={<JobDetail />} />
                    <Route path="/company/:id" element={<CompanyProfile />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />

                    {/* Redirects */}
                    <Route path="/post-job" element={<Navigate to="/dashboard/employer" replace />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
                        <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                        <Route path="/dashboard/resume-analyzer" element={<ResumeAnalyzer />} />
                        {/* Placeholder for nested dashboard routes */}
                        <Route path="/dashboard/candidate/*" element={<div className="text-slate-500 p-8">Section Coming Soon</div>} />
                        <Route path="/dashboard/employer/*" element={<div className="text-slate-500 p-8">Section Coming Soon</div>} />
                    </Route>
                </Route>

                {/* Auth routes */}
                <Route path="/login" element={
                    isAuthenticated ? (
                        <Navigate to={user?.role === 'employer' ? '/dashboard/employer' : '/dashboard/candidate'} />
                    ) : (
                        <Login />
                    )
                } />
                <Route path="/register" element={
                    isAuthenticated ? (
                        <Navigate to={user?.role === 'employer' ? '/dashboard/employer' : '/dashboard/candidate'} />
                    ) : (
                        <Register />
                    )
                } />
            </Routes>
        </>
    );
}

function App() {
    return <AppContent />;
}

export default App;
