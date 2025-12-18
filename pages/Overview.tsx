import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface Toast {
    message: string;
    type: 'success' | 'info' | 'error';
    id: number;
}

const Overview = () => {
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isPipelineExpanded, setIsPipelineExpanded] = useState(false);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [selectedMonth, setSelectedMonth] = useState('Oct');

    const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { message, type, id }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    };

    const metrics = [
        { 
            label: "Total Pipeline", 
            value: "₹ 12 L", 
            trend: "+12%", 
            isUp: true,
            color: "text-primary", 
            icon: "filter_alt", 
            category: 'pipeline',
            description: "Total value of all open opportunities in the funnel."
        },
        { 
            label: "Win Rate (YTD)", 
            value: "68%", 
            trend: "+5%", 
            isUp: true,
            color: "text-green-600", 
            icon: "trophy", 
            category: 'winrate',
            description: "Percentage of closed deals that were successfully won."
        },
        { 
            label: "Active Accounts", 
            value: "24", 
            trend: "0%", 
            isUp: null,
            color: "text-indigo-600", 
            icon: "business", 
            category: 'accounts',
            description: "Number of clients with live or recently active campaigns."
        },
        { 
            label: "Pending Proposals", 
            value: "7", 
            trend: "+2", 
            isUp: true,
            color: "text-orange-500", 
            icon: "request_quote", 
            category: 'proposals',
            description: "Quotations sent and awaiting client approval."
        }
    ];

    const urgentTasks = [
        { id: 1, title: "Review Proposal: PepsiCo", due: "Today, 2 PM", type: "Urgent" },
        { id: 2, title: "Follow-up: Velocity Motors", due: "Tomorrow, 10 AM", type: "Call" },
        { id: 3, title: "Approve Quotation #Q-884", due: "Oct 26", type: "Approval" }
    ];

    const handleGenerateReport = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            addToast("Executive Sales Report (Q4) has been generated and downloaded.", 'success');
        }, 1800);
    };

    const handleQuickAddTask = () => {
        const title = prompt("Enter task summary:");
        if (title) {
            addToast(`New task created: "${title}"`, 'info');
            navigate('/tasks');
        }
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative overflow-hidden">
            {/* Toast Notification System */}
            <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
                {toasts.map(t => (
                    <div key={t.id} className="bg-slate-900 dark:bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-[slideInRight_0.3s] pointer-events-auto min-w-[300px] border border-white/10">
                        <div className={`p-2 rounded-full ${t.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            <span className="material-symbols-outlined text-[20px]">{t.type === 'success' ? 'check_circle' : 'info'}</span>
                        </div>
                        <span className="text-sm font-bold flex-1">{t.message}</span>
                        <button onClick={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))} className="text-white/40 hover:text-white"><span className="material-symbols-outlined text-[18px]">close</span></button>
                    </div>
                ))}
            </div>

            <header className="px-8 py-6 bg-white dark:bg-[#1a2234] border-b border-border-light flex justify-between items-center flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Sales Overview</h1>
                    <p className="text-sm text-slate-500 font-medium">Performance monitoring for {selectedMonth} 2025</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsCalendarOpen(true)} 
                        className="flex items-center gap-2 text-sm font-bold border px-4 py-2.5 rounded-xl hover:bg-slate-50 bg-white dark:bg-slate-800 dark:border-slate-700 transition-all active:scale-95 group"
                    >
                        <span className="material-symbols-outlined text-[20px] text-primary group-hover:rotate-12 transition-transform">calendar_today</span> 
                        {selectedMonth} 2025
                    </button>
                    <button 
                        onClick={handleGenerateReport} 
                        disabled={isGenerating}
                        className={`bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-primary/20 transition-all flex items-center gap-2 ${isGenerating ? 'opacity-70 cursor-wait' : 'hover:scale-105 active:scale-95'}`}
                    >
                        {isGenerating ? (
                            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Generating...</>
                        ) : (
                            <><span className="material-symbols-outlined text-[18px]">file_download</span> Sales Report</>
                        )}
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 space-y-8">
                 {/* Top Level Metrics */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((m, i) => (
                        <div 
                            key={i} 
                            onClick={() => navigate(m.category === 'accounts' ? '/accounts' : '/pipeline')}
                            title={m.description}
                            className="bg-white dark:bg-surface-dark p-6 rounded-[2rem] border border-border-light dark:border-slate-800 shadow-sm flex items-start justify-between cursor-pointer hover:shadow-xl hover:border-primary/40 transition-all group relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{m.label}</p>
                                <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{m.value}</h3>
                                <div className={`flex items-center gap-1 mt-1 text-[10px] font-black ${m.isUp === true ? 'text-green-600' : m.isUp === false ? 'text-red-600' : 'text-slate-400'}`}>
                                    {m.isUp !== null && <span className="material-symbols-outlined text-[14px]">{m.isUp ? 'trending_up' : 'trending_down'}</span>}
                                    {m.trend} <span className="font-medium text-slate-300 ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className={`p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group-hover:bg-primary/5 transition-colors relative z-10 ${m.color}`}>
                                <span className="material-symbols-outlined text-[28px]">{m.icon}</span>
                            </div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mb-8 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                        </div>
                    ))}
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Pipeline Funnel Visualization */}
                    <div 
                        className={`lg:col-span-2 bg-white dark:bg-surface-dark rounded-[2.5rem] border dark:border-slate-800 p-8 shadow-sm transition-all relative overflow-hidden ${isPipelineExpanded ? 'ring-2 ring-primary/20 shadow-xl' : ''}`}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">analytics</span> 
                                    Pipeline Momentum
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 font-medium">Funnel health and conversion velocity across stages.</p>
                            </div>
                            <button 
                                onClick={() => setIsPipelineExpanded(!isPipelineExpanded)}
                                className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1 shadow-sm active:scale-95"
                            >
                                {isPipelineExpanded ? 'Show Less' : 'Expand Forecast'}
                                <span className="material-symbols-outlined text-[18px] transition-transform duration-300" style={{ transform: isPipelineExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-8">
                            <div className="flex items-end justify-between gap-4 h-40 px-6 relative">
                                {/* Horizontal Guideline */}
                                <div className="absolute left-0 right-0 top-1/2 border-t border-slate-50 dark:border-slate-800 pointer-events-none"></div>
                                {[
                                    { label: 'Leads', val: 85, color: 'bg-slate-100 dark:bg-slate-800', value: '42' },
                                    { label: 'Qualified', val: 65, color: 'bg-blue-100 dark:bg-blue-900/30', value: '28' },
                                    { label: 'Proposal', val: 45, color: 'bg-primary/20', value: '14' },
                                    { label: 'Win', val: 25, color: 'bg-green-100 dark:bg-green-900/30', value: '8' }
                                ].map(s => (
                                    <div key={s.label} className="flex-1 flex flex-col items-center gap-3 group relative z-10">
                                        <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-bold">
                                            {s.value} Units
                                        </div>
                                        <div className={`w-full ${s.color} rounded-2xl transition-all duration-700 group-hover:scale-105 shadow-sm overflow-hidden border border-transparent group-hover:border-primary/20`} style={{ height: `${s.val}%` }}>
                                            <div className="w-full h-full bg-primary/10 animate-[shimmer_2s_infinite]"></div>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block leading-none">{s.label}</span>
                                            <span className="text-xs font-black text-slate-700 dark:text-slate-300">{s.val}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {isPipelineExpanded && (
                                <div className="pt-8 border-t border-slate-50 dark:border-slate-800 grid grid-cols-3 gap-6 animate-[fadeIn_0.5s]">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl text-center border border-slate-100 dark:border-slate-700/50">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Deal Cycle</p>
                                        <p className="text-2xl font-black text-slate-800 dark:text-white">14.2 Days</p>
                                        <span className="text-[9px] text-green-600 font-bold uppercase">-2.1d improvement</span>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl text-center border border-slate-100 dark:border-slate-700/50">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Velocity</p>
                                        <p className="text-2xl font-black text-primary">Stable</p>
                                        <span className="text-[9px] text-slate-400 font-bold uppercase">Trending Healthy</span>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl text-center border border-slate-100 dark:border-slate-700/50">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Gap to Target</p>
                                        <p className="text-2xl font-black text-red-600">₹ 4.2 L</p>
                                        <span className="text-[9px] text-slate-400 font-bold uppercase">Q4 Shortfall</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Attention Tasks List */}
                    <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] border dark:border-slate-800 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black flex items-center gap-3">
                                <span className="material-symbols-outlined text-red-500">notification_important</span> 
                                High Priority
                            </h3>
                            <span className="text-[10px] font-black px-2 py-1 bg-red-100 text-red-700 rounded-full">{urgentTasks.length} Alerts</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            {urgentTasks.map(t => (
                                <div key={t.id} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors leading-tight">{t.title}</h4>
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${t.type === 'Urgent' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>{t.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{t.due}</p>
                                    </div>
                                </div>
                            ))}
                            <button 
                                onClick={handleQuickAddTask} 
                                className="mt-4 w-full py-5 border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[20px]">add_task</span>
                                Add Quick Interaction
                            </button>
                        </div>
                    </div>
                 </div>
            </main>

            {/* Calendar/Month Selector Modal */}
            {isCalendarOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s]">
                    <div className="bg-white dark:bg-[#1a2234] w-full max-w-sm rounded-[3rem] shadow-2xl p-10 border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black">Select Billing Period</h3>
                            <button onClick={() => setIsCalendarOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-all">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                                <button 
                                    key={m} 
                                    onClick={() => { setSelectedMonth(m); setIsCalendarOpen(false); addToast(`Overview updated for ${m} 2025`, 'info'); }}
                                    className={`py-4 rounded-2xl font-black text-xs transition-all tracking-widest uppercase ${m === selectedMonth ? 'bg-primary text-white shadow-xl scale-105' : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                        <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-800 text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Financial Year 2025-26</p>
                            <button onClick={() => setIsCalendarOpen(false)} className="w-full py-4 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Apply Selection</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Overview;