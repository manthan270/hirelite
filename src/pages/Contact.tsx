import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.email || !formData.message) {
            toast.error('Please complete all required fields.');
            return;
        }

        toast.success('Message sent! Our team will contact you soon.');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
    };

    return (
        <div className="flex-grow bg-background-light dark:bg-background-dark transition-colors duration-500 py-20 relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Get in <span className="text-gradient">Touch</span></h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">Have questions about our platform or need support? We're here to help.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        { icon: Mail, title: 'Email Us', details: 'support@elitehire.com', href: 'mailto:support@elitehire.com' },
                        { icon: Phone, title: 'Call Us', details: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                        { icon: MapPin, title: 'Visit Us', details: '123 Tech Lane, San Francisco, CA', href: 'https://maps.google.com/?q=San+Francisco+CA' }
                    ].map((item, i) => (
                        <motion.a
                            key={item.title}
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            className="glass-card p-8 text-center hover:shadow-glow hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary shadow-sm">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 font-medium">{item.details}</p>
                        </motion.a>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="glass-card p-8 md:p-12 max-w-3xl mx-auto border-t-[3px] border-t-primary/50">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Send us a message</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                                    className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none transition-all dark:text-white shadow-sm"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="lastName">Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                                    className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none transition-all dark:text-white shadow-sm"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none transition-all dark:text-white shadow-sm"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                                className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/50 outline-none transition-all dark:text-white resize-none shadow-sm"
                                placeholder="How can we help you today?"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-primary to-purple-600 hover:tracking-wide text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-glow hover:scale-[1.02]">
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
