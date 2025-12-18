import React, { useState, useMemo } from 'react';

interface Campaign {
    id: string;
    brand: string;
    name: string;
    region: string;
    owner: string;
    month: string;
    status: 'Active' | 'Completed' | 'Pending' | 'Paused';
    category: string;
    screens: number;
}

const REGIONS = ["North", "South", "East", "West", "Central"];
const OWNERS = ["Arjun Mehta", "Priya Sharma", "Vikram Singh", "Sarah Khan"];
const CATEGORIES = ["FMCG", "Auto", "Tech", "Retail", "Entertainment"];
const STATUSES = ["Active", "Completed", "Pending", "Paused"];

const DUMMY_CAMPAIGNS: Campaign[] = Array.from({ length: 25 }).map((_, i) => ({
    id: `CP-25-${300 + i}`,
    brand: ["Nike", "Coca Cola", "Tesla", "Apple", "Samsung", "H&M"][Math.floor(Math.random() * 6)],
    name: ["Mega Sale", "Product Launch", "Brand Awareness", "Winter Blitz", "Summer Cool"][Math.floor(Math.random() * 5)],
    region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
    owner: OWNERS[Math.floor(Math.random() * OWNERS.length)],
    month: "October 2025",
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)] as any,
    category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
    screens: Math.floor(Math.random() * 100) + 10
}));

const Campaigns = () => {
    const [search, setSearch] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleFilter = (current: string[], value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    };

    const filteredCampaigns = useMemo(() => {
        return DUMMY_CAMPAIGNS.filter(c => {
            const matchesSearch = c.brand.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(c.status);
            const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(c.region);
            const matchesOwner = selectedOwners.length === 0 || selectedOwners.includes(c.owner);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(c.category);
            return matchesSearch && matchesStatus && matchesRegion && matchesOwner && matchesCategory;
        });
    }, [search, selectedStatuses, selectedRegions, selectedOwners, selectedCategories]);

    const chipStyle = "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5";

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <header className="px-8 py-6 bg-white dark:bg-[#1a2234] border-b border-border-light dark:border-slate-800 flex flex-col gap-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Campaign Monitoring</h1>
                        <p className="text-sm text-slate-500 mt-1">Real-time visibility into live campaign execution and compliance.</p>
                    </div>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Brand..." className="pl-10 pr-4 h-11 w-64 rounded-xl border-none bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary"/>
                    </div>
                </div>

                {/* Multi-Select Filters (Consistent Styling) */}
                <div className="flex flex-wrap items-start gap-x-12 gap-y-4 border-t border-slate-50 dark:border-slate-800 pt-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status (Multi)</span>
                        <div className="flex gap-1.5">
                            {STATUSES.map(s => (
                                <button key={s} onClick={() => toggleFilter(selectedStatuses, s, setSelectedStatuses)} className={`${chipStyle} ${selectedStatuses.includes(s) ? 'bg-primary text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}>
                                    {s} {selectedStatuses.includes(s) && '×'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Region (Multi)</span>
                        <div className="flex gap-1.5">
                            {REGIONS.map(r => (
                                <button key={r} onClick={() => toggleFilter(selectedRegions, r, setSelectedRegions)} className={`${chipStyle} ${selectedRegions.includes(r) ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}>
                                    {r} {selectedRegions.includes(r) && '×'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Category (Multi)</span>
                        <div className="flex gap-1.5 flex-wrap max-w-xs">
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => toggleFilter(selectedCategories, cat, setSelectedCategories)} className={`${chipStyle} ${selectedCategories.includes(cat) ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}>
                                    {cat} {selectedCategories.includes(cat) && '×'}
                                </button>
                            ))}
                        </div>
                    </div>
                    {(selectedStatuses.length > 0 || selectedRegions.length > 0 || selectedCategories.length > 0) && (
                        <button onClick={() => { setSelectedStatuses([]); setSelectedRegions([]); setSelectedCategories([]); }} className="self-end mb-1 text-[10px] font-black text-red-500 hover:underline">RESET</button>
                    )}
                </div>
            </header>

            <div className="p-8 flex-1 overflow-hidden flex flex-col bg-slate-50 dark:bg-background-dark">
                <div className="bg-white dark:bg-surface-dark rounded-3xl border border-border-light dark:border-slate-800 flex-1 overflow-hidden shadow-sm flex flex-col">
                    <div className="overflow-y-auto flex-1 custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 bg-white dark:bg-[#1a2234] z-10 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800">
                                <tr>
                                    <th className="px-8 py-5">Campaign Identity</th>
                                    <th className="px-8 py-5">Brand</th>
                                    <th className="px-8 py-5">Regional Assignment</th>
                                    <th className="px-8 py-5">Account Owner</th>
                                    <th className="px-8 py-5 text-right">Inventory Size</th>
                                    <th className="px-8 py-5 text-right">Execution Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light dark:divide-slate-800">
                                {filteredCampaigns.map(c => (
                                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group animate-[fadeIn_0.2s]">
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{c.name}</span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{c.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-slate-600 dark:text-slate-400">{c.brand}</td>
                                        <td className="px-8 py-5 text-xs font-black text-slate-500 uppercase">{c.region}</td>
                                        <td className="px-8 py-5 text-xs font-bold text-slate-500">{c.owner}</td>
                                        <td className="px-8 py-5 text-right font-black text-primary text-sm">{c.screens} Screens</td>
                                        <td className="px-8 py-5 text-right">
                                            <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                                                c.status === 'Active' ? 'bg-green-50 text-green-700' : 
                                                c.status === 'Completed' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 dark:bg-slate-800 text-slate-500'
                                            }`}>{c.status}</span>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCampaigns.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center">
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No matching campaigns active</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Campaigns;