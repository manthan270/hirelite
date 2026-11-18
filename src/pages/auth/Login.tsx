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
    const demoAuthEnabled = import.meta.env.DEV;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!demoAuthEnabled) {
            toast.error('Sign-in is unavailable until server-side authentication is configured.');
            return;
        }

        const role = email.toLowerCase().includes('employer') ? 'employer' : 'candidate';
        login(email, role);
        toast.success(`Signed in as ${role}.`);
        navigate(`/dashboard/${role}`);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F6EE] p-4 transition-colors dark:bg-[#101310]">
            <div className="relative z-10 w-full max-w-[420px] rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm transition-colors dark:border-white/[0.09] dark:bg-[#171B18] sm:p-8">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#1A211D] dark:text-white font-display">Welcome back</h1>
                    <p className="text-[#6B6B73] dark:text-[#8A8A90] text-sm mt-2">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary font-semibold hover:underline">
                            Sign up free
                        </Link>
                    </p>
                    <p role="status" className="text-xs text-[#6B6B73] dark:text-[#8A8A90] mt-3">
                        {demoAuthEnabled
                            ? 'Development preview: sign-in is simulated and does not verify credentials.'
                            : 'Sign-in is disabled until a server-side authentication provider is connected.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-[#1A211D] dark:text-[#EAEAE8] mb-1.5" htmlFor="email">
                            Email address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                            disabled={!demoAuthEnabled}
                            startIcon={<Mail className="w-4 h-4 text-[#6B6B73]" />}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#1A211D] dark:text-[#EAEAE8] mb-1.5" htmlFor="password">
                            Password
                        </label>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            disabled={!demoAuthEnabled}
                            startIcon={<Lock className="w-4 h-4 text-[#6B6B73]" />}
                            endIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-pressed={showPassword}
                                    className="rounded-md p-1 text-[#62626B] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-[#B5B5BD] dark:hover:text-[#B7DED5]"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            }
                        />
                        <div className="flex justify-end mt-2">
                            <Link to="/contact" className="text-xs text-primary font-medium hover:underline">
                                Need help signing in?
                            </Link>
                        </div>
                    </div>

                    <Button type="submit" disabled={!demoAuthEnabled} className="w-full font-bold py-6 text-[15px] rounded-xl gradient-cta text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 border-0">
                        {demoAuthEnabled ? 'Sign In to EliteHire' : 'Sign-in unavailable'}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-black/[0.04] dark:border-white/[0.06]" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 bg-[#F8F6EE] dark:bg-[#101310] text-xs text-[#62626B] dark:text-[#A0A0A8] tracking-wide font-medium">
                            Other sign-in methods
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        disabled
                        className="w-full h-12 rounded-xl dark:text-[#C4C4CB]"
                    >
                        Google <span className="ml-1.5 text-[11px] font-medium text-[#6B6B73] dark:text-[#A0A0A8]">Coming soon</span>
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        disabled
                        className="w-full h-12 rounded-xl dark:text-[#C4C4CB]"
                    >
                        LinkedIn <span className="ml-1.5 text-[11px] font-medium text-[#6B6B73] dark:text-[#A0A0A8]">Coming soon</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
