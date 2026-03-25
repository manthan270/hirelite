import { motion } from 'framer-motion';
import { MapPin, Users, Globe, CheckCircle2, Building2, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const BENEFITS = [
    "100% Health Coverage",
    "Unlimited PTO",
    "401(k) Matching",
    "Remote Workspace Stipend",
    "Annual Learning Budget",
    "Flexible Hours"
];

const OPEN_ROLES = [
    { id: 'techcorp-frontend', title: 'Senior Frontend Developer', location: 'Austin, TX (Hybrid)', salary: '$140k - $170k' },
    { id: 'techcorp-backend', title: 'Backend Engineer (Go/Rust)', location: 'Remote (US)', salary: '$150k - $190k' },
    { id: 'techcorp-product', title: 'Product Manager, Platform', location: 'Austin, TX', salary: '$130k - $160k' },
];

export default function CompanyProfile() {
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20 transition-colors">
            {/* Hero Banner */}
            <div className="h-[320px] relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">

                {/* Company Header Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 mb-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden transition-colors"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>

                    <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-2xl border-4 border-white dark:border-slate-800 shadow-lg flex items-center justify-center shrink-0 -mt-16 overflow-hidden z-10 bg-gradient-to-br from-indigo-500 to-purple-600">
                        <span className="text-white font-black text-5xl">T</span>
                    </div>

                    <div className="flex-1 w-full z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    TechCorp Global
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">Building the infrastructure for cloud-native apps</p>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button variant="outline" className="flex-1 md:flex-none">Save</Button>
                                <Button className="flex-1 md:flex-none px-8">Follow</Button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-y-4 gap-x-8 text-sm font-medium text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Austin, TX</span>
                            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400 dark:text-slate-500" /> 5,000+ Employees</span>
                            <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Enterprise Software</span>
                            <a href="#" className="flex items-center gap-2 text-primary dark:text-indigo-400 hover:underline"><Globe className="w-4 h-4" /> techcorp.io <ExternalLink className="w-3 h-3" /></a>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.section
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors"
                        >
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">About Us</h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                                <p>
                                    TechCorp Global is building the infrastructure for the next generation of cloud-native applications. Our teams tackle some of the hardest scaling problems on the web, securely processing billions of events per day.
                                </p>
                                <p>
                                    We believe in empowering our employees with autonomy and purpose. If you're passionate about distributed systems, elegant frontend interfaces, and open-source software, you'll belong here.
                                </p>
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors"
                        >
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Open Roles</h2>
                                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold text-sm rounded-full">{OPEN_ROLES.length} Jobs</span>
                            </div>
                            <div className="space-y-4">
                                {OPEN_ROLES.map((job) => (
                                    <div key={job.id} className="group p-5 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-primary dark:hover:border-primary hover:shadow-md transition-all cursor-pointer bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-primary dark:group-hover:text-primary transition-colors">{job.title}</h3>
                                            <div className="flex gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                                <span>{job.location}</span>
                                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full my-auto"></span>
                                                <span className="text-slate-600 dark:text-slate-300">{job.salary}</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <motion.section
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors"
                        >
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">Benefits & Perks</h2>
                            <ul className="space-y-4">
                                {BENEFITS.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium text-sm">
                                        <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </motion.section>

                        <motion.section
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-transparent dark:border-slate-800 p-1 overflow-hidden relative group transition-colors"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity"></div>
                            <div className="bg-white dark:bg-slate-900 rounded-[22px] p-7 relative z-10 border border-slate-100 dark:border-slate-800 transition-colors">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {['React', 'TypeScript', 'Node.js', 'Go', 'Kubernetes', 'AWS', 'PostgreSQL'].map(tech => (
                                        <span key={tech} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </div>
    );
}
