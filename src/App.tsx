import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Home } from '@/pages/Home';
import { useAuthStore } from '@/store/useAuthStore';
import { Toaster } from 'react-hot-toast';

/* ─── Lazy-loaded pages (route-level code splitting) ──────────── */
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
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* Public Routes - Wrapped in MainLayout */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/jobs/:id" element={<JobDetail />} />
                        <Route path="/company/:id" element={<CompanyProfile />} />
                        <Route path="/salary-insights" element={<SalaryInsights />} />
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
                            <Route path="/dashboard/messages" element={<Messages />} />
                            <Route path="/dashboard/candidate/applications" element={<MyApplications />} />
                            <Route path="/dashboard/candidate/saved" element={<SavedJobs />} />
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
            </Suspense>
        </>
    );
}

function App() {
    return <AppContent />;
}

export default App;
