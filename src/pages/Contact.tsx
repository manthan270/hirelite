import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    Mail, Phone, MapPin, User, Send,
    Clock, MessageCircle, ArrowRight, Headset,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

/* ── Animation helpers ──────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
};

/* ── Contact channels ───────────────────────────────────────── */
const CHANNELS = [
    {
        icon: Mail, title: 'Email Us', detail: 'support@elitehire.com',
        sub: 'We reply within 24 hours', href: 'mailto:support@elitehire.com',
        accent: 'text-[#5B4CDB]', bgLight: 'bg-[#5B4CDB]/[0.06]', bgDark: 'dark:bg-[#5B4CDB]/[0.08]',
    },
    {
        icon: Phone, title: 'Call Us', detail: '+1 (555) 123-4567',
        sub: 'Mon – Fri, 9 AM – 6 PM IST', href: 'tel:+15551234567',
        accent: 'text-[#3DAA8F]', bgLight: 'bg-[#3DAA8F]/[0.06]', bgDark: 'dark:bg-[#3DAA8F]/[0.08]',
    },
    {
        icon: MapPin, title: 'Visit Us', detail: '123 Tech Lane, San Francisco, CA',
        sub: 'Open for scheduled visits', href: 'https://maps.google.com/?q=San+Francisco+CA',
        accent: 'text-[#D4A04A]', bgLight: 'bg-[#D4A04A]/[0.06]', bgDark: 'dark:bg-[#D4A04A]/[0.08]',
    },
];

/* ── FAQ ─────────────────────────────────────────────────────── */
const FAQ = [
    { q: 'How long does onboarding take?', a: 'Most employers are live within 48 hours. Candidates can start applying the moment they create a profile.' },
    { q: 'Is EliteHire free for job seekers?', a: 'Absolutely. Searching, applying, and messaging employers is 100% free for candidates — no hidden charges.' },
    { q: 'Can I schedule a live demo?', a: 'Yes! Click the "Request a Demo" button or email us. Our team will set up a personalised walkthrough.' },
];

export function Contact() {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', subject: '', message: '',
    });
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const handleChange = useCallback(
        (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        }, [],
    );

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.email || !formData.message) {
            toast.error('Please complete all required fields.');
            return;
        }
        toast.success('Message sent! Our team will contact you soon.');
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    }, [formData]);

    return (
        <div className="flex-grow bg-[#F7F6F3] dark:bg-[#0A0A0F] transition-colors duration-500 relative overflow-hidden">

            {/* ── Ambient backgrounds ────────────────────────── */}
            <div className="absolute inset-0 dark:opacity-0 opacity-70 pointer-events-none"
                style={{
                    backgroundImage: `
                        radial-gradient(at 20% 0%, rgba(91,76,219,0.08) 0px, transparent 55%),
                        radial-gradient(at 80% 100%, rgba(139,126,248,0.06) 0px, transparent 50%)
                    `,
                }}
            />
            <div className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none"
                style={{
                    backgroundImage: `
                        radial-gradient(at 15% 20%, rgba(91,76,219,0.12) 0px, transparent 55%),
                        radial-gradient(at 80% 85%, rgba(139,126,248,0.08) 0px, transparent 50%)
                    `,
                }}
            />
            <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #6B6B73 0.5px, transparent 0.5px)',
                    backgroundSize: '32px 32px',
                }}
            />


            {/* ══════════════ HERO BANNER ══════════════ */}
            <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial="hidden" animate="visible"
                        className="max-w-3xl mx-auto"
                    >
                        <motion.span
                            variants={fadeUp} custom={0}
                            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-md text-xs font-semibold tracking-wide uppercase bg-[#5B4CDB]/[0.06] dark:bg-white/[0.05] text-[#5B4CDB] dark:text-[#8B7EF8] border border-[#5B4CDB]/[0.1] dark:border-white/[0.07]"
                        >
                            <Headset className="w-3.5 h-3.5" />
                            Support Centre
                        </motion.span>

                        <motion.h1
                            variants={fadeUp} custom={1}
                            className="editorial-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1F] dark:text-white mb-5 tracking-tight"
                        >
                            We'd Love to{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B4CDB] via-[#8B7EF8] to-[#D4A04A] dark:from-[#8B7EF8] dark:via-[#B4AAFF] dark:to-[#E8C97A]">
                                Hear From You
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp} custom={2}
                            className="text-lg text-[#6B6B73] dark:text-[#8A8A90] max-w-xl mx-auto leading-relaxed"
                        >
                            Whether you need help, have a feature request, or just want to say hello — our team is ready to assist.
                        </motion.p>
                    </motion.div>
                </div>
            </section>


            {/* ══════════════ CONTACT CARDS ══════════════ */}
            <section className="relative z-10 pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {CHANNELS.map((ch, i) => (
                            <motion.a
                                key={ch.title}
                                href={ch.href}
                                target={ch.href.startsWith('http') ? '_blank' : undefined}
                                rel={ch.href.startsWith('http') ? 'noreferrer' : undefined}
                                variants={fadeUp} custom={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="group relative flex items-start gap-4 p-6 rounded-xl bg-white/80 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] hover:border-black/[0.08] dark:hover:border-white/[0.1] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                            >
                                {/* Icon */}
                                <div className={`shrink-0 w-11 h-11 rounded-lg ${ch.bgLight} ${ch.bgDark} flex items-center justify-center transition-colors duration-200`}>
                                    <ch.icon className={`w-5 h-5 ${ch.accent}`} />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-[15px] font-semibold text-[#1A1A1F] dark:text-white mb-0.5 flex items-center gap-2 font-display">
                                        {ch.title}
                                        <ArrowRight className="w-3.5 h-3.5 text-[#D1D0CC] dark:text-[#6B6B73] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                                    </h3>
                                    <p className={`text-sm font-medium ${ch.accent} mb-1 truncate`}>{ch.detail}</p>
                                    <p className="text-xs text-[#6B6B73] dark:text-[#8A8A90] flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {ch.sub}
                                    </p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════ TWO-COLUMN: FORM + FAQ ══════════════ */}
            <section className="relative z-10 pb-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

                        {/* ─── Form (3 cols) ──────────────────────── */}
                        <motion.div
                            variants={fadeUp} custom={0}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="lg:col-span-3 bg-white/80 dark:bg-white/[0.03] rounded-xl border border-black/[0.04] dark:border-white/[0.06] p-8 md:p-10"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-lg bg-[#5B4CDB]/[0.06] dark:bg-[#5B4CDB]/[0.08] flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-[#5B4CDB] dark:text-[#8B7EF8]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-[#1A1A1F] dark:text-white font-display">Send a Message</h2>
                                    <p className="text-xs text-[#6B6B73] dark:text-[#8A8A90]">Fields marked with * are required</p>
                                </div>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* Name row */}
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#6B6B73] dark:text-[#8A8A90] mb-1.5 uppercase tracking-wider" htmlFor="firstName">
                                            First Name *
                                        </label>
                                        <Input
                                            id="firstName" type="text" required
                                            value={formData.firstName}
                                            onChange={handleChange('firstName')}
                                            placeholder=""
                                            startIcon={<User className="w-4 h-4 text-[#6B6B73]" />}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#6B6B73] dark:text-[#8A8A90] mb-1.5 uppercase tracking-wider" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <Input
                                            id="lastName" type="text"
                                            value={formData.lastName}
                                            onChange={handleChange('lastName')}
                                            placeholder=""
                                            startIcon={<User className="w-4 h-4 text-[#6B6B73]" />}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#6B6B73] dark:text-[#8A8A90] mb-1.5 uppercase tracking-wider" htmlFor="email">
                                        Email Address *
                                    </label>
                                    <Input
                                        id="email" type="email" required
                                        value={formData.email}
                                        onChange={handleChange('email')}
                                        placeholder="abc@example.com"
                                        startIcon={<Mail className="w-4 h-4 text-[#6B6B73]" />}
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#6B6B73] dark:text-[#8A8A90] mb-1.5 uppercase tracking-wider" htmlFor="subject">
                                        Subject
                                    </label>
                                    <Input
                                        id="subject" type="text"
                                        value={formData.subject}
                                        onChange={handleChange('subject')}
                                        placeholder="How can we help?"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#6B6B73] dark:text-[#8A8A90] mb-1.5 uppercase tracking-wider" htmlFor="message">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message" rows={5} required
                                        value={formData.message}
                                        onChange={handleChange('message')}
                                        placeholder="Tell us more about your inquiry..."
                                        className="w-full rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-white/[0.04] px-4 py-3 text-[15px] text-[#1A1A1F] dark:text-[#EAEAE8] placeholder:text-[#6B6B73] dark:placeholder:text-[#8A8A90] focus:outline-none focus:ring-1 focus:ring-[#5B4CDB] focus:border-[#5B4CDB] focus:bg-white dark:focus:bg-white/[0.06] transition-all duration-200 resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full gradient-cta text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-[0_4px_16px_rgba(91,76,219,0.25)] hover:shadow-glow active:scale-[0.98] border-0 h-auto flex items-center justify-center gap-2 text-[15px]"
                                >
                                    <Send className="w-4 h-4" /> Send Message
                                </Button>
                            </form>
                        </motion.div>


                        {/* ─── FAQ sidebar (2 cols) ───────────────── */}
                        <motion.div
                            variants={fadeUp} custom={1}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="lg:col-span-2 space-y-4"
                        >
                            <div className="mb-2">
                                <h3 className="text-lg font-semibold text-[#1A1A1F] dark:text-white mb-1 font-display">Frequently Asked</h3>
                                <p className="text-sm text-[#6B6B73] dark:text-[#8A8A90]">Quick answers to common questions.</p>
                            </div>

                            {FAQ.map((faq, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    className="w-full text-left bg-white/80 dark:bg-white/[0.03] rounded-xl border border-black/[0.04] dark:border-white/[0.06] p-5 hover:border-black/[0.08] dark:hover:border-white/[0.1] transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <span className="text-sm font-semibold text-[#1A1A1F] dark:text-white/90">{faq.q}</span>
                                        <span className={`shrink-0 w-5 h-5 rounded-md text-xs font-bold flex items-center justify-center transition-all duration-200 ${expandedFaq === i ? 'bg-[#5B4CDB]/[0.1] dark:bg-[#5B4CDB]/[0.15] text-[#5B4CDB] dark:text-[#8B7EF8] rotate-45' : 'bg-[#F0EFEC] dark:bg-white/[0.05] text-[#6B6B73]'}`}>
                                            +
                                        </span>
                                    </div>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: expandedFaq === i ? 'auto' : 0, opacity: expandedFaq === i ? 1 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm text-[#6B6B73] dark:text-[#8A8A90] leading-relaxed mt-3 pr-6">{faq.a}</p>
                                    </motion.div>
                                </button>
                            ))}

                            {/* Extra CTA card */}
                            <div className="bg-gradient-to-br from-[#5B4CDB] to-[#4A3BBF] rounded-xl p-6 text-white relative overflow-hidden">
                                <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/8 rounded-full blur-2xl" />
                                <h4 className="text-base font-semibold mb-1 relative z-10 font-display">Need a live demo?</h4>
                                <p className="text-sm text-white/75 mb-4 relative z-10">
                                    Get a personalised walkthrough of EliteHire with one of our specialists.
                                </p>
                                <a
                                    href="mailto:demo@elitehire.com"
                                    className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold bg-white/15 hover:bg-white/25 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors duration-200"
                                >
                                    Request a Demo <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
