import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const menuItems = [
        { icon: "dashboard", label: "Overview", path: "/" },
        { icon: "business_center", label: "Accounts", path: "/accounts" },
        { icon: "filter_alt", label: "Pipeline & Funnel", path: "/pipeline" },
        { icon: "request_quote", label: "Quotation Mgmt", path: "/quotation" },
        { icon: "campaign", label: "Campaigns", path: "/campaigns" },
        { icon: "task_alt", label: "Task & Activity", path: "/tasks" },
        { icon: "school", label: "Sales Enablement", path: "/enablement" },
    ];

    return (
        <aside className="w-72 bg-white dark:bg-[#1a2234] border-r border-border-light dark:border-slate-800 flex flex-col flex-shrink-0 h-full transition-all z-20 hidden lg:flex">
            <div className="p-6 pb-2">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-primary/10 rounded-lg p-2 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined" style={{fontSize: "28px"}}>theaters</span>
                    </div>
                    <div>
                        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">QUBE Sales</h1>
                        <p className="text-slate-custom text-xs font-medium">Cinema Advertising</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-180px)] pr-2">
                    <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2">Menu</p>
                    {menuItems.map((item) => (
                        <Link 
                            key={item.path}
                            to={item.path} 
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                                isActive(item.path) 
                                ? "bg-primary/10 text-primary font-semibold" 
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            }`}
                        >
                            <span className={`material-symbols-outlined ${isActive(item.path) ? "fill-1" : ""}`}>{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">send_and_archive</span>
                            <span className="text-sm font-medium">Marketing and Outreach</span>
                        </a>
                        <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">analytics</span>
                            <span className="text-sm font-medium">Analytics</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-auto p-4 border-t border-border-light dark:border-slate-800">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-sm" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDJrlXlGT7f7RLN7SIW7cijADhtdEsiitS5Yr2Ap6z_lchZOBSh0OjWLOqZrWSJyFnWbsDrt6u7cc-5eu_gQyW3IPihIJOuovZTTm-5OYwbce1DkvkE32i0c0Zj38riHM-XpNTMWl752oS0_kQycSIWcoDqwxzT0_X_GPeqKVNxG6hZAWbcUc14HP6UgDfFJptnYROlUwt0ChK53k2LAgoptkOYpVTjrhixA1PxOT02dD4sTm863qYaXfNdZ-qczWCf4DTMUCbyG2L')"}}></div>
                    <div className="flex flex-col overflow-hidden">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Arjun Mehta</p>
                        <p className="text-xs text-slate-500 truncate">Regional Sales Head</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;