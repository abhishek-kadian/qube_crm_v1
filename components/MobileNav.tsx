import React from 'react';
import { Link } from 'react-router-dom';

const MobileNav = () => {
     return (
         <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#1a2234] border-t border-border-light dark:border-slate-800 flex justify-around items-center z-50">
             <Link to="/" className="flex flex-col items-center text-slate-500 hover:text-primary p-2">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-[10px]">Overview</span>
             </Link>
             <Link to="/accounts" className="flex flex-col items-center text-slate-500 hover:text-primary p-2">
                <span className="material-symbols-outlined">business_center</span>
                <span className="text-[10px]">Accounts</span>
             </Link>
             <Link to="/pipeline" className="flex flex-col items-center text-slate-500 hover:text-primary p-2">
                <span className="material-symbols-outlined">filter_alt</span>
                <span className="text-[10px]">Pipeline</span>
             </Link>
             <Link to="/quotation" className="flex flex-col items-center text-slate-500 hover:text-primary p-2">
                <span className="material-symbols-outlined">request_quote</span>
                <span className="text-[10px]">Quotes</span>
             </Link>
             <Link to="/tasks" className="flex flex-col items-center text-slate-500 hover:text-primary p-2">
                <span className="material-symbols-outlined">task_alt</span>
                <span className="text-[10px]">Tasks</span>
             </Link>
         </div>
     )
}

export default MobileNav;