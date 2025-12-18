import React, { useState, useMemo } from 'react';

// ------------------- Types -------------------
interface Screen {
    id: number;
    name: string;
    city: string;
    grade: 'A+' | 'A' | 'B';
    seats: number;
    baseRate: number;
    status: 'Live' | 'Downtime' | 'Maintenance';
    genre: string; // MovieBuff Metadata
    catchment: string; // ESRI Intelligence
    audience: string; // ESRI Cluster
}

interface QuotationRecord {
    id: string;
    client: string;
    campaign: string;
    date: string;
    value: number;
    status: 'Draft' | 'Shared' | 'Approved' | 'Rejected';
    screens: number;
}

const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Ahmedabad", "Kolkata"];
const grades = ["A+", "A", "B"];
const genres = ["Action", "Romance", "Horror", "Comedy", "Thriller", "Drama"];
const catchments = ["Mass", "Premium", "Youth", "Family", "Corporate"];
const statuses: Array<'Live' | 'Downtime' | 'Maintenance'> = ["Live", "Live", "Live", "Live", "Downtime", "Maintenance"];

// Generate 100 screens
const ALL_SCREENS: Screen[] = Array.from({ length: 100 }).map((_, i) => ({
    id: 1000 + i,
    name: `Cinema Complex - Screen ${i + 1}`,
    city: cities[Math.floor(Math.random() * cities.length)],
    grade: i % 10 === 0 ? "A+" : i % 3 === 0 ? "A" : "B",
    seats: Math.floor(Math.random() * 250) + 120,
    baseRate: (Math.floor(Math.random() * 12) + 6) * 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    genre: genres[Math.floor(Math.random() * genres.length)],
    catchment: catchments[Math.floor(Math.random() * catchments.length)],
    audience: i % 2 === 0 ? "Urban High Income" : "General Family"
}));

// Generate 25 quotations
const QUOTATION_LOG: QuotationRecord[] = Array.from({ length: 25 }).map((_, i) => ({
    id: `QT-25-${200 + i}`,
    client: ["PepsiCo", "Velocity Motors", "Fizz Co.", "InnoSys", "Star Studios"][Math.floor(Math.random() * 5)],
    campaign: ["Summer Splash", "Festive Blitz", "New Launch", "Corporate Event"][Math.floor(Math.random() * 4)],
    date: `2025-10-${Math.floor(Math.random() * 20) + 1}`,
    value: (Math.floor(Math.random() * 50) + 10) * 10000,
    status: ["Draft", "Shared", "Approved", "Rejected"][Math.floor(Math.random() * 4)] as any,
    screens: Math.floor(Math.random() * 15) + 3
}));

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

const Quotation = () => {
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    
    // Filters State (Updated for Multi-Select)
    const [search, setSearch] = useState("");
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterSeats, setFilterSeats] = useState(0);

    const toggleMultiFilter = (current: string[], value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    };

    const filteredScreens = useMemo(() => {
        return ALL_SCREENS.filter(s => {
            return (selectedCities.length === 0 || selectedCities.includes(s.city)) &&
                   (selectedGrades.length === 0 || selectedGrades.includes(s.grade)) &&
                   (selectedGenres.length === 0 || selectedGenres.includes(s.genre)) &&
                   (filterStatus === "All" || s.status === filterStatus) &&
                   (s.seats >= filterSeats) &&
                   (s.name.toLowerCase().includes(search.toLowerCase()));
        });
    }, [search, selectedCities, selectedGrades, selectedGenres, filterStatus, filterSeats]);

    const handleAddFiltered = () => {
        alert(`Adding ${filteredScreens.length} screens to the current quotation draft.`);
        setIsInventoryOpen(false);
    };

    const labelStyle = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3";
    const chipStyle = "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1";

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <header className="px-8 py-6 bg-white dark:bg-[#1a2234] border-b border-border-light flex justify-between items-center flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Quotation Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Proposal history and intelligent screen inventory browsing.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={() => setIsInventoryOpen(true)} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                        <span className="material-symbols-outlined">view_module</span> Browse Inventory
                    </button>
                    <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">+ New Quotation</button>
                </div>
            </header>

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="bg-white dark:bg-[#1a2234] rounded-3xl border border-border-light shadow-sm overflow-hidden">
                    <div className="px-8 py-5 border-b border-border-light bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Recent Quotations</h3>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{QUOTATION_LOG.length} Records found</span>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
                            <tr>
                                <th className="px-8 py-4">Quote ID</th>
                                <th className="px-8 py-4">Client & Campaign</th>
                                <th className="px-8 py-4">Screens</th>
                                <th className="px-8 py-4 text-right">Value</th>
                                <th className="px-8 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light dark:divide-slate-800">
                            {QUOTATION_LOG.map(q => (
                                <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group animate-[fadeIn_0.2s]">
                                    <td className="px-8 py-5 font-mono text-xs text-primary font-bold">{q.id}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{q.client}</span>
                                            <span className="text-[11px] text-slate-400 font-medium">{q.campaign}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-500">{q.screens}</td>
                                    <td className="px-8 py-5 text-right font-black text-slate-900 dark:text-white">{formatCurrency(q.value)}</td>
                                    <td className="px-8 py-5">
                                        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                                            q.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                                            q.status === 'Shared' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                                        }`}>{q.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Inventory Full-Screen Drawer / Modal */}
            {isInventoryOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md overflow-hidden">
                    <div className="bg-background-light dark:bg-background-dark w-full max-w-7xl h-full max-h-[95vh] rounded-[3rem] shadow-2xl flex overflow-hidden border border-border-light dark:border-slate-800 animate-[fadeIn_0.3s]">
                        
                        {/* Multi-Select Filters Sidebar */}
                        <aside className="w-80 bg-white dark:bg-[#1a2234] border-r border-border-light dark:border-slate-800 p-8 flex flex-col gap-8 overflow-y-auto">
                            <div>
                                <h3 className="text-xl font-black mb-1">Explore Inventory</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Multi-Select Active</p>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <label className={labelStyle}>Cities (Multi)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {cities.map(c => (
                                            <button key={c} onClick={() => toggleMultiFilter(selectedCities, c, setSelectedCities)} className={`${chipStyle} ${selectedCities.includes(c) ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                                {c} {selectedCities.includes(c) && '×'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className={labelStyle}>Screen Grade</label>
                                    <div className="flex flex-wrap gap-2">
                                        {grades.map(g => (
                                            <button key={g} onClick={() => toggleMultiFilter(selectedGrades, g, setSelectedGrades)} className={`${chipStyle} ${selectedGrades.includes(g) ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                                {g} {selectedGrades.includes(g) && '×'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className={labelStyle}>Genre Focus (Multi)</label>
                                    <div className="flex flex-wrap gap-2">
                                        {genres.map(g => (
                                            <button key={g} onClick={() => toggleMultiFilter(selectedGenres, g, setSelectedGenres)} className={`${chipStyle} ${selectedGenres.includes(g) ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                                {g} {selectedGenres.includes(g) && '×'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className={labelStyle}>Min Seats: {filterSeats}</label>
                                    <input type="range" min="0" max="400" value={filterSeats} onChange={e => setFilterSeats(Number(e.target.value))} className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" />
                                </div>
                            </div>

                            <button onClick={() => {setSelectedCities([]); setSelectedGrades([]); setSelectedGenres([]); setFilterStatus("All"); setFilterSeats(0);}} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline mt-auto">Clear Filters</button>
                        </aside>

                        <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark min-w-0">
                            <header className="px-8 py-6 bg-white dark:bg-[#1a2234] border-b border-border-light flex justify-between items-center gap-6">
                                <div className="relative flex-1 max-w-xl">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search screens, theaters, clusters..." className="w-full pl-12 pr-4 h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary transition-all"/>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredScreens.length} Results</span>
                                    <button onClick={handleAddFiltered} className="bg-primary text-white px-6 py-2.5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Add to Draft</button>
                                    <button onClick={() => setIsInventoryOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400"><span className="material-symbols-outlined text-[24px]">close</span></button>
                                </div>
                            </header>

                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredScreens.map(screen => (
                                        <div key={screen.id} className="bg-white dark:bg-[#1a2234] rounded-3xl border border-border-light dark:border-slate-800 p-6 flex flex-col hover:shadow-2xl hover:border-primary/40 transition-all cursor-pointer group animate-[fadeIn_0.3s]">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-black text-lg leading-tight group-hover:text-primary transition-colors">{screen.name}</h4>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="material-symbols-outlined text-[16px] text-slate-400">location_on</span>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{screen.city}</span>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider ${screen.grade === 'A+' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>Grade {screen.grade}</span>
                                            </div>

                                            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 mb-6 space-y-3">
                                                <div className="flex justify-between text-[10px] font-black">
                                                    <span className="text-slate-400 uppercase tracking-widest">Audience</span>
                                                    <span className="text-slate-600 dark:text-slate-300">{screen.audience}</span>
                                                </div>
                                                <div className="flex justify-between text-[10px] font-black">
                                                    <span className="text-slate-400 uppercase tracking-widest">Genre</span>
                                                    <span className="text-indigo-600 uppercase">{screen.genre}</span>
                                                </div>
                                                <div className="flex justify-between text-[10px] font-black">
                                                    <span className="text-slate-400 uppercase tracking-widest">Capacity</span>
                                                    <span className="text-slate-900 dark:text-white uppercase">{screen.seats} Seats</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Weekly Rate</p>
                                                    <p className="text-xl font-black">{formatCurrency(screen.baseRate)}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${screen.status === 'Live' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{screen.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quotation;