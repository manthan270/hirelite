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
        name: '',
        email: '',
        password: '',
        agreeTerms: false
    });
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreeTerms) {
            toast.error('Please accept the terms to continue.');
            return;
        }

        login(formData.email, role);
        toast.success('Account created successfully.');
        navigate(`/dashboard/${role}`);
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] flex flex-col lg:flex-row relative overflow-hidden bg-gradient-to-br from-[#F8FAFC] via-white to-[#EEF2FF] dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 transition-colors duration-500">
            {/* Background Grid Pattern and Animated Orbs */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] pointer-events-none"></div>
            <div className="absolute top-1/4 -left-10 w-72 h-72 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-pink-400/20 dark:bg-pink-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>

            <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 p-12 flex-col justify-between border-r border-slate-200/50 dark:border-slate-800/50 relative z-10 transition-colors duration-300">
                <div className="relative z-10 max-w-md mt-12">
                    <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
                        Unlock your <br />
                        <span className="text-primary">professional potential</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-10">
                        Join a curated community of top-tier talent and forward-thinking companies building the future.
                    </p>

                    <div className="space-y-6">
                        {[
                            { title: 'Smart Matching', desc: 'Get matched with roles that fit your skills perfectly.' },
                            { title: 'Real-time Tracking', desc: 'Track every application status instantly.' },
                            { title: 'Salary Transparency', desc: 'See compensation upfront. No guessing games.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary mt-1">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                        <ShieldCheck className="w-4 h-4" /> Trusted by 50,000+ professionals worldwide
                    </div>
                </div>

                {/* Removed static orb for dynamic ones */}
            </div>

            <div className="lg:w-7/12 xl:w-1/2 flex items-center justify-center p-6 lg:p-12 xl:p-16 relative z-10">
                <div className="w-full max-w-[520px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/60 dark:border-slate-700/50">
                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Create your account</h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-semibold hover:underline">
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-xl flex backdrop-blur-sm shadow-inner">
                            <button
                                type="button"
                                onClick={() => setRole('candidate')}
                                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${role === 'candidate' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            >
                                I am a Candidate
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('employer')}
                                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${role === 'employer' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            >
                                I am an Employer
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5" htmlFor="name">Full Name</label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Jane Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    startIcon={<User className="w-4 h-4 text-slate-400" />}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5" htmlFor="email">Work Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    startIcon={<Mail className="w-4 h-4 text-slate-400" />}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1.5" htmlFor="password">Password</label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Min. 8 characters"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    startIcon={<Lock className="w-4 h-4 text-slate-400" />}
                                />
                                <div className="flex gap-1 h-1.5 mt-2">
                                    <div className={`flex-1 rounded-full transition-colors ${formData.password.length > 0 ? 'bg-red-400' : 'bg-slate-200'}`}></div>
                                    <div className={`flex-1 rounded-full transition-colors ${formData.password.length > 8 ? 'bg-orange-400' : 'bg-slate-200'}`}></div>
                                    <div className={`flex-1 rounded-full transition-colors ${formData.password.length > 12 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                id="terms"
                                type="checkbox"
                                className="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                                checked={formData.agreeTerms}
                                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
                                I agree to the <Link to="/coming-soon?feature=Terms%20of%20Service" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/coming-soon?feature=Privacy%20Policy" className="text-primary hover:underline">Privacy Policy</Link>.
                            </label>
                        </div>

                        <Button type="submit" className="w-full font-bold py-6 text-[15px] rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-0.5 transition-all duration-300 border border-blue-400/20" disabled={!formData.agreeTerms}>
                            Create Account <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
