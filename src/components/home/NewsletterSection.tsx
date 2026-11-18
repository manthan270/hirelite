import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function NewsletterSection() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const emailValue = (formData.get('email') as string) ?? '';
        if (!emailValue.includes('@')) {
            toast.error('Please enter a valid email address.');
            return;
        }
        toast('Newsletter signup is a preview; your email was not submitted.');
    };

    return (
        <section className="bg-[#F1EFE6] dark:bg-gradient-to-b dark:from-[#0B0F0C] dark:to-[#101310] transition-colors duration-500">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-xl bg-white dark:bg-white/[0.04] p-8 md:p-10 border border-black/[0.04] dark:border-white/[0.06] transition-colors duration-500"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="eyebrow-label text-primary dark:text-[#55A697] mb-2">New</p>
                            <h3 className="editorial-headline text-2xl font-semibold text-[#1A211D] dark:text-white transition-colors duration-500">Weekly Career Signal</h3>
                            <p className="mt-1 text-sm text-[#6B6B73] dark:text-[#8A8A90]">
                                Get curated openings, salary trends, and interview tips every Friday.
                            </p>
                            <p className="mt-2 text-xs text-[#6B6B73] dark:text-[#8A8A90]">
                                This preview is not connected to a mailing list.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="h-11 min-w-[250px] rounded-lg bg-[#F8F6EE] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.06] px-4 text-sm text-[#1A211D] dark:text-white placeholder:text-[#6B6B73] dark:placeholder:text-[#8A8A90] focus:outline-none focus:ring-1 focus:ring-primary/40 dark:focus:ring-[#1F766A]/40 dark:focus:bg-white/[0.08] transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="inline-flex h-11 items-center justify-center rounded-lg gradient-cta dark:bg-white dark:bg-none px-5 text-sm font-semibold text-white dark:text-[#1A211D] hover:brightness-108 dark:hover:bg-[#F1EFE6] transition-all"
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
