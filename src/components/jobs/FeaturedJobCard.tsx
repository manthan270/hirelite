import { useState } from "react";
import { Job } from "@/types/job";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock, Users, Bookmark } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useApplicationStore } from "@/store/useApplicationStore";
import toast from "react-hot-toast";

interface FeaturedJobCardProps {
    job: Job;
}

export function FeaturedJobCard({ job }: FeaturedJobCardProps) {
    const { user } = useAuthStore();
    const { apply, hasApplied } = useApplicationStore();
    const [saved, setSaved] = useState(false);

    const isCandidate = user?.role === 'candidate';
    const applied = isCandidate && user ? hasApplied(job.id, user.name) : false;

    const handleApply = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user && isCandidate) {
            apply(job.id, user.name);
            toast.success("Application submitted successfully!");
        } else if (!user) {
            toast.error("Please login to apply");
        }
    };

    const getLogoColor = (company: string) => {
        const colors = [
            'bg-blue-600', 'bg-purple-600', 'bg-emerald-600', 'bg-orange-600', 'bg-pink-600', 'bg-slate-900'
        ];
        return colors[company.length % colors.length];
    };

    const handleSaveToggle = () => {
        setSaved((prev) => !prev);
        toast.success(saved ? "Removed from saved jobs." : "Job saved successfully.");
    };

    return (
        <Card className="hover:shadow-lg transition-all duration-300 border-slate-100 group bg-white overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-xl ${getLogoColor(job.company)} flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/5`}>
                        {job.company.charAt(0)}
                    </div>
                    {job.type === 'Full-time' && (
                        <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 px-3 py-1">New</Badge>
                    )}
                    {job.type === 'Remote' && (
                        <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 px-3 py-1">Hot</Badge>
                    )}
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="text-slate-500 font-medium mb-4 flex items-center gap-2">
                        {job.company}
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-slate-400 font-normal">{job.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center text-slate-500 text-sm bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <WalletIcon className="w-4 h-4 mr-2 text-slate-400" />
                            {job.salary}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <Clock className="w-4 h-4 mr-2 text-slate-400" />
                            {job.type}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <Users className="w-4 h-4 mr-2 text-slate-400" />
                            100+ employees
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button
                        onClick={handleApply}
                        disabled={applied}
                        className={`flex-1 font-semibold h-11 ${applied ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'}`}
                    >
                        {applied ? "Applied" : "Apply Now"}
                    </Button>
                    <Button type="button" onClick={handleSaveToggle} variant="outline" size="icon" className={`h-11 w-11 border-slate-200 ${saved ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}>
                        <Bookmark className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}

function WalletIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
    )
}
