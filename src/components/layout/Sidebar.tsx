import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Briefcase, FileText, Settings, Building2, Sparkles } from 'lucide-react';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const { user } = useAuthStore();
    const location = useLocation();
    const role = user?.role;

    if (!role) return null;

    const candidateLinks = [
        { name: 'Dashboard', href: '/dashboard/candidate', icon: LayoutDashboard },
        { name: 'Resume Analyzer', href: '/dashboard/resume-analyzer', icon: Sparkles },
        { name: 'My Applications', href: '/dashboard/candidate/applications', icon: FileText },
        { name: 'Saved Jobs', href: '/dashboard/candidate/saved', icon: Briefcase },
        { name: 'Settings', href: '/dashboard/candidate/settings', icon: Settings },
    ];

    const employerLinks = [
        { name: 'Dashboard', href: '/dashboard/employer', icon: LayoutDashboard },
        { name: 'Manage Jobs', href: '/dashboard/employer/jobs', icon: Briefcase },
        { name: 'Company Profile', href: '/dashboard/employer/company', icon: Building2 },
        { name: 'Settings', href: '/dashboard/employer/settings', icon: Settings },
    ];

    const links = role === 'candidate' ? candidateLinks : employerLinks;

    return (
        <div className={cn("bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full transition-colors", className)}>
            <div className="p-6">
                <h3 className="text-xs uppercase text-slate-400 dark:text-slate-500 font-bold tracking-wider">Menu</h3>
            </div>
            <nav className="flex-1 space-y-1 px-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group",
                                isActive
                                    ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-indigo-400"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                            )}
                        >
                            <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300")} />
                            {link.name}
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}
