import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// ------------------- Types -------------------
interface Contact {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    lastMet: string;
}

interface Activity {
    id: string;
    type: 'Call' | 'Meeting' | 'Email' | 'Quotation';
    description: string;
    date: string;
    owner: string;
}

interface Account {
    id: string;
    name: string;
    legalName: string;
    segment: string;
    region: string;
    owner: string;
    status: 'Active' | 'Dormant' | 'Churned';
    openOpps: number;
    lastEngagementDate: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    tags: string[];
    totalOutstanding?: number;
    creditLimit?: number;
    onHold?: boolean;
    executedRuns?: number;
    plannedRuns?: number;
    contacts: Contact[];
    activities: Activity[];
}

const generateContacts = (brand: string): Contact[] => [
    { id: 'C1', name: `Rahul Sharma`, role: 'Marketing Head', email: `rahul@${brand.toLowerCase().replace(/\s/g, '')}.com`, phone: '+91 98765 43210', lastMet: '3 days ago' },
    { id: 'C2', name: `Sneha Gupta`, role: 'Media Planner', email: `sneha@${brand.toLowerCase().replace(/\s/g, '')}.com`, phone: '+91 98765 55555', lastMet: '12 days ago' }
];

const generateActivities = (): Activity[] => [
    { id: 'A1', type: 'Call', description: 'Monthly campaign review and ROI discussion.', date: '2 days ago', owner: 'Arjun Mehta' },
    { id: 'A2', type: 'Quotation', description: 'Shared Diwali Blitz proposal for 45 screens.', date: '1 week ago', owner: 'Arjun Mehta' },
    { id: 'A3', type: 'Email', description: 'Requirement gathering for upcoming movie tie-in.', date: '10 days ago', owner: 'Arjun Mehta' }
];

const INITIAL_ACCOUNTS: Account[] = [
    { id: "ACC-001", name: "PepsiCo India", legalName: "PepsiCo India Holdings Pvt Ltd.", segment: "FMCG", region: "North", owner: "Arjun Mehta", status: "Active", openOpps: 3, lastEngagementDate: "2 days ago", riskLevel: "Low", tags: ["Strategic"], totalOutstanding: 1250000, creditLimit: 5000000, onHold: false, executedRuns: 4500, plannedRuns: 5000, contacts: generateContacts("PepsiCo"), activities: generateActivities() },
    { id: "ACC-002", name: "Maruti Suzuki", legalName: "Maruti Suzuki India Ltd.", segment: "Automotive", region: "North", owner: "Priya Sharma", status: "Active", openOpps: 1, lastEngagementDate: "1 day ago", riskLevel: "Low", tags: ["Bulk Buyer"], totalOutstanding: 0, creditLimit: 10000000, onHold: false, executedRuns: 8900, plannedRuns: 9000, contacts: generateContacts("Maruti"), activities: generateActivities() },
    { id: "ACC-003", name: "Reliance Retail", legalName: "Reliance Retail Ventures Ltd.", segment: "Retail", region: "West", owner: "Vikram Singh", status: "Active", openOpps: 5, lastEngagementDate: "Today", riskLevel: "Medium", tags: ["Pan-India"], totalOutstanding: 4580000, creditLimit: 5000000, onHold: false, executedRuns: 12000, plannedRuns: 15000, contacts: generateContacts("Reliance"), activities: generateActivities() },
    { id: "ACC-004", name: "Nestle India", legalName: "Nestle India Ltd.", segment: "FMCG", region: "South", owner: "Arjun Mehta", status: "Active", openOpps: 2, lastEngagementDate: "4 days ago", riskLevel: "Low", tags: ["Maggi Launch"], totalOutstanding: 200000, creditLimit: 2000000, onHold: false, executedRuns: 3400, plannedRuns: 3500, contacts: generateContacts("Nestle"), activities: generateActivities() },
    { id: "ACC-005", name: "Hindustan Unilever", legalName: "Hindustan Unilever Ltd.", segment: "FMCG", region: "West", owner: "Sarah Khan", status: "Active", openOpps: 0, lastEngagementDate: "12 days ago", riskLevel: "High", tags: ["Churn Risk"], totalOutstanding: 6700000, creditLimit: 5000000, onHold: true, executedRuns: 1500, plannedRuns: 4000, contacts: generateContacts("HUL"), activities: generateActivities() },
    { id: "ACC-006", name: "Tata Motors", legalName: "Tata Motors Ltd.", segment: "Automotive", region: "West", owner: "Priya Sharma", status: "Active", openOpps: 2, lastEngagementDate: "3 days ago", riskLevel: "Low", tags: ["EV Focus"], totalOutstanding: 45000, creditLimit: 3000000, onHold: false, executedRuns: 2200, plannedRuns: 2200, contacts: generateContacts("TataMotors"), activities: generateActivities() },
    { id: "ACC-007", name: "Samsung India", legalName: "Samsung India Electronics Pvt Ltd.", segment: "Tech", region: "North", owner: "Vikram Singh", status: "Active", openOpps: 4, lastEngagementDate: "1 day ago", riskLevel: "Low", tags: ["Premium"], totalOutstanding: 0, creditLimit: 8000000, onHold: false, executedRuns: 5600, plannedRuns: 5600, contacts: generateContacts("Samsung"), activities: generateActivities() },
    { id: "ACC-008", name: "Amul", legalName: "Gujarat Coop Milk Mkt Federation", segment: "FMCG", region: "West", owner: "Sarah Khan", status: "Active", openOpps: 1, lastEngagementDate: "5 days ago", riskLevel: "Medium", tags: ["Dairy"], totalOutstanding: 890000, creditLimit: 1500000, onHold: false, executedRuns: 4100, plannedRuns: 4500, contacts: generateContacts("Amul"), activities: generateActivities() },
    { id: "ACC-009", name: "Byju's", legalName: "Think & Learn Pvt Ltd.", segment: "EdTech", region: "South", owner: "Arjun Mehta", status: "Dormant", openOpps: 0, lastEngagementDate: "45 days ago", riskLevel: "High", tags: ["Delayed Pay"], totalOutstanding: 2500000, creditLimit: 1000000, onHold: true, executedRuns: 0, plannedRuns: 500, contacts: generateContacts("Byjus"), activities: generateActivities() },
    { id: "ACC-010", name: "Asian Paints", legalName: "Asian Paints Ltd.", segment: "Home", region: "West", owner: "Priya Sharma", status: "Active", openOpps: 3, lastEngagementDate: "Today", riskLevel: "Low", tags: ["Diwali"], totalOutstanding: 120000, creditLimit: 4000000, onHold: false, executedRuns: 1800, plannedRuns: 2000, contacts: generateContacts("AsianPaints"), activities: generateActivities() },
    { id: "ACC-011", name: "PhonePe", legalName: "PhonePe Pvt Ltd.", segment: "FinTech", region: "South", owner: "Vikram Singh", status: "Active", openOpps: 1, lastEngagementDate: "2 days ago", riskLevel: "Low", tags: ["Digital"], totalOutstanding: 0, creditLimit: 2500000, onHold: false, executedRuns: 3300, plannedRuns: 3300, contacts: generateContacts("PhonePe"), activities: generateActivities() },
    { id: "ACC-012", name: "Coca-Cola India", legalName: "Coca-Cola India Pvt Ltd.", segment: "FMCG", region: "North", owner: "Arjun Mehta", status: "Active", openOpps: 2, lastEngagementDate: "1 week ago", riskLevel: "Low", tags: ["Global"], totalOutstanding: 560000, creditLimit: 6000000, onHold: false, executedRuns: 4800, plannedRuns: 5000, contacts: generateContacts("Coke"), activities: generateActivities() },
    { id: "ACC-013", name: "Amazon India", legalName: "Amazon Seller Services Pvt Ltd.", segment: "Retail", region: "North", owner: "Sarah Khan", status: "Active", openOpps: 6, lastEngagementDate: "2 days ago", riskLevel: "Low", tags: ["Prime Day"], totalOutstanding: 1200000, creditLimit: 20000000, onHold: false, executedRuns: 15000, plannedRuns: 15500, contacts: generateContacts("Amazon"), activities: generateActivities() },
    { id: "ACC-014", name: "ITC Ltd.", legalName: "ITC Limited", segment: "FMCG", region: "East", owner: "Vikram Singh", status: "Active", openOpps: 1, lastEngagementDate: "10 days ago", riskLevel: "Low", tags: ["Diversified"], totalOutstanding: 0, creditLimit: 7500000, onHold: false, executedRuns: 6700, plannedRuns: 6700, contacts: generateContacts("ITC"), activities: generateActivities() },
    { id: "ACC-015", name: "Axis Bank", legalName: "Axis Bank Ltd.", segment: "Banking", region: "West", owner: "Priya Sharma", status: "Active", openOpps: 2, lastEngagementDate: "3 days ago", riskLevel: "Medium", tags: ["Cards"], totalOutstanding: 230000, creditLimit: 3000000, onHold: false, executedRuns: 1200, plannedRuns: 1500, contacts: generateContacts("AxisBank"), activities: generateActivities() },
];

const SEGMENTS = ["FMCG", "Automotive", "Retail", "Tech", "Banking", "FinTech", "EdTech"];
const REGIONS = ["North", "South", "East", "West"];
const RISK_PROFILES = ["Low", "Medium", "High"];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

const Accounts = () => {
    const [accounts] = useState<Account[]>(INITIAL_ACCOUNTS);
    const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'finance' | 'contacts' | 'execution'>('overview');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Filters & Sorting
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
    const [holdFilter, setHoldFilter] = useState<boolean | null>(null);
    const [sortConfig, setSortConfig] = useState<{key: keyof Account, direction: 'asc' | 'desc'} | null>(null);

    const portfolioMetrics = useMemo(() => {
        const totalReceivables = accounts.reduce((acc, curr) => acc + (curr.totalOutstanding || 0), 0);
        const onHoldCount = accounts.filter(a => a.onHold).length;
        const totalPlanned = accounts.reduce((acc, curr) => acc + (curr.plannedRuns || 0), 0);
        const totalExecuted = accounts.reduce((acc, curr) => acc + (curr.executedRuns || 0), 0);
        const deliveryRate = totalPlanned > 0 ? (totalExecuted / totalPlanned * 100).toFixed(1) : "0";
        const highRiskCount = accounts.filter(a => a.riskLevel === 'High').length;

        return { totalReceivables, onHoldCount, deliveryRate, highRiskCount, totalAccounts: accounts.length };
    }, [accounts]);

    const filteredAccounts = useMemo(() => {
        let result = accounts.filter(acc => {
            const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  acc.legalName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSegment = selectedSegments.length === 0 || selectedSegments.includes(acc.segment);
            const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(acc.region);
            const matchesRisk = selectedRisks.length === 0 || selectedRisks.includes(acc.riskLevel);
            const matchesHold = holdFilter === null || acc.onHold === holdFilter;
            return matchesSearch && matchesSegment && matchesRegion && matchesRisk && matchesHold;
        });

        if (sortConfig) {
            result.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal === undefined || bVal === undefined) return 0;
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return result;
    }, [accounts, searchQuery, selectedSegments, selectedRegions, selectedRisks, holdFilter, sortConfig]);

    const toggleFilter = (current: string[], value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
        setter(next);
    };

    const handleSort = (key: keyof Account) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const handleNextPrev = (direction: 'next' | 'prev') => {
        if (!selectedAccount) return;
        const index = filteredAccounts.findIndex(a => a.id === selectedAccount.id);
        if (direction === 'next' && index < filteredAccounts.length - 1) {
            setSelectedAccount(filteredAccounts[index + 1]);
        } else if (direction === 'prev' && index > 0) {
            setSelectedAccount(filteredAccounts[index - 1]);
        }
    };

    const handleAccountClick = (account: Account) => {
        setSelectedAccount(account);
        setViewMode('detail');
        setActiveTab('overview');
    };

    const appliedFiltersCount = selectedSegments.length + selectedRegions.length + selectedRisks.length + (holdFilter !== null ? 1 : 0);

    if (viewMode === 'list') {
        return (
            <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
                <header className="px-8 py-6 bg-white dark:bg-[#1a2234] border-b border-border-light flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                <Link to="/" className="hover:text-primary transition-colors">QUBE Sales</Link>
                                <span className="text-slate-200">/</span>
                                <span className="text-primary">Master Portfolio</span>
                            </div>
                            <h1 className="text-2xl font-black tracking-tight">Accounts Portfolio</h1>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl text-sm font-bold border dark:border-slate-700 hover:bg-slate-200 transition-all flex items-center gap-2">
                             <span className="material-symbols-outlined text-[18px]">file_download</span> CSV Export
                        </button>
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                        >
                            + New Account
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
                    {/* Metrics Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div 
                            onClick={() => setHoldFilter(holdFilter === true ? null : true)}
                            title="Clients with blocked shipments due to payment delays"
                            className={`p-6 rounded-[2rem] border transition-all cursor-pointer shadow-sm group ${holdFilter === true ? 'bg-red-50 border-red-500 ring-2 ring-red-500 ring-offset-2' : 'bg-white dark:bg-surface-dark border-border-light dark:border-slate-800 hover:border-red-200'}`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-red-100 text-red-600 rounded-lg font-black text-[10px]">ALERTS</div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Credit Block</span>
                            </div>
                            <h3 className="text-2xl font-black text-red-600">{portfolioMetrics.onHoldCount} Blocks</h3>
                        </div>
                        <div 
                            onClick={() => { setSelectedRisks(['High']); setHoldFilter(null); }}
                            title="Accounts showing high churn indicators"
                            className={`p-6 rounded-[2rem] border transition-all cursor-pointer shadow-sm group ${selectedRisks.includes('High') && selectedRisks.length === 1 ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500 ring-offset-2' : 'bg-white dark:bg-surface-dark border-border-light dark:border-slate-800 hover:border-amber-200'}`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg font-black text-[10px]">WARNING</div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">High Risk</span>
                            </div>
                            <h3 className="text-2xl font-black text-amber-600">{portfolioMetrics.highRiskCount} Clients</h3>
                        </div>
                        <div title="Average Proof-of-Play verified delivery across campaigns" className="bg-white dark:bg-surface-dark p-6 rounded-[2rem] border border-border-light dark:border-slate-800 shadow-sm group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg font-black text-[10px]">HEALTH</div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance</span>
                            </div>
                            <h3 className="text-2xl font-black text-green-600">{portfolioMetrics.deliveryRate}%</h3>
                        </div>
                        <div title="Total outstanding receivables synced from ERP" className="bg-white dark:bg-surface-dark p-6 rounded-[2rem] border border-border-light dark:border-slate-800 shadow-sm group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg font-black text-[10px]">FINANCE</div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoiced</span>
                            </div>
                            <h3 className="text-2xl font-black">{formatCurrency(portfolioMetrics.totalReceivables)}</h3>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-border-light dark:border-slate-800 overflow-hidden shadow-sm flex-1 flex flex-col">
                        <div className="px-8 py-6 space-y-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="relative flex-1 max-w-md">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Filter brands or legal names..." className="w-full pl-12 pr-4 h-11 rounded-2xl border-none bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary transition-all"/>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {filteredAccounts.length} / {accounts.length}</span>
                                    {appliedFiltersCount > 0 && (
                                        <button 
                                            onClick={() => { setSearchQuery(""); setSelectedSegments([]); setSelectedRegions([]); setSelectedRisks([]); setHoldFilter(null); }}
                                            className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">close</span> Reset All
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap items-start gap-10 border-t border-slate-50 dark:border-slate-800 pt-6">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Segment</span>
                                    <div className="flex gap-1.5 flex-wrap">
                                        {SEGMENTS.map(s => (
                                            <button 
                                                key={s} 
                                                onClick={() => toggleFilter(selectedSegments, s, setSelectedSegments)}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all flex items-center gap-1 ${selectedSegments.includes(s) ? 'bg-primary text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}
                                            >
                                                {s} {selectedSegments.includes(s) && <span className="material-symbols-outlined text-[12px]">close</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Region</span>
                                    <div className="flex gap-1.5">
                                        {REGIONS.map(r => (
                                            <button 
                                                key={r} 
                                                onClick={() => toggleFilter(selectedRegions, r, setSelectedRegions)}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all flex items-center gap-1 ${selectedRegions.includes(r) ? 'bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}
                                            >
                                                {r} {selectedRegions.includes(r) && <span className="material-symbols-outlined text-[12px]">close</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* Restored Risk Filter Chips */}
                                <div className="flex flex-col gap-2">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk Profile</span>
                                    <div className="flex gap-1.5">
                                        {RISK_PROFILES.map(risk => (
                                            <button 
                                                key={risk} 
                                                onClick={() => toggleFilter(selectedRisks, risk, setSelectedRisks)}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all flex items-center gap-1 ${selectedRisks.includes(risk) ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}
                                            >
                                                {risk} {selectedRisks.includes(risk) && <span className="material-symbols-outlined text-[12px]">close</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1">
                            {filteredAccounts.length === 0 ? (
                                <div className="p-20 text-center flex flex-col items-center">
                                    <span className="material-symbols-outlined text-slate-200 text-[64px] mb-4">search_off</span>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">No matching accounts found</h3>
                                    <button onClick={() => { setSelectedSegments([]); setSelectedRegions([]); setSelectedRisks([]); setHoldFilter(null); setSearchQuery(""); }} className="mt-4 text-primary font-bold hover:underline">Clear Search & Filters</button>
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-white dark:bg-surface-dark z-10 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-800">
                                        <tr>
                                            <th className="px-8 py-5 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                                                Brand & Segment {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                            </th>
                                            <th className="px-8 py-5 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('region')}>
                                                Region {sortConfig?.key === 'region' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                            </th>
                                            <th className="px-8 py-5 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('totalOutstanding')}>
                                                Outstanding {sortConfig?.key === 'totalOutstanding' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                            </th>
                                            <th className="px-8 py-5">Compliance</th>
                                            <th className="px-8 py-5 text-right">Risk Flag</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-light dark:divide-slate-800">
                                        {filteredAccounts.map(acc => (
                                            <tr key={acc.id} onClick={() => handleAccountClick(acc)} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group animate-[fadeIn_0.3s]">
                                                <td className="px-8 py-5">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{acc.name}</span>
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{acc.segment}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-xs font-bold text-slate-600 dark:text-slate-400">{acc.region}</td>
                                                <td className="px-8 py-5">
                                                    <div className="flex flex-col">
                                                        <span className={`font-black text-sm ${acc.onHold ? 'text-red-600' : 'text-slate-900 dark:text-slate-200'}`}>{formatCurrency(acc.totalOutstanding || 0)}</span>
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Lim: {formatCurrency(acc.creditLimit || 0)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 min-w-[60px] h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                            <div className="h-full bg-primary" style={{width: `${acc.plannedRuns ? (acc.executedRuns || 0) / acc.plannedRuns * 100 : 0}%`}}></div>
                                                        </div>
                                                        <span className="text-[10px] font-black">{acc.plannedRuns ? Math.round((acc.executedRuns || 0) / acc.plannedRuns * 100) : 0}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    {acc.onHold ? (
                                                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider animate-pulse">STOP SUPPLY</span>
                                                    ) : (
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                                            acc.riskLevel === 'Low' ? 'bg-green-50 text-green-700' : 
                                                            acc.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                                                        }`}>{acc.riskLevel} RISK</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-900 border-t border-border-light dark:border-slate-800 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Record {filteredAccounts.length > 0 ? '1' : '0'} to {filteredAccounts.length} of {filteredAccounts.length} Filtered Results</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-400 font-bold active:scale-95 disabled:opacity-50" disabled>Previous</button>
                                <button className="px-4 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-400 font-bold active:scale-95 disabled:opacity-50" disabled>Next</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add New Account Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s]">
                        <div className="bg-white dark:bg-[#1a2234] w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]">
                            <h3 className="text-2xl font-black mb-8 tracking-tight">Add Portfolio Account</h3>
                            <div className="overflow-y-auto pr-4 flex-1 custom-scrollbar">
                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Account Brand Name</label>
                                        <input placeholder="e.g. Disney Star India" className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm px-5 focus:ring-2 focus:ring-primary transition-all"/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Business Segment</label>
                                        <select className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm px-5 focus:ring-2 focus:ring-primary transition-all">
                                            {SEGMENTS.map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Region Assignment</label>
                                        <select className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm px-5 focus:ring-2 focus:ring-primary transition-all">
                                            {REGIONS.map(r => <option key={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Specific Product</label>
                                        <input placeholder="e.g. Carbonated Soft Drinks" className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm px-5 focus:ring-2 focus:ring-primary transition-all"/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Contact</label>
                                        <input placeholder="e.g. Rajesh Kumar" className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm px-5 focus:ring-2 focus:ring-primary transition-all"/>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Risk Profile</label>
                                        <select className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm px-5 focus:ring-2 focus:ring-primary transition-all">
                                            {RISK_PROFILES.map(r => <option key={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Initial Credit Limit (INR)</label>
                                        <input type="number" placeholder="5000000" className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm px-5 focus:ring-2 focus:ring-primary transition-all"/>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Account Notes</label>
                                        <textarea placeholder="Capture client preferences, specific requirements, or background information..." className="w-full h-32 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none text-sm p-5 focus:ring-2 focus:ring-primary transition-all resize-none"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 text-slate-500 font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all">CANCEL</button>
                                <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">REGISTER ACCOUNT</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Detail View
    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <header className="px-8 pt-6 bg-white dark:bg-[#1a2234] border-b border-border-light dark:border-slate-800 flex flex-col gap-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Link to="/" className="hover:text-primary transition-colors">QUBE Sales</Link>
                        <span className="text-slate-200">/</span>
                        <button onClick={() => setViewMode('list')} className="hover:text-primary transition-colors uppercase">Portfolio</button>
                        <span className="text-slate-200">/</span>
                        <span className="text-primary">{selectedAccount?.name}</span>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleNextPrev('prev')} 
                            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors disabled:opacity-30"
                            disabled={filteredAccounts.findIndex(a => a.id === selectedAccount?.id) === 0}
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button 
                            onClick={() => handleNextPrev('next')} 
                            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors disabled:opacity-30"
                            disabled={filteredAccounts.findIndex(a => a.id === selectedAccount?.id) === filteredAccounts.length - 1}
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-5">
                        <button onClick={() => setViewMode('list')} className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 transition-all active:scale-90 border dark:border-slate-700">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight">{selectedAccount?.name}</h1>
                            <p className="text-sm text-slate-500 font-medium">{selectedAccount?.legalName}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/quotation" className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-primary-dark shadow-lg shadow-primary/20">Create Quotation</Link>
                    </div>
                </div>
                <div className="flex gap-10">
                    {[
                        {id: 'overview', icon: 'visibility', label: 'Overview'},
                        {id: 'finance', icon: 'account_balance_wallet', label: 'Finance (ERP)'},
                        {id: 'execution', icon: 'play_circle', label: 'Proof of Play'},
                        {id: 'contacts', icon: 'group', label: 'Key Contacts'}
                    ].map(t => (
                        <button 
                            key={t.id} 
                            onClick={() => setActiveTab(t.id as any)} 
                            className={`pb-4 text-xs font-black uppercase tracking-widest flex items-center gap-2 border-b-2 transition-all ${activeTab === t.id ? 'text-primary border-primary' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                            {t.label}
                        </button>
                    ))}
                </div>
            </header>
            
            <div className="flex-1 p-8 overflow-y-auto animate-[fadeIn_0.3s]">
                {activeTab === 'finance' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-surface-dark p-8 rounded-[3rem] border border-border-light dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ERP Outstanding</p>
                            <h2 className={`text-3xl font-black ${selectedAccount?.onHold ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>{formatCurrency(selectedAccount?.totalOutstanding || 0)}</h2>
                        </div>
                        <div className="bg-white dark:bg-surface-dark p-8 rounded-[3rem] border border-border-light dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Credit Limit</p>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">{formatCurrency(selectedAccount?.creditLimit || 0)}</h2>
                        </div>
                        <div className="bg-white dark:bg-surface-dark p-8 rounded-[3rem] border border-border-light dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Credit Status</p>
                            {selectedAccount?.onHold ? 
                                <span className="bg-red-50 text-red-600 border border-red-200 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-wider">STOP SUPPLY ACTIVE</span> : 
                                <span className="bg-green-50 text-green-600 border border-green-200 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-wider">ACCOUNT HEALTHY</span>
                            }
                        </div>
                    </div>
                )}
                {activeTab === 'execution' && (
                    <div className="bg-white dark:bg-surface-dark rounded-[3rem] border border-border-light dark:border-slate-800 p-10 shadow-sm max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-2xl font-black tracking-tight">Proof-of-Play Compliance</h3>
                                <p className="text-sm text-slate-500">Live delivery metrics derived from ERP screen logs.</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Rate</p>
                                <h4 className="text-3xl font-black text-primary">
                                    {selectedAccount?.plannedRuns ? ((selectedAccount.executedRuns || 0) / selectedAccount.plannedRuns * 100).toFixed(1) : 0}%
                                </h4>
                            </div>
                        </div>
                        <div className="space-y-8">
                             <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] flex items-center justify-between border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-green-100 text-green-700 rounded-2xl"><span className="material-symbols-outlined text-[28px]">play_circle</span></div>
                                    <div><p className="font-bold text-lg">Executed Runs</p><p className="text-sm text-slate-500">Verified successful content plays.</p></div>
                                </div>
                                <span className="text-3xl font-black">{selectedAccount?.executedRuns}</span>
                             </div>
                             <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] flex items-center justify-between border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-red-100 text-red-700 rounded-2xl"><span className="material-symbols-outlined text-[28px]">report</span></div>
                                    <div><p className="font-bold text-lg">Missed Plays</p><p className="text-sm text-slate-500">Projected shortfall due to downtime.</p></div>
                                </div>
                                <span className="text-3xl font-black text-red-600">{(selectedAccount?.plannedRuns || 0) - (selectedAccount?.executedRuns || 0)}</span>
                             </div>
                        </div>
                    </div>
                )}
                {activeTab === 'contacts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {selectedAccount?.contacts.map(contact => (
                            <div key={contact.id} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-border-light dark:border-slate-800 shadow-sm group hover:border-primary/40 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[24px]">person</span>
                                    </div>
                                    <span className="text-[9px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 uppercase tracking-wider">Last met {contact.lastMet}</span>
                                </div>
                                <h4 className="text-lg font-black">{contact.name}</h4>
                                <p className="text-sm font-bold text-primary mb-6">{contact.role}</p>
                                <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                                    <div className="flex items-center gap-3 text-sm text-slate-500">
                                        <span className="material-symbols-outlined text-[18px]">mail</span>
                                        {contact.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-500">
                                        <span className="material-symbols-outlined text-[18px]">call</span>
                                        {contact.phone}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-7 bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-slate-800 shadow-sm">
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-10 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">history</span>
                                Interaction History
                            </h4>
                            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                                {selectedAccount?.activities.map((act) => (
                                    <div key={act.id} className="flex gap-8 relative z-10">
                                        <div className={`w-6 h-6 rounded-full border-4 border-white dark:border-surface-dark flex-shrink-0 mt-1 shadow-sm ${
                                            act.type === 'Call' ? 'bg-blue-500' : 
                                            act.type === 'Quotation' ? 'bg-indigo-500' : 'bg-slate-300'
                                        }`}></div>
                                        <div>
                                            <p className="font-bold text-lg leading-snug">{act.description}</p>
                                            <div className="flex gap-4 items-center mt-1">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{act.date}</span>
                                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{act.owner}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
                             <div className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-border-light dark:border-slate-800 shadow-sm">
                                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-500 text-[20px]">bolt</span>
                                    Active Funnel Stage
                                </h4>
                                <div className="space-y-4">
                                    {selectedAccount?.openOpps === 0 ? (
                                        <div className="p-8 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                                            <p className="text-sm text-slate-400 italic">No active opportunities for this client.</p>
                                        </div>
                                    ) : (
                                        Array.from({length: selectedAccount?.openOpps || 0}).map((_, i) => (
                                            <div key={i} className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center group cursor-pointer hover:bg-primary/5 transition-all">
                                                <div>
                                                    <p className="font-bold leading-tight">FY26 Sprint: Proposal {i+1}</p>
                                                    <p className="text-[10px] font-black text-primary uppercase mt-1">Qualified • Shared</p>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <button className="w-full mt-8 py-5 rounded-2xl bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-primary dark:hover:bg-primary transition-all shadow-lg active:scale-95">Start New Quotation</button>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Accounts;