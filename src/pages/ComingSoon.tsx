import { Link, useSearchParams } from 'react-router-dom';
import { Clock3, ArrowRight } from 'lucide-react';

export function ComingSoon() {
    const [searchParams] = useSearchParams();
    const feature = searchParams.get('feature') ?? 'This feature';

    return (
        <div className="flex-grow bg-background-light dark:bg-background-dark py-20 px-4 transition-colors duration-500">
            <div className="mx-auto max-w-3xl">
                <div className="glass-card border border-white/40 dark:border-slate-700/50 p-10 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Clock3 className="h-7 w-7" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Coming Soon</h1>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        {feature} is on our roadmap and will be available soon.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            to="/jobs"
                            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                        >
                            Explore Jobs
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Contact Support
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
