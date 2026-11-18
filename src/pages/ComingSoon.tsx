import { Link, useSearchParams } from 'react-router-dom';
import { Clock3, ArrowRight } from 'lucide-react';

export function ComingSoon() {
    const [searchParams] = useSearchParams();
    const feature = searchParams.get('feature') ?? 'This feature';

    return (
        <div className="flex-grow bg-[#F8F6EE] dark:bg-[#101310] py-20 px-4 transition-colors duration-500">
            <div className="mx-auto max-w-3xl">
                <div className="glass-card border border-black/[0.04] dark:border-white/[0.06] p-10 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/[0.06] text-primary dark:text-[#55A697]">
                        <Clock3 className="h-7 w-7" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#1A211D] dark:text-white font-display">Coming Soon</h1>
                    <p className="mt-4 text-[#6B6B73] dark:text-[#8A8A90]">
                        {feature} is on our roadmap and will be available soon.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            to="/jobs"
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                        >
                            Explore Jobs
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-lg border border-black/[0.08] dark:border-white/[0.08] px-5 py-3 text-sm font-semibold text-[#1A211D] dark:text-[#EAEAE8] hover:bg-[#F1EFE6] dark:hover:bg-white/[0.06] transition-colors"
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
