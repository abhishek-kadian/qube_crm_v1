import React from 'react';

const Enablement = () => {
    return (
        <div className="flex flex-col h-full overflow-hidden w-full relative">
            <header className="sticky top-0 z-10 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                <div className="px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Sales Enablement Hub</h1>
                    </div>
                </div>
            </header>
                <main className="flex-1 overflow-y-auto p-6 pb-20 lg:pb-8">
                    <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                        <div className="flex-1">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Welcome back, Priya</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">Here are the latest updates for your upcoming pitches.</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400 bg-surface-light dark:bg-surface-dark py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-700">
                            <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <span className="material-symbols-outlined text-[18px]">trending_up</span>
                                94% Sales Goal
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-6 border border-blue-100 dark:border-slate-700 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none text-primary dark:text-blue-400">
                                    <span className="material-symbols-outlined text-[120px]">auto_awesome</span>
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                                            Pitch Perfect Recommendations
                                        </h3>
                                        <button className="text-xs font-semibold text-primary hover:underline">View All</button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="bg-white dark:bg-background-dark rounded-lg p-3 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
                                            <div className="h-24 bg-slate-100 dark:bg-slate-700 rounded-md mb-3 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAANaU4HnsBnhRFARqgRWaahZcafudM6JiWH6gWjyc6Y4K-bA082TPnX1CyhbDa3ELL6jDAOGnAgVI0fFcSiYK0DqrkKGBWkzfJi7aVxh7u67ZXLvxLOLrUV2RTlSV9IAepjT2O1WPiWeefTIY0fWeUtM-AwlVuTaNYOQOLSISw155IDY2tRrmjZ0rosHuoPoXo_O57CbgDL2u5fhfIqQbptCsCVexhxr0T5zR9s6Xo_nqzY9YXMgrX7EgU6AdyOsqVG-q7B-yaSA8e')"}}></div>
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight mb-1">Beverage Giant ROI Q3</h4>
                                        </div>
                                            <div className="bg-white dark:bg-background-dark rounded-lg p-3 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer">
                                            <div className="h-24 bg-slate-100 dark:bg-slate-700 rounded-md mb-3 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAItpnKFWD4vVw15dfhdDZptGvhiptX6jvEwATK2DXN9i10zqwVnRcDwAJof_0Fi_wk8NDGpGbnTTjI_i6AjJ6xWpXskRebESVXr5R48tbtOiUaqgqO_itvQd2-iSReN_M7QPU_CxOOke4sKvzkMZGIPlBvcn2dn5VHIhgIboL1fi1WEcDus0Bkz8Y3Uzax2TKbmAgbXYPXZ8nmNxDn_eI0MX1JgV3v3599EpkZfF7gH8SnoYU5kJJ0s8_DNgDL_oFiLrPz6c91V1wy')"}}></div>
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-tight mb-1">QUBE General Pitch v4</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="masonry-grid">
                                <div className="masonry-item group relative bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all duration-300">
                                    <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgUnVq08S758Hu-Jkj9Fv3xJDiPpM0JUORM94eBeWrLR9d4vUaKaoGCtRjY8ufWpgsQ73yXNLO_OS5crRDHzXM129R-bwK6h6puHuAAD22OlKV5vyGSrV1Uvt60SIipbl_TKLsNz_8CFxLUg5BwNT1dJiPPw_F7H87UAfvgxu_u-zijgkUs5KoQ3LEFmdgRkXILfGBQ0n_X4LIMCmRqtnBaSIdFN71rg8_oJS1FBXi-C-FjlTwcOtG16IcH1mzbeBTSCQXEvoS1V8c')"}}></div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">Cinema Advertising 101</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">The Big Screen Advantage</p>
                                    </div>
                                </div>
                                </div>
                        </div>
                        <div className="lg:col-span-4 space-y-6">
                                <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-700 p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-rose-500 text-[20px]">theater_comedy</span>
                                        Theater Insights
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-3 bg-slate-50 dark:bg-background-dark rounded-lg border border-slate-100 dark:border-slate-700/50">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Footfall Trend (MoM)</span>
                                            <span className="text-xs font-bold text-green-600 flex items-center">
                                                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12.5%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </div>
                    </div>
                </main>
        </div>
    );
};

export default Enablement;