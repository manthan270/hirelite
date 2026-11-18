import {
    Code2, Palette, TrendingUp,
    Diamond, Zap, Rocket, Leaf,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// types for home page data
export interface CategoryItem {
    icon: LucideIcon;
    label: string;
    sub: string;
    count: string;
    iconColor: string;
    hoverBg: string;
    arrowHover: string;
    link: string;
}

export interface FeaturedJobItem {
    id: string;
    initial: string;
    bg: string;
    badge: string | null;
    badgeColor: string;
    title: string;
    company: string;
    salary: string;
    type: string;
    location: string;
    employees: string;
    link: string;
}

export interface TrustedCompany {
    icon: LucideIcon;
    label: string;
    color: string;
}

// home page section data
export const CATEGORIES: CategoryItem[] = [
    { icon: Code2, label: 'Development', sub: 'Software engineering and web', count: '3 sample roles', iconColor: 'text-primary dark:text-[#8BC6B9]', hoverBg: 'group-hover:bg-primary', arrowHover: 'group-hover:text-primary dark:group-hover:text-[#8BC6B9] group-hover:bg-primary/10', link: '/jobs?q=Developer,Engineer' },
    { icon: Palette, label: 'Design', sub: 'UX and product design', count: '1 sample role', iconColor: 'text-primary dark:text-[#8BC6B9]', hoverBg: 'group-hover:bg-primary', arrowHover: 'group-hover:text-primary dark:group-hover:text-[#8BC6B9] group-hover:bg-primary/10', link: '/jobs?q=Designer' },
    { icon: TrendingUp, label: 'Product', sub: 'Strategy and product management', count: '2 sample roles', iconColor: 'text-primary dark:text-[#8BC6B9]', hoverBg: 'group-hover:bg-primary', arrowHover: 'group-hover:text-primary dark:group-hover:text-[#8BC6B9] group-hover:bg-primary/10', link: '/jobs?q=Product' },
    { icon: Zap, label: 'Data & AI', sub: 'Data science and analytics', count: '1 sample role', iconColor: 'text-primary dark:text-[#8BC6B9]', hoverBg: 'group-hover:bg-primary', arrowHover: 'group-hover:text-primary dark:group-hover:text-[#8BC6B9] group-hover:bg-primary/10', link: '/jobs?q=Data' },
];

export const FEATURED_JOBS: FeaturedJobItem[] = [
    { id: 'techcorp-frontend', initial: 'T', bg: 'bg-[#1A211D] dark:bg-white/[0.06]', badge: 'Sample', badgeColor: 'bg-primary/5 text-primary border-primary/20 dark:bg-primary/10 dark:text-[#55A697] dark:border-primary/20', title: 'Senior Frontend Developer', company: 'TechCorp Global', salary: '₹18L - ₹25L', type: 'Full-time', location: 'Bangalore', employees: 'Demo data', link: '/jobs/techcorp-frontend' },
    { id: 'saas-product', initial: 'S', bg: 'bg-blue-600', badge: 'Sample', badgeColor: 'bg-primary/5 text-primary border-primary/20 dark:bg-primary/10 dark:text-[#55A697] dark:border-primary/20', title: 'Product Strategy Lead', company: 'SaaS Solutions', salary: '₹22L - ₹30L', type: 'Permanent', location: 'Remote (India)', employees: 'Demo data', link: '/jobs/saas-product' },
    { id: 'fintech-backend', initial: 'F', bg: 'bg-red-500', badge: 'Sample', badgeColor: 'bg-primary/5 text-primary border-primary/20 dark:bg-primary/10 dark:text-[#55A697] dark:border-primary/20', title: 'Backend Engineer (Go/Rust)', company: 'FinTech Innovations', salary: '₹25L - ₹35L', type: 'Full-time', location: 'Mumbai', employees: 'Demo data', link: '/jobs/fintech-backend' },
];

export const TRUSTED_COMPANIES: TrustedCompany[] = [
    { icon: Diamond, label: 'Acme Corp', color: 'text-primary dark:text-[#8BC6B9]' },
    { icon: Zap, label: 'EnergyInc', color: 'text-primary dark:text-[#8BC6B9]' },
    { icon: Code2, label: 'DevSpace', color: 'text-primary dark:text-[#8BC6B9]' },
    { icon: Rocket, label: 'RocketLab', color: 'text-primary dark:text-[#8BC6B9]' },
    { icon: Leaf, label: 'GreenTech', color: 'text-primary dark:text-[#8BC6B9]' },
];

// messages inbox
export interface InboxItem {
    id: number;
    name: string;
    role: string;
    time: string;
    preview: string;
    unread: number;
    avatar: string;
}

export const INBOX: InboxItem[] = [
    { id: 1, name: 'Sarah Jenkins', role: 'Recruiter @ TechCorp', time: '10:42 AM', preview: 'Looking forward to the interview...', unread: 2, avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', role: 'Talent Lead @ Netflix', time: 'Yesterday', preview: 'Thanks for applying. We will review...', unread: 0, avatar: 'MC' },
    { id: 3, name: 'Emily Davis', role: 'Hiring Manager @ Stripe', time: 'Mon', preview: 'Could you share some recent work?', unread: 0, avatar: 'ED' },
];

// jobs page config
export const JOB_TYPES = ['Full-time', 'Internship', 'Contract', 'Permanent'] as const;
export const EXPERIENCE_LEVELS = ['Entry level', 'Intermediate', 'Expert'] as const;
export const SALARY_RANGES = ['Under ₹15L', '₹15L to ₹25L', '₹25L+'] as const;
export const SORT_OPTIONS = ['Featured', 'Role A–Z', 'Highest Salary'] as const;
export const PAGE_SIZE = 4;

export function parseSalaryRange(salary: string): { min: number; max: number } {
    const values = salary.match(/\d+/g)?.map(Number) ?? [];
    if (values.length === 0) return { min: 0, max: 0 };
    if (values.length === 1) return { min: values[0], max: values[0] };
    return { min: Math.min(...values), max: Math.max(...values) };
}

export function formatSalary(salary: string): string {
    return salary.replace(/\bINR\s*/gi, '₹').replace(/\s*-\s*/g, ' – ');
}
