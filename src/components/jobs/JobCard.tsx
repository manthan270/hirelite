import { Job } from "@/types/job";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MapPin, Wallet, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useApplicationStore } from "@/store/useApplicationStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatSalary } from "@/lib/constants";

interface JobCardProps {
    job: Job;
}

export function JobCard({ job }: JobCardProps) {
    const user = useAuthStore((state) => state.user);
    const apply = useApplicationStore((state) => state.apply);

    const isCandidate = user?.role === 'candidate';
    const isEmployer = user?.role === 'employer';

    // subscribe to derived state — needs to be reactive for the "Applied" button swap
    const applied = useApplicationStore((state) =>
        isCandidate && user ? state.applications.some(a => a.jobId === job.id && a.candidateName === user.name) : false
    );
    const applicantCount = useApplicationStore((state) =>
        state.applications.filter(app => app.jobId === job.id).length
    );

    const handleApply = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user && isCandidate) {
            apply(job.id, user.name);
            toast.success("Application submitted successfully!");
        }
    };

    return (
        <Card className="group relative overflow-hidden shadow-sm transition-colors duration-200 hover:border-primary/25 hover:shadow-md">

            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex gap-4">
                        <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07] text-lg font-bold text-primary dark:border-primary/25 dark:bg-primary/10 dark:text-[#B7DED5]">
                            {job.company.charAt(0)}
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-[#1A211D] dark:text-white group-hover:text-primary transition-colors">
                                {job.title}
                            </CardTitle>
                            <div className="flex items-center gap-1.5 mt-1 text-[#6B6B73] dark:text-[#8A8A90] font-medium text-sm">
                                {job.company}
                                {job.verified && (
                                    <span className="flex items-center text-primary text-xs bg-primary/5 dark:bg-primary/10 px-1.5 py-0.5 rounded-full ml-1">
                                        <CheckCircle className="w-3 h-3 mr-1" /> Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                        <Badge variant="secondary">{job.type}</Badge>
                        {isEmployer && applicantCount > 0 && (
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 dark:bg-primary/10">
                                {applicantCount} Applicant{applicantCount !== 1 ? 's' : ''}
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pl-0 text-sm text-[#62626B] dark:text-[#B5B5BD] sm:pl-14">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Wallet className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="whitespace-nowrap tabular-nums">{formatSalary(job.salary)}</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start justify-between gap-3 border-t border-black/[0.07] bg-[#FBFAF8] pt-3 dark:border-white/[0.09] dark:bg-white/[0.02] sm:flex-row sm:items-center">
                <div className="text-xs font-medium text-[#62626B] dark:text-[#B5B5BD]">Example listing · illustrative details</div>
                <div className="mt-1 flex w-full gap-2 sm:mt-0 sm:w-auto">
                    <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
                        <Link to={`/jobs/${job.id}`}>View role</Link>
                    </Button>
                    {isCandidate && (
                        <Button
                            size="sm"
                            onClick={handleApply}
                            disabled={applied}
                            variant={applied ? "secondary" : "default"}
                            className={applied
                                ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/20 flex-1 sm:flex-none"
                                : "bg-primary hover:bg-primary/90 shadow-sm flex-1 sm:flex-none"
                            }
                        >
                            {applied ? "Applied" : "Apply Now"}
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
