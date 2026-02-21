export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;   // e.g. "₹18–25 LPA"
    type: string;
    verified?: boolean;
}
