import { Job } from "@/types/job";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MapPin, Wallet, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useApplicationStore } from "@/store/useApplicationStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface JobCardProps {
    job: Job;
}

// ... imports remain same but ensuring visually updated
export function JobCard({ job }: JobCardProps) {
    const { user } = useAuthStore();
    const { apply, hasApplied, getJobApplications } = useApplicationStore();

    const isCandidate = user?.role === 'candidate';
    const isEmployer = user?.role === 'employer';
    const applied = isCandidate && user ? hasApplied(job.id, user.name) : false;

    // For employer view, show applicant count
    const applicantCount = getJobApplications(job.id).length;

    const handleApply = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click
        if (user && isCandidate) {
            apply(job.id, user.name);
            toast.success("Application submitted successfully!");
        }
    };

    return (
        <Card className="hover:shadow-lg hover:scale-[1.01] transition-all duration-200 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative overflow-hidden group">
            {/* Left Accent Bar */}
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex gap-4">
                        {/* Company Avatar */}
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg ring-2 ring-white dark:ring-slate-800 shadow-sm">
                            {job.company.charAt(0)}
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                                {job.title}
                            </CardTitle>
                            <div className="flex items-center gap-1.5 mt-1 text-slate-500 dark:text-slate-400 font-medium text-sm">
                                {job.company}
                                {job.verified && (
                                    <span className="flex items-center text-primary text-xs bg-primary/5 px-1.5 py-0.5 rounded-full ml-1">
                                        <CheckCircle className="w-3 h-3 mr-1" /> Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                            {job.type}
                        </Badge>
                        {isEmployer && applicantCount > 0 && (
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                                {applicantCount} Applicant{applicantCount !== 1 ? 's' : ''}
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pl-14">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5" />
                        {job.salary}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-3 border-t border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 bg-slate-50/30 dark:bg-slate-900/30">
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium w-full sm:w-auto mt-1 sm:mt-0">Posted recently</div>
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <Button asChild variant="outline" size="sm" className="hover:bg-primary/5 hover:text-primary hover:border-primary/20 bg-white dark:bg-slate-950 dark:border-slate-700 dark:text-slate-300 flex-1 sm:flex-none">
                        <Link to={`/jobs/${job.id}`}>View Details</Link>
                    </Button>
                    {isCandidate && (
                        <Button
                            size="sm"
                            onClick={handleApply}
                            disabled={applied}
                            variant={applied ? "secondary" : "default"}
                            className={applied ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 flex-1 sm:flex-none" : "bg-primary hover:bg-primary-dark shadow-sm flex-1 sm:flex-none"}
                        >
                            {applied ? "Applied" : "Apply Now"}
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
