import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, Lightbulb, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ResumeAnalyzer() {
    const [isHovering, setIsHovering] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<{ score: number; feedback: { type: 'success' | 'warning' | 'info'; text: string }[] } | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovering(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            simulateAnalysis(file.name);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            simulateAnalysis(file.name);
        }
    };

    const simulateAnalysis = (name: string) => {
        setFileName(name);
        setIsAnalyzing(true);
        setResults(null);

        // Generate pseudo-random score based on filename
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const score = 65 + (hash % 31); // 65 to 95

        const possibleFeedback: { type: 'success' | 'warning' | 'info'; text: string }[] = [
            { type: 'success', text: "Strong action verbs detected in experience section." },
            { type: 'success', text: "Education section is well-formatted for ATS systems." },
            { type: 'success', text: "Clear progression of responsibilities shown." },
            { type: 'success', text: "Contact information is easily readable." },
            { type: 'warning', text: "Missing quantifiable metrics (e.g., 'increased sales by X%')." },
            { type: 'warning', text: "Some bullet points are too long and may lose reader attention." },
            { type: 'warning', text: "Formatting might cause parsing issues in older ATS." },
            { type: 'info', text: "Consider expanding on leadership experience to improve match rate." },
            { type: 'info', text: "Adding a brief professional summary could boost your profile." },
            { type: 'info', text: "Keywords match typical industry job descriptions." }
        ];

        // Pick 4 pseudo-random feedback items
        const selectedFeedback: { type: 'success' | 'warning' | 'info'; text: string }[] = [];
        for (let i = 0; i < 4; i++) {
            selectedFeedback.push(possibleFeedback[(hash + i * 7) % possibleFeedback.length]);
        }

        // Simulate API call processing
        setTimeout(() => {
            setIsAnalyzing(false);
            setResults({
                score,
                feedback: selectedFeedback
            });
        }, 2500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Content */}
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto shadow-sm"
                >
                    <Sparkles className="w-8 h-8" />
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Resume Analyzer</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Upload your resume to see how it performs against enterprise Applicant Tracking Systems. Get instant feedback to improve your match rate.
                </p>
            </div>

            {/* Upload Zone */}
            {!results && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative group border-2 border-dashed rounded-3xl p-12 transition-all duration-300 bg-white dark:bg-slate-900/50
              ${isHovering ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                    onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
                    onDragLeave={() => setIsHovering(false)}
                    onDrop={handleDrop}
                >
                    <div className="text-center">
                        {isAnalyzing ? (
                            <div className="space-y-6">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full mx-auto"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Parsing '{fileName || 'Document'}'...</h3>
                                    <p className="text-slate-500 dark:text-slate-400">Our AI is extracting key skills and experiences.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${isHovering ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'}`} />
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Drag & Drop your resume</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">Supports PDF, DOCX (Max 5MB)</p>
                                <Button onClick={() => document.getElementById('resume-upload')?.click()} className="px-8" variant="default">
                                    Browse Files
                                </Button>
                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={handleFileInput}
                                />
                            </>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Results Dashboard */}
            {results && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl dark:shadow-2xl dark:shadow-indigo-500/10 border border-slate-200 dark:border-slate-800 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    <div className="grid md:grid-cols-5 gap-0 items-stretch relative z-10">
                        {/* Score Section */}
                        <div className="md:col-span-2 p-10 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center space-y-6 bg-slate-50/50 dark:bg-slate-800/20">
                            <h2 className="text-xl font-medium text-slate-600 dark:text-slate-400">Overall ATS Score</h2>
                            <div className="relative">
                                <svg className="w-48 h-48 transform -rotate-90">
                                    <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="16" fill="none" className="text-slate-200 dark:text-slate-800" />
                                    <motion.circle
                                        cx="96" cy="96" r="84"
                                        stroke="url(#score-gradient)"
                                        strokeWidth="16"
                                        fill="none"
                                        strokeDasharray="527.7"
                                        initial={{ strokeDashoffset: 527.7 }}
                                        animate={{ strokeDashoffset: 527.7 - (527.7 * results.score) / 100 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        strokeLinecap="round"
                                        className="drop-shadow-lg"
                                    />
                                    <defs>
                                        <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#818cf8" />
                                            <stop offset="100%" stopColor="#c084fc" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{results.score}</span>
                                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Score</span>
                                </div>
                            </div>
                            <div className="px-5 py-2.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-sm border border-emerald-100 dark:border-emerald-500/20 shadow-sm flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Top 15% of Candidates
                            </div>
                        </div>

                        {/* Feedback Section */}
                        <div className="md:col-span-3 p-10 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    Detailed Feedback
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg">
                                    Here's a breakdown of what the AI found in <strong>{fileName || 'your resume'}</strong>. Fix the warnings to increase your score.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                {results.feedback.map((item, index) => {
                                    const config = {
                                        success: {
                                            icon: CheckCircle2,
                                            color: 'text-emerald-600 dark:text-emerald-400',
                                            bg: 'bg-emerald-50 dark:bg-emerald-900/20',
                                            border: 'border-emerald-100 dark:border-emerald-500/20'
                                        },
                                        warning: {
                                            icon: AlertCircle,
                                            color: 'text-amber-600 dark:text-amber-400',
                                            bg: 'bg-amber-50 dark:bg-amber-900/20',
                                            border: 'border-amber-100 dark:border-amber-500/20'
                                        },
                                        info: {
                                            icon: Lightbulb,
                                            color: 'text-blue-600 dark:text-blue-400',
                                            bg: 'bg-blue-50 dark:bg-blue-900/20',
                                            border: 'border-blue-100 dark:border-blue-500/20'
                                        }
                                    }[item.type];

                                    const Icon = config.icon;

                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            key={index}
                                            className={`flex items-start gap-4 p-5 rounded-2xl border ${config.bg} ${config.border} transition-all hover:scale-[1.01]`}
                                        >
                                            <Icon className={`w-6 h-6 shrink-0 mt-0.5 ${config.color}`} />
                                            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{item.text}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="pt-8 flex flex-col sm:flex-row justify-end gap-4 border-t border-slate-100 dark:border-slate-800">
                                <Button variant="outline" className="h-12 px-6 rounded-xl font-semibold" onClick={() => { setResults(null); setFileName(null); }}>Analyze Another</Button>
                                <Button
                                    variant="default"
                                    onClick={() => toast('AI Editor coming soon!', { icon: '✨' })}
                                    className="h-12 px-6 rounded-xl font-semibold group bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0"
                                >
                                    Improve with AI
                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
