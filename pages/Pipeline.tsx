import React, { useState, useMemo } from 'react';

// ------------------- Types -------------------
type StageType = 'Lead' | 'Contacted' | 'Qualified' | 'Quotation Shared' | 'Customer';
type ClientType = 'New' | 'Existing';
type PriorityType = 'High' | 'Medium' | 'Low';

interface Opportunity {
    id: number;
    title: string;
    brand: string;
    value: number; 
    stage: StageType;
    segment: string;
    region: string;
    clientType: ClientType;
    owner: string; 
    probability: number;
    daysInStage: number; 
    priority: PriorityType;
}

// ------------------- Constants -------------------
const STAGES: { id: StageType; label: string; color: string; defaultProbability: number }[] = [
    { id: 'Lead', label: 'Lead', color: 'bg-slate-400', defaultProbability: 5 },
    { id: 'Contacted', label: 'Contacted', color: 'bg-blue-400', defaultProbability: 20 },
    { id: 'Qualified', label: 'Qualified', color: 'bg-indigo-500', defaultProbability: 40 },
    { id: 'Quotation Shared', label: 'Quotation Shared', color: 'bg-orange-500', defaultProbability: 70 },
    { id: 'Customer', label: 'Customer', color: 'bg-green-600', defaultProbability: 100 },
];

const SEGMENTS = ["FMCG", "Auto", "Retail", "Tech", "Media", "Banking"];
const REGIONS = ["North", "South", "East", "West"];
const OWNERS = ["Arjun Mehta", "Priya Sharma", "Vikram Singh", "Sarah Khan"];
const PRIORITIES = ["High", "Medium", "Low"];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const INITIAL_DATA: Opportunity[] = [
    { id: 1, title: "Summer Promo", brand: "Fizz Co.", value: 120000, stage: "Contacted", segment: "FMCG", region: "North", clientType: "New", owner: "Arjun Mehta", probability: 20, daysInStage: 4, priority: 'Medium' },
    { id: 2, title: "SUV Launch", brand: "Velocity Motors", value: 350000, stage: "Qualified", segment: "Auto", region: "West", clientType: "Existing", owner: "Priya Sharma", probability: 40, daysInStage: 12, priority: 'High' },
    { id: 3, title: "Movie Tie-in", brand: "Star Studios", value: 2400000, stage: "Quotation Shared", segment: "Media", region: "South", clientType: "Existing", owner: "Arjun Mehta", probability: 70, daysInStage: 2, priority: 'High' },
    { id: 4, title: "Diwali Blitz", brand: "Ethnic Weaver", value: 80000, stage: "Lead", segment: "Retail", region: "East", clientType: "New", owner: "Vikram Singh", probability: 5, daysInStage: 1, priority: 'Low' },
    { id: 5, title: "Tech Conf", brand: "InnoSys", value: 150000, stage: "Customer", segment: "Tech", region: "North", clientType: "Existing", owner: "Vikram Singh", probability: 100, daysInStage: 16, priority: 'Medium' },
    { id: 6, title: "Winter Gear", brand: "North Peak", value: 450000, stage: "Qualified", segment: "Retail", region: "North", clientType: "New", owner: "Sarah Khan", probability: 40, daysInStage: 5, priority: 'High' },
    { id: 7, title: "Savings Plan", brand: "Axis Bank", value: 900000, stage: "Lead", segment: "Banking", region: "West", clientType: "Existing", owner: "Priya Sharma", probability: 10, daysInStage: 3, priority: 'Medium' },
];

const Pipeline = () => {
    const [opportunities] = useState<Opportunity[]>(INITIAL_DATA);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClientTypes, setSelectedClientTypes] = useState<string[]>([]);
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

    const toggleFilter = (current: string[], value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    };

    const filteredOpportunities = useMemo(() => {
        return opportunities.filter(op => {
            const matchesSearch = op.brand.toLowerCase().includes(searchQuery.toLowerCase()) || op.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedClientTypes.length === 0 || selectedClientTypes.includes(op.clientType);
            const matchesSegment = selectedSegments.length === 0 || selectedSegments.includes(op.segment);
            const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(op.region);
            const matchesOwner = selectedOwners.length === 0 || selectedOwners.includes(op.owner);
            const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(op.priority);
            return matchesSearch && matchesType && matchesSegment && matchesRegion && matchesOwner && matchesPriority;
        });
    }, [opportunities, searchQuery, selectedClientTypes, selectedSegments, selectedRegions, selectedOwners, selectedPriorities]);

    const getStageMetrics = (stageId: StageType) => {
        const stageItems = filteredOpportunities.filter(o => o.stage === stageId);
        const totalValue = stageItems.reduce((acc, curr) => acc + curr.value, 0);
        return { count: stageItems.length, value: totalValue };
    };

    const filterStyles = "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1";

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <header className="px-8 py-6 bg-white dark:bg-[#1a2234] border-b border-border-light dark:border-slate-800 flex flex-col gap-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Pipeline Forecast</h1>
                        <p className="text-sm text-slate-500 font-medium">Multi-select funnel visualization with stage-wise values.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search opportunities..." className="pl-10 pr-4 h-11 w-64 rounded-xl border-none bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary"/>
                        </div>
                        <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-primary/20">+ New Lead</button>
                    </div>
                </div>

                {/* Unified Filter Bar */}
                <div className="flex flex-wrap items-start gap-x-12 gap-y-4 border-t border-slate-50 dark:border-slate-800 pt-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Client Type</span>
                        <div className="flex gap-1.5">
                            {["New", "Existing"].map(type => (
                                <button key={type} onClick={() => toggleFilter(selectedClientTypes, type, setSelectedClientTypes)} className={`${filterStyles} ${selectedClientTypes.includes(type) ? 'bg-primary text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}>
                                    {type} {selectedClientTypes.includes(type) && <span className="material-symbols-outlined text-[12px]">close</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Segment</span>
                        <div className="flex gap-1.5 flex-wrap max-w-xs">
                            {SEGMENTS.map(seg => (
                                <button key={seg} onClick={() => toggleFilter(selectedSegments, seg, setSelectedSegments)} className={`${filterStyles} ${selectedSegments.includes(seg) ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}>
                                    {seg} {selectedSegments.includes(seg) && <span className="material-symbols-outlined text-[12px]">close</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Region</span>
                        <div className="flex gap-1.5">
                            {REGIONS.map(reg => (
                                <button key={reg} onClick={() => toggleFilter(selectedRegions, reg, setSelectedRegions)} className={`${filterStyles} ${selectedRegions.includes(reg) ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}>
                                    {reg} {selectedRegions.includes(reg) && <span className="material-symbols-outlined text-[12px]">close</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Priority</span>
                        <div className="flex gap-1.5">
                            {PRIORITIES.map(pri => (
                                <button key={pri} onClick={() => toggleFilter(selectedPriorities, pri, setSelectedPriorities)} className={`${filterStyles} ${selectedPriorities.includes(pri) ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}>
                                    {pri} {selectedPriorities.includes(pri) && <span className="material-symbols-outlined text-[12px]">close</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                    {(selectedClientTypes.length > 0 || selectedSegments.length > 0 || selectedRegions.length > 0 || selectedPriorities.length > 0) && (
                        <button onClick={() => { setSelectedClientTypes([]); setSelectedSegments([]); setSelectedRegions([]); setSelectedPriorities([]); setSelectedOwners([]); }} className="self-end mb-1 text-[10px] font-black text-red-500 hover:underline">RESET ALL</button>
                    )}
                </div>
            </header>

            <div className="flex-1 overflow-x-auto p-8 bg-slate-50 dark:bg-background-dark">
                <div className="flex h-full gap-8 min-w-max">
                    {STAGES.map(stage => {
                        const { count, value } = getStageMetrics(stage.id);
                        const items = filteredOpportunities.filter(o => o.stage === stage.id);
                        return (
                            <div key={stage.id} className="w-80 flex flex-col h-full animate-[fadeIn_0.3s]">
                                <div className="mb-6 px-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                                        <h3 className="font-black text-xs text-slate-700 dark:text-slate-300 uppercase tracking-[0.15em]">{stage.label}</h3>
                                        <span className="text-[10px] font-black bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-300">{count}</span>
                                    </div>
                                    <div className="bg-white dark:bg-[#1a2234] p-4 rounded-2xl border border-border-light dark:border-slate-800 shadow-sm">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Stage Value</p>
                                        <p className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(value)}</p>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto space-y-4 p-1 custom-scrollbar">
                                    {items.map(item => (
                                        <div key={item.id} className="bg-white dark:bg-[#1a2234] p-5 rounded-2xl shadow-sm border border-border-light dark:border-slate-800 hover:shadow-xl hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase w-fit ${item.clientType === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{item.clientType}</span>
                                                    <span className="text-[9px] font-black text-slate-400 uppercase">{item.segment} • {item.region}</span>
                                                </div>
                                                <div className={`w-2 h-2 rounded-full ${item.priority === 'High' ? 'bg-red-500 animate-pulse' : item.priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'}`} title={`Priority: ${item.priority}`}></div>
                                            </div>
                                            <h4 className="font-black text-sm mb-1 group-hover:text-primary transition-colors leading-tight">{item.title}</h4>
                                            <p className="text-xs text-slate-500 font-medium mb-4">{item.brand}</p>
                                            <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-800">
                                                <span className="font-black text-sm">{formatCurrency(item.value)}</span>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-[10px] font-black text-primary">{item.probability}%</span>
                                                    <span className="text-[10px] text-slate-300">prob.</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-[18px] text-slate-300">drag_indicator</span>
                                            </div>
                                        </div>
                                    ))}
                                    {items.length === 0 && (
                                        <div className="h-32 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl flex items-center justify-center">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Items</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Pipeline;