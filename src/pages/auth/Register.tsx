import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, User, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';

export default function Register() {
    const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', agreeTerms: false
    });
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const demoAuthEnabled = import.meta.env.DEV;
    const passwordLength = formData.password.length;
    const passwordLengthLabel = passwordLength === 0
        ? '8 characters minimum'
        : passwordLength < 8
            ? `${passwordLength} of 8 characters`
            : passwordLength < 12
                ? 'Minimum length reached'
                : '12+ characters';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!demoAuthEnabled) {
            toast.error('Account creation is unavailable until server-side authentication is configured.');
            return;
        }
        if (!formData.agreeTerms) {
            toast.error('Please accept the terms to continue.');
            return;
        }
        login(formData.email, role, formData.name);
        toast.success('Account created successfully.');
        navigate(`/dashboard/${role}`);
    };

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#F8F6EE] transition-colors dark:bg-[#101310] lg:flex-row">

            {/* left panel — value props */}
            <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 p-12 flex-col justify-between border-r border-black/[0.04] dark:border-white/[0.06] relative z-10 transition-colors duration-300">
                <div className="relative z-10 max-w-md mt-12">
                    <h1 className="editorial-headline text-5xl font-bold tracking-tight text-[#1A211D] dark:text-white leading-[1.1] mb-6">
                        Unlock your <br />
                        <span className="text-primary dark:text-[#A8D9CE]">professional potential</span>
                    </h1>
                    <p className="text-lg text-[#6B6B73] dark:text-[#8A8A90] font-medium leading-relaxed mb-10">
                        Explore sample roles, compare example salary ranges, and keep track of applications in the demo.
                    </p>

                    <div className="space-y-6">
                        {[
                            { title: 'Browse sample roles', desc: 'Compare role titles, locations, and example salary ranges.' },
                            { title: 'Track demo applications', desc: 'See the applications you submit in this local preview.' },
                            { title: 'Compare salary examples', desc: 'Review sample compensation before opening a role.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary mt-1">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#1A211D] dark:text-white">{item.title}</h3>
                                    <p className="text-[#6B6B73] dark:text-[#8A8A90] text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-[#6B6B73] dark:text-[#8A8A90] text-xs font-medium">
                        <ShieldCheck className="w-4 h-4" /> Local demo only; no account is created
                    </div>
                </div>
            </div>

            {/* right panel — form */}
            <div className="lg:w-7/12 xl:w-1/2 flex items-center justify-center p-6 lg:p-12 xl:p-16 relative z-10">
                <div className="w-full max-w-[520px] rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm dark:border-white/[0.09] dark:bg-[#171B18] sm:p-8">
                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-[#1A211D] dark:text-white mb-2 font-display">Create your account</h2>
                        <p className="text-[#6B6B73] dark:text-[#8A8A90]">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                Sign in here
                            </Link>
                        </p>
                        <p role="status" className="text-xs text-[#6B6B73] dark:text-[#8A8A90] mt-3">
                            {demoAuthEnabled
                                ? 'Development preview: account creation is simulated; no account or password is stored.'
                                : 'Account creation is disabled until a server-side authentication provider is connected.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* role toggle */}
                        <div className="bg-[#F1EFE6] dark:bg-white/[0.06] p-1.5 rounded-xl flex backdrop-blur-sm">
                            <button
                                type="button"
                                onClick={() => setRole('candidate')}
                                aria-pressed={role === 'candidate'}
                                className={`min-h-11 flex-1 rounded-lg px-2 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${role === 'candidate' ? 'bg-white text-primary shadow-sm dark:bg-[#24242D] dark:text-[#B7DED5]' : 'text-[#62626B] hover:text-[#1A211D] dark:text-[#B5B5BD] dark:hover:text-white'}`}
                            >
                                I am a Candidate
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('employer')}
                                aria-pressed={role === 'employer'}
                                className={`min-h-11 flex-1 rounded-lg px-2 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${role === 'employer' ? 'bg-white text-primary shadow-sm dark:bg-[#24242D] dark:text-[#B7DED5]' : 'text-[#62626B] hover:text-[#1A211D] dark:text-[#B5B5BD] dark:hover:text-white'}`}
                            >
                                I am an Employer
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#1A211D] dark:text-white mb-1.5" htmlFor="name">Full Name</label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Jane Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    autoComplete="name"
                                    required
                                    disabled={!demoAuthEnabled}
                                    startIcon={<User className="w-4 h-4 text-[#6B6B73]" />}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1A211D] dark:text-white mb-1.5" htmlFor="email">Work Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    autoComplete="email"
                                    required
                                    disabled={!demoAuthEnabled}
                                    startIcon={<Mail className="w-4 h-4 text-[#6B6B73]" />}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#1A211D] dark:text-white mb-1.5" htmlFor="password">Password</label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Min. 8 characters"
                                    aria-describedby="password-length"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                    disabled={!demoAuthEnabled}
                                    startIcon={<Lock className="w-4 h-4 text-[#6B6B73]" />}
                                />
                                <div className="mt-2.5">
                                    <div
                                        className="flex h-1.5 gap-1"
                                        role="progressbar"
                                        aria-label="Password length"
                                        aria-valuemin={0}
                                        aria-valuemax={12}
                                        aria-valuenow={Math.min(passwordLength, 12)}
                                        aria-valuetext={passwordLengthLabel}
                                    >
                                        {[0, 1, 2].map((segment) => (
                                            <span key={segment} className={`flex-1 rounded-full transition-colors ${passwordLength >= (segment + 1) * 4 ? 'bg-primary' : 'bg-black/[0.08] dark:bg-white/[0.1]'}`} />
                                        ))}
                                    </div>
                                    <p id="password-length" className="mt-1 text-xs text-[#62626B] dark:text-[#A0A0A8]">Password length · {passwordLengthLabel}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                id="terms"
                                type="checkbox"
                                className="mt-1 w-4 h-4 rounded border-black/[0.12] text-primary focus:ring-primary"
                                checked={formData.agreeTerms}
                                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                required
                                disabled={!demoAuthEnabled}
                            />
                            <label htmlFor="terms" className="text-sm text-[#6B6B73] dark:text-[#8A8A90]">
                                I agree to the <Link to="/coming-soon?feature=Terms%20of%20Service" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/coming-soon?feature=Privacy%20Policy" className="text-primary hover:underline">Privacy Policy</Link>.
                            </label>
                        </div>

                        <Button type="submit" className="w-full font-bold py-6 text-[15px] rounded-xl gradient-cta text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 border-0" disabled={!demoAuthEnabled || !formData.agreeTerms}>
                            {demoAuthEnabled ? 'Create Account' : 'Sign-up unavailable'} <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
