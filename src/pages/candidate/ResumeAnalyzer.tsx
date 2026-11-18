import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, Lightbulb, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = new Set(['pdf', 'doc', 'docx']);

export default function ResumeAnalyzer() {
    const [isHovering, setIsHovering] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<{ score: number; feedback: { type: 'success' | 'warning' | 'info'; text: string }[] } | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const analysisTimeout = useRef<number | null>(null);

    useEffect(() => () => {
        if (analysisTimeout.current !== null) {
            window.clearTimeout(analysisTimeout.current);
        }
    }, []);

    const startAnalysis = (file: File) => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!extension || !ALLOWED_FILE_EXTENSIONS.has(extension)) {
            toast.error('Choose a PDF, DOC, or DOCX file.');
            return;
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            toast.error('Choose a file smaller than 5 MB.');
            return;
        }
        simulateAnalysis(file.name);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovering(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            startAnalysis(file);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            startAnalysis(file);
        }
        e.currentTarget.value = '';
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

        if (analysisTimeout.current !== null) {
            window.clearTimeout(analysisTimeout.current);
        }
        analysisTimeout.current = window.setTimeout(() => {
            setIsAnalyzing(false);
            setResults({
                score,
                feedback: selectedFeedback
            });
            analysisTimeout.current = null;
        }, 2500);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
            {/* Header Content */}
            <div className="space-y-3 text-center sm:space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-white text-primary dark:bg-white/[0.04] dark:text-[#8BC6B9]"
                >
                    <FileText className="h-5 w-5" aria-hidden="true" />
                </motion.div>
                <h1 className="text-2xl font-bold text-[#1A211D] dark:text-white sm:text-3xl">Resume Analyzer Preview</h1>
                <p className="mx-auto max-w-2xl text-base text-[#6B6B73] dark:text-[#8A8A90] sm:text-lg">
                    This preview does not upload or read your document. It generates illustrative sample feedback from the file name only.
                </p>
            </div>

            {/* Upload Zone */}
            {!results && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`group relative rounded-2xl border-2 border-dashed bg-white p-6 transition-all duration-300 dark:bg-white/[0.04] sm:rounded-3xl sm:p-10
              ${isHovering ? 'border-primary bg-primary/[0.04] dark:bg-primary/[0.08]' : 'border-black/[0.08] dark:border-white/[0.08] hover:border-primary/40 dark:hover:border-primary/50 hover:bg-[#F8F6EE] dark:hover:bg-white/[0.06]'}`}
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
                                    className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-[#1A211D] dark:text-white">Preparing sample feedback for '{fileName || 'Document'}'...</h3>
                                    <p className="text-[#6B6B73] dark:text-[#8A8A90]">No document contents are read or uploaded.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${isHovering ? 'text-primary dark:text-[#55A697]' : 'text-[#6B6B73] dark:text-[#8A8A90] group-hover:text-primary dark:group-hover:text-[#55A697]'}`} />
                                <h3 className="text-lg font-semibold text-[#1A211D] dark:text-white mb-2">Drag & Drop your resume</h3>
                                <p className="mb-6 text-sm text-[#6B6B73] dark:text-[#8A8A90]">Supports PDF, DOC, or DOCX · Max 5 MB</p>
                                <Button onClick={() => document.getElementById('resume-upload')?.click()} className="min-h-11 px-8" variant="default">
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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="surface-panel overflow-hidden"
                >
                    <div className="grid items-stretch lg:grid-cols-[minmax(200px,0.8fr)_minmax(0,2fr)]">
                        {/* Score Section */}
                        <div className="flex flex-col justify-center gap-4 border-b border-black/[0.06] bg-[#F8F7F2] p-5 dark:border-white/[0.07] dark:bg-white/[0.02] sm:p-7 lg:border-b-0 lg:border-r">
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B73] dark:text-[#A0A0A8]">Overall ATS score</p>
                                    <span className="rounded-full border border-primary/15 bg-primary/[0.05] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary dark:border-primary/25 dark:bg-primary/10 dark:text-[#8BC6B9]">Sample</span>
                                </div>
                                <div className="mt-3 flex items-baseline gap-2">
                                    <span className="text-5xl font-semibold leading-none tracking-tight tabular-nums text-[#1A211D] dark:text-white sm:text-6xl">{results.score}</span>
                                    <span className="text-sm font-medium text-[#6B6B73] dark:text-[#A0A0A8]">/ 100</span>
                                </div>
                            </div>
                            <div>
                                <div
                                    role="progressbar"
                                    aria-label="Illustrative ATS score"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={results.score}
                                    className="h-2 overflow-hidden rounded-full bg-black/[0.08] dark:bg-white/[0.1]"
                                >
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${results.score}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        className="h-full rounded-full bg-primary dark:bg-[#8BC6B9]"
                                    />
                                </div>
                                <p className="mt-3 text-sm text-[#6B6B73] dark:text-[#A0A0A8]">Generated from the file name only</p>
                            </div>
                        </div>

                        {/* Feedback Section */}
                        <div className="space-y-5 p-4 sm:p-6 lg:p-7">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F1EFE6] text-primary dark:bg-white/[0.06] dark:text-[#8BC6B9]">
                                    <FileText className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <div>
                                    <h3 className="text-xl font-semibold text-[#1A211D] dark:text-white">Detailed feedback</h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B73] dark:text-[#A0A0A8]">
                                        Sample suggestions for <strong className="font-semibold text-[#3D4942] dark:text-[#D4D8D5]">{fileName || 'your file'}</strong>. The document itself is not analyzed.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {results.feedback.map((item, index) => {
                                    const config = {
                                        success: {
                                            icon: CheckCircle2,
                                            label: 'Strength',
                                            color: 'text-emerald-700 dark:text-emerald-300',
                                            bg: 'bg-emerald-50/70 dark:bg-emerald-500/[0.08]',
                                            border: 'border-emerald-200/70 dark:border-emerald-500/20'
                                        },
                                        warning: {
                                            icon: AlertCircle,
                                            label: 'Review',
                                            color: 'text-amber-700 dark:text-amber-300',
                                            bg: 'bg-amber-50/70 dark:bg-amber-500/[0.08]',
                                            border: 'border-amber-200/70 dark:border-amber-500/20'
                                        },
                                        info: {
                                            icon: Lightbulb,
                                            label: 'Suggestion',
                                            color: 'text-primary dark:text-[#8BC6B9]',
                                            bg: 'bg-primary/[0.05] dark:bg-primary/[0.08]',
                                            border: 'border-primary/15 dark:border-primary/20'
                                        }
                                    }[item.type];

                                    const Icon = config.icon;

                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.06 }}
                                            key={index}
                                            className={`flex items-start gap-3 rounded-xl border bg-white p-3 transition-colors dark:bg-white/[0.025] sm:p-3.5 ${config.border}`}
                                        >
                                            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
                                                <Icon className={`h-4 w-4 ${config.color}`} aria-hidden="true" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${config.color}`}>{config.label}</p>
                                                <p className="mt-1 text-sm leading-relaxed text-[#3D4942] dark:text-[#D4D8D5]">{item.text}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="flex flex-col justify-end gap-3 border-t border-black/[0.06] pt-5 dark:border-white/[0.07] sm:flex-row">
                                <Button variant="outline" className="min-h-11 rounded-lg px-4 font-semibold" onClick={() => { setResults(null); setFileName(null); }}>Analyze Another</Button>
                                <Button
                                    variant="default"
                                    onClick={() => toast('AI Editor coming soon!', { icon: <FileText className="h-4 w-4 text-primary dark:text-[#8BC6B9]" aria-hidden="true" /> })}
                                    className="group min-h-11 rounded-lg px-4 font-semibold"
                                >
                                    Improve with AI
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
