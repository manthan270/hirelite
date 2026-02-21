import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const role = email.toLowerCase().includes('employer') ? 'employer' : 'candidate';
        login(email, role);
        toast.success(`Signed in as ${role}.`);
        navigate(`/dashboard/${role}`);
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF2FF] dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 transition-colors duration-500">
            {/* Background Grid Pattern and Animated Orbs */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] pointer-events-none"></div>
            <div className="absolute top-1/4 -left-10 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-pink-400/20 dark:bg-pink-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>

            <div className="relative z-10 w-full max-w-[420px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/60 dark:border-slate-700/50 transition-all duration-300">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Welcome back</h1>
                    <p className="text-slate-500 text-sm mt-2">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary font-semibold hover:underline">
                            Sign up free
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="email">
                            Email address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            startIcon={<Mail className="w-4 h-4 text-slate-400" />}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">
                                Password
                            </label>
                            <Link to="/contact" className="text-xs text-primary font-medium hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            startIcon={<Lock className="w-4 h-4 text-slate-400" />}
                            endIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            }
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="remember"
                            type="checkbox"
                            className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                        />
                        <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400">
                            Remember me for 30 days
                        </label>
                    </div>

                    <Button type="submit" className="w-full font-bold py-6 text-[15px] rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 transition-all duration-300 border border-blue-400/20">
                        Sign In to HireLite
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 bg-transparent backdrop-blur-sm text-xs text-slate-400 uppercase tracking-wider font-medium">
                            Or sign in with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 rounded-[14px] bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm dark:text-slate-200 border-slate-200/60 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all"
                        onClick={() => toast('Google sign-in will be available soon.')}
                    >
                        Google
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 rounded-[14px] bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm dark:text-slate-200 border-slate-200/60 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm transition-all"
                        onClick={() => toast('LinkedIn sign-in will be available soon.')}
                    >
                        LinkedIn
                    </Button>
                </div>
            </div>
        </div>
    );
}
