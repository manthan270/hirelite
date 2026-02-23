import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, DollarSign, MapPin, Building2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const MARKET_DATA = [
    { id: 1, role: 'Senior Software Engineer', location: 'San Francisco, CA', avg: 182500, min: 150000, max: 220000, hue: 'indigo' },
    { id: 2, role: 'Product Designer', location: 'Remote (US)', avg: 145000, min: 110000, max: 175000, hue: 'purple' },
    { id: 3, role: 'Product Manager', location: 'New York, NY', avg: 160000, min: 130000, max: 200000, hue: 'emerald' },
    { id: 4, role: 'Data Scientist', location: 'Seattle, WA', avg: 155000, min: 125000, max: 190000, hue: 'blue' },
    { id: 5, role: 'DevOps Engineer', location: 'Austin, TX', avg: 140000, min: 115000, max: 165000, hue: 'amber' },
    { id: 6, role: 'Frontend Developer', location: 'Chicago, IL', avg: 125000, min: 95000, max: 150000, hue: 'rose' },
];

export default function SalaryInsights() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = MARKET_DATA.filter(item =>
        item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header Content */}
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-semibold shadow-sm"
                    >
                        <TrendingUp className="w-4 h-4" /> Live Market Data
                    </motion.div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Tech Industry Salary Insights</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Real-time compensation data aggregated from verified offers to help you benchmark your worth and negotiate better.
                    </p>

                    <div className="max-w-2xl mx-auto relative pt-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 mt-2" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by role or location (e.g., Data Scientist)"
                            className="w-full pl-12 pr-32 py-4 bg-white border border-slate-200 shadow-sm rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <Button className="absolute right-2 top-1/2 -translate-y-1/2 mt-2 px-6">Explore</Button>
                    </div>
                </div>

                {/* Global Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4"><Briefcase className="w-6 h-6" /></div>
                        <p className="text-3xl font-black text-slate-900">145k+</p>
                        <p className="text-sm font-medium text-slate-500 mt-1">Verified Offers Analyzed</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4"><DollarSign className="w-6 h-6" /></div>
                        <p className="text-3xl font-black text-slate-900">$152k</p>
                        <p className="text-sm font-medium text-slate-500 mt-1">Average Tech Salary (US)</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4"><Building2 className="w-6 h-6" /></div>
                        <p className="text-3xl font-black text-slate-900">4,200</p>
                        <p className="text-sm font-medium text-slate-500 mt-1">Companies Tracked</p>
                    </div>
                </div>

                {/* Data Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((data, index) => {
                        const percentage = ((data.avg - data.min) / (data.max - data.min)) * 100;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={data.id}
                                className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col hover:shadow-md transition-shadow group cursor-default relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-${data.hue}-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                                <h3 className="font-bold text-slate-900 text-xl mb-2 relative z-10">{data.role}</h3>
                                <p className="text-sm font-medium text-slate-500 mb-8 flex items-center gap-1.5 relative z-10">
                                    <MapPin className="w-4 h-4" /> {data.location}
                                </p>

                                <div className="mt-auto relative z-10">
                                    <div className={`text-4xl font-black text-${data.hue}-600 mb-3 tracking-tight`}>
                                        {formatCurrency(data.avg)} <span className="text-sm font-semibold text-slate-400">/yr</span>
                                    </div>

                                    {/* Progress Bar visualization */}
                                    <div className="relative mb-3 pt-2">
                                        <div className="w-full bg-slate-100/80 rounded-full h-3">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                                                className={`bg-gradient-to-r from-${data.hue}-400 to-${data.hue}-600 rounded-full h-3 shadow-sm`}
                                            ></motion.div>
                                        </div>
                                        {/* Average Marker */}
                                        <div className="absolute top-0 -ml-1 text-[10px] font-bold text-slate-400 flex flex-col items-center" style={{ left: `${percentage}%` }}>
                                            <span className="mb-0.5">AVG</span>
                                            <div className="w-0.5 h-4 bg-slate-400 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        <span>{formatCurrency(data.min)}</span>
                                        <span>{formatCurrency(data.max)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-20">
                        <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900">No matching roles found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your search terms</p>
                    </div>
                )}
            </div>
        </div>
    );
}
