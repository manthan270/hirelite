import {
    Code2, Palette, TrendingUp, Headphones,
    Diamond, Zap, Rocket, Leaf, Globe, MapPin,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────── */
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

export interface PreviewJobItem {
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    accent: string;
    title: string;
    badge: string;
    badgeBg: string;
    company: string;
    salary: string;
    exp: string;
    mode: string;
    modeIcon: LucideIcon;
    time: string;
    link: string;
}

export interface TrustedCompany {
    icon: LucideIcon;
    label: string;
    color: string;
}

/* ─── Home Page Data ─────────────────────────────────────────────── */
export const CATEGORIES: CategoryItem[] = [
    { icon: Code2, label: 'Development', sub: 'Software, Data, AI', count: '1,204 jobs', iconColor: 'text-blue-600', hoverBg: 'group-hover:bg-blue-600', arrowHover: 'group-hover:text-blue-600 group-hover:bg-blue-600/10', link: '/jobs?q=Development' },
    { icon: Palette, label: 'Design', sub: 'UI/UX, Graphic, Brand', count: '842 jobs', iconColor: 'text-orange-600', hoverBg: 'group-hover:bg-orange-600', arrowHover: 'group-hover:text-orange-600 group-hover:bg-orange-600/10', link: '/jobs?q=Design' },
    { icon: TrendingUp, label: 'Sales & Marketing', sub: 'Account Exec, SEO', count: '2,100 jobs', iconColor: 'text-emerald-600', hoverBg: 'group-hover:bg-emerald-600', arrowHover: 'group-hover:text-emerald-600 group-hover:bg-emerald-600/10', link: '/jobs?q=Marketing' },
    { icon: Headphones, label: 'Customer Success', sub: 'Support, Success, Ops', count: '540 jobs', iconColor: 'text-purple-600', hoverBg: 'group-hover:bg-purple-600', arrowHover: 'group-hover:text-purple-600 group-hover:bg-purple-600/10', link: '/jobs?q=Customer%20Success' },
];

export const FEATURED_JOBS: FeaturedJobItem[] = [
    { id: 'featured-uber', initial: 'U', bg: 'bg-slate-900 dark:bg-slate-800', badge: 'New', badgeColor: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/15 dark:text-green-400 dark:border-green-500/20', title: 'Staff Software Engineer', company: 'Uber | Bangalore, KA', salary: '₹35L - ₹50L', type: 'Full-time', location: 'On-site', employees: '500+ employees', link: '/jobs/techcorp-frontend' },
    { id: 'featured-airbnb', initial: 'A', bg: 'bg-blue-600', badge: 'Hot', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/15 dark:text-purple-400 dark:border-purple-500/20', title: 'Lead Product Designer', company: 'Airbnb | Remote (India)', salary: '₹30L - ₹40L', type: 'Full-time', location: 'Remote', employees: '1k+ employees', link: '/jobs/edtech-ux' },
    { id: 'featured-netflix', initial: 'N', bg: 'bg-red-500', badge: null, badgeColor: '', title: 'Backend Engineer', company: 'Netflix | Hyderabad, TS', salary: '₹40L+', type: 'Full-time', location: 'Hybrid', employees: '5k+ employees', link: '/jobs/fintech-backend' },
];

export const PREVIEW_JOBS: PreviewJobItem[] = [
    { icon: Code2, iconBg: 'bg-indigo-50 dark:bg-indigo-500/10', iconColor: 'text-indigo-600 dark:text-indigo-400', accent: 'border-l-indigo-500', title: 'Senior React Developer', badge: 'TF', badgeBg: 'bg-indigo-600', company: 'TechFlow Inc.', salary: '₹18L - ₹25K', exp: '3-5 Years', mode: 'Remote India', modeIcon: Globe, time: 'Posted 1h ago', link: '/jobs/techcorp-frontend' },
    { icon: Palette, iconBg: 'bg-orange-50 dark:bg-orange-500/10', iconColor: 'text-orange-600 dark:text-orange-400', accent: 'border-l-orange-500', title: 'Product Designer', badge: 'CS', badgeBg: 'bg-orange-600', company: 'Creative Solutions', salary: '₹12L - ₹18L', exp: '2-4 Years', mode: 'Mumbai, MH', modeIcon: MapPin, time: 'Posted 3h ago', link: '/jobs/edtech-ux' },
    { icon: TrendingUp, iconBg: 'bg-emerald-50 dark:bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400', accent: 'border-l-emerald-500', title: 'Data Scientist', badge: 'DC', badgeBg: 'bg-emerald-600', company: 'DataCorp', salary: '₹25L - ₹35L', exp: '4+ Years', mode: 'Hybrid', modeIcon: Globe, time: 'Posted 5h ago', link: '/jobs/health-data' },
];

export const TRUSTED_COMPANIES: TrustedCompany[] = [
    { icon: Diamond, label: 'Acme Corp', color: 'text-blue-600 dark:text-blue-400' },
    { icon: Zap, label: 'EnergyInc', color: 'text-green-600 dark:text-green-400' },
    { icon: Code2, label: 'DevSpace', color: 'text-purple-600 dark:text-purple-400' },
    { icon: Rocket, label: 'RocketLab', color: 'text-red-500 dark:text-red-400' },
    { icon: Leaf, label: 'GreenTech', color: 'text-emerald-600 dark:text-emerald-400' },
];

/* ─── Messages Data ──────────────────────────────────────────────── */
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

/* ─── Jobs Page Helpers ──────────────────────────────────────────── */
export const JOB_TYPES = ['Full-time', 'Internship', 'Freelance', 'Volunteer'] as const;
export const EXPERIENCE_LEVELS = ['Entry level', 'Intermediate', 'Expert'] as const;
export const SALARY_RANGES = ['Under ₹15L', '₹15L to ₹25L', '₹25L+', 'Contract'] as const;
export const SORT_OPTIONS = ['Most Relevant', 'Newest First', 'Highest Salary', 'Match Score'] as const;
export const PAGE_SIZE = 4;

export function parseSalaryRange(salary: string): { min: number; max: number } {
    const values = salary.match(/\d+/g)?.map(Number) ?? [];
    if (values.length === 0) return { min: 0, max: 0 };
    if (values.length === 1) return { min: values[0], max: values[0] };
    return { min: Math.min(...values), max: Math.max(...values) };
}

export function getMatchScore(seed: string): number {
    return 80 + (seed.length % 20);
}
