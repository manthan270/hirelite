import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function NewsletterSection() {
    const [email, setEmail] = useState('');

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes('@')) {
            toast.error('Please enter a valid email address.');
            return;
        }
        toast.success('Thanks! You are subscribed to the Weekly Career Signal.');
        setEmail('');
    }, [email]);

    return (
        <section className="bg-[#F0EFEC] dark:bg-gradient-to-b dark:from-[#0D0D14] dark:to-[#0A0A0F] transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-xl bg-white dark:bg-white/[0.04] p-8 md:p-10 border border-black/[0.04] dark:border-white/[0.06] transition-colors duration-500"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="eyebrow-label text-primary dark:text-[#8B7EF8] mb-2">New</p>
                            <h3 className="editorial-headline text-2xl font-semibold text-[#1A1A1F] dark:text-white transition-colors duration-500">Weekly Career Signal</h3>
                            <p className="mt-1 text-sm text-[#6B6B73] dark:text-[#8A8A90]">
                                Get curated openings, salary trends, and interview tips every Friday.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="h-11 min-w-[250px] rounded-lg bg-[#F7F6F3] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.06] px-4 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B73] dark:placeholder:text-[#8A8A90] focus:outline-none focus:ring-1 focus:ring-primary/40 dark:focus:ring-[#5B4CDB]/40 dark:focus:bg-white/[0.08] transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="inline-flex h-11 items-center justify-center rounded-lg gradient-cta dark:bg-white dark:bg-none px-5 text-sm font-semibold text-white dark:text-[#1A1A1F] hover:brightness-108 dark:hover:bg-[#F0EFEC] transition-all"
                            >
                                Subscribe <CheckCircle2 className="ml-2 h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
