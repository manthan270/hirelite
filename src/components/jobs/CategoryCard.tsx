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
        <div className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300 cursor-pointer">
            <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{name}</h3>
            <p className="text-slate-500 text-sm mb-6">{description}</p>

            <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm font-medium bg-slate-50 px-2 py-1 rounded-md group-hover:bg-primary/5 group-hover:text-primary transition-colors">{jobCount} jobs</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
