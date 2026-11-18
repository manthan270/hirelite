import { LucideIcon, ArrowRight } from "lucide-react";

interface CategoryCardProps {
    name: string;
    description: string;
    jobCount: string;
    Icon: LucideIcon;
    colorClass: string;
}

export function CategoryCard({ name, description, jobCount, Icon, colorClass }: CategoryCardProps) {
    return (
        <div className="group bg-white dark:bg-white/[0.04] p-6 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] hover:border-black/[0.08] dark:hover:border-white/[0.1] hover:shadow-xl hover:shadow-slate-100/50 dark:hover:shadow-none transition-all duration-300 cursor-pointer">
            <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-[#1A211D] dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-[#55A697] transition-colors">{name}</h3>
            <p className="text-[#6B6B73] dark:text-[#8A8A90] text-sm mb-6">{description}</p>

            <div className="flex items-center justify-between">
                <span className="text-[#6B6B73] dark:text-[#8A8A90] text-sm font-medium bg-[#F1EFE6] dark:bg-white/[0.06] px-2 py-1 rounded-md group-hover:bg-primary/5 dark:group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:text-[#55A697] transition-colors">{jobCount} jobs</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F1EFE6] dark:bg-white/[0.06] text-[#6B6B73] dark:text-[#8A8A90] group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
