import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Home } from '@/pages/Home';
import { useAuthStore } from '@/store/useAuthStore';
import { Toaster } from 'react-hot-toast';

// route-level code splitting
const Jobs = lazy(() => import('@/pages/candidate/Jobs'));
const JobDetail = lazy(() => import('@/pages/candidate/JobDetail').then(m => ({ default: m.JobDetail })));
const ResumeAnalyzer = lazy(() => import('@/pages/candidate/ResumeAnalyzer'));
const CompanyProfile = lazy(() => import('@/pages/jobs/CompanyProfile'));
const SalaryInsights = lazy(() => import('@/pages/jobs/SalaryInsights'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Register = lazy(() => import('@/pages/auth/Register'));
const CandidateDashboard = lazy(() => import('@/pages/dashboard/CandidateDashboard'));
const EmployerDashboard = lazy(() => import('@/pages/dashboard/EmployerDashboard'));
const Messages = lazy(() => import('@/pages/dashboard/Messages'));
const MyApplications = lazy(() => import('@/pages/dashboard/MyApplications'));
const SavedJobs = lazy(() => import('@/pages/dashboard/SavedJobs'));
const About = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })));
const ComingSoon = lazy(() => import('@/pages/ComingSoon').then(m => ({ default: m.ComingSoon })));

function PageLoader() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
    );
}

// the old code had `App` wrapping `AppContent` for no reason — just export directly
export default function App() {
    const [searchParams] = useSearchParams();
    const login = useAuthStore((state) => state.login);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    // Demo shortcuts are available only on the local development server.
    useEffect(() => {
        if (!import.meta.env.DEV || isAuthenticated) return;
        const demoRole = searchParams.get('demo');
        if (demoRole === 'candidate') login('demo@candidate.com', 'candidate');
        else if (demoRole === 'employer') login('demo@employer.com', 'employer');
    }, [searchParams, login, isAuthenticated]);

    return (
        <MotionConfig reducedMotion="user">
            <Toaster position="top-right" />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* public */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/jobs/:id" element={<JobDetail />} />
                        <Route path="/company/:id" element={<CompanyProfile />} />
                        <Route path="/salary-insights" element={<SalaryInsights />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/coming-soon" element={<ComingSoon />} />
                        <Route path="/post-job" element={<Navigate to="/dashboard/employer" replace />} />
                    </Route>

                    {/* protected — requires auth */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<DashboardLayout />}>
                            <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
                                <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
                                <Route path="/dashboard/resume-analyzer" element={<ResumeAnalyzer />} />
                                <Route path="/dashboard/candidate/applications" element={<MyApplications />} />
                                <Route path="/dashboard/candidate/saved" element={<SavedJobs />} />
                                <Route path="/dashboard/candidate/*" element={<div className="text-[#6B6B73] dark:text-[#8A8A90] p-8">Section Coming Soon</div>} />
                            </Route>
                            <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
                                <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                                <Route path="/dashboard/employer/*" element={<div className="text-[#6B6B73] dark:text-[#8A8A90] p-8">Section Coming Soon</div>} />
                            </Route>
                            <Route path="/dashboard/messages" element={<Messages />} />
                        </Route>
                    </Route>

                    {/* auth */}
                    <Route path="/login" element={
                        isAuthenticated
                            ? <Navigate to={user?.role === 'employer' ? '/dashboard/employer' : '/dashboard/candidate'} />
                            : <Login />
                    } />
                    <Route path="/register" element={
                        isAuthenticated
                            ? <Navigate to={user?.role === 'employer' ? '/dashboard/employer' : '/dashboard/candidate'} />
                            : <Register />
                    } />
                </Routes>
            </Suspense>
        </MotionConfig>
    );
}
