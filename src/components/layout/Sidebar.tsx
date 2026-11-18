import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Briefcase, FileText, FileSearch, Settings, Building2 } from 'lucide-react';

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const user = useAuthStore((state) => state.user);
    const location = useLocation();
    const role = user?.role;

    if (!role) return null;

    const candidateLinks = [
        { name: 'Dashboard', href: '/dashboard/candidate', icon: LayoutDashboard },
        { name: 'Resume Analyzer', href: '/dashboard/resume-analyzer', icon: FileSearch },
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
        <div className={cn("bg-white dark:bg-[#1A211D] border-r border-black/[0.04] dark:border-white/[0.06] flex flex-col h-full transition-colors duration-500", className)}>
            <div className="p-6">
                <h3 className="text-xs uppercase text-[#6B6B73] dark:text-[#A0A0A8] font-semibold tracking-[0.08em]">Workspace</h3>
            </div>
            <nav className="flex-1 space-y-1 px-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                "flex min-h-11 items-center rounded-r-lg border-l-2 px-3 py-2 text-sm font-medium transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                isActive
                                    ? "border-primary bg-primary/[0.06] text-primary dark:bg-primary/10 dark:text-[#B7DED5]"
                                    : "border-transparent text-[#62626B] hover:bg-[#F8F6EE] hover:text-[#1A211D] dark:text-[#B5B5BD] dark:hover:bg-white/[0.05] dark:hover:text-white"
                            )}
                        >
                            <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary dark:text-[#B7DED5]" : "text-[#6B6B73] dark:text-[#A0A0A8] group-hover:text-[#1A211D] dark:group-hover:text-white")} aria-hidden="true" />
                            {link.name}
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}
