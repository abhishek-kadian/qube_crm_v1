import React, { useState, useMemo } from 'react';

interface Task {
    id: number;
    title: string;
    client: string;
    due: string;
    type: 'Urgent' | 'Call' | 'Meeting' | 'Review';
    completed: boolean;
}

const INITIAL_TASKS: Task[] = [
    { id: 1, title: "Review Proposal: PepsiCo", client: "PepsiCo India", due: "Today, 2 PM", type: "Urgent", completed: false },
    { id: 2, title: "Follow-up: Velocity Motors", client: "Velocity Motors", due: "Tomorrow, 10 AM", type: "Call", completed: false },
    { id: 3, title: "Screen Inventory Discussion", client: "PVR Cinemas", due: "Yesterday", type: "Urgent", completed: false },
];

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [search, setSearch] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<Task>>({ title: '', client: '', type: 'Call', due: 'Today' });

    const filteredTasks = useMemo(() => {
        return tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.client.toLowerCase().includes(search.toLowerCase()));
    }, [tasks, search]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            id: Date.now(),
            title: formData.title || 'Untitled Task',
            client: formData.client || 'General',
            due: formData.due || 'TBD',
            type: formData.type as any || 'Call',
            completed: false
        };
        setTasks([newTask, ...tasks]);
        setIsAddOpen(false);
        setFormData({ title: '', client: '', type: 'Call', due: 'Today' });
    };

    const handleScheduleFollowUp = () => {
        alert('Scheduling follow-up interaction...');
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-[#1a2234] border-b border-border-light">
                <div className="relative w-full max-w-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." className="w-full pl-10 h-10 border-none rounded-lg bg-slate-100 text-sm focus:ring-2 focus:ring-primary"/>
                </div>
            </header>
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-end mb-8">
                    <div><h1 className="text-3xl font-black">Tasks & Activity</h1><p className="text-slate-500 font-medium">Manage your daily priorities.</p></div>
                    <button onClick={() => setIsAddOpen(true)} className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"><span className="material-symbols-outlined">add</span> Add New Task</button>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-8 flex flex-col gap-6">
                        <div className="p-5 rounded-xl border border-red-200 bg-red-50 flex items-center justify-between">
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-red-500">warning</span>
                                <div><p className="font-bold text-red-900">High Risk Account Alert: PepsiCo</p><p className="text-sm text-red-700">Flagged for potential churn. Urgent action required.</p></div>
                            </div>
                            <button onClick={handleScheduleFollowUp} className="bg-white border border-red-200 px-4 py-1.5 rounded font-bold text-sm text-red-700 hover:bg-red-50 transition-all">Schedule Follow-up</button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {filteredTasks.map(task => (
                                <div key={task.id} className={`bg-white p-4 rounded-xl border shadow-sm transition-all group flex items-center justify-between ${task.completed ? 'opacity-60 grayscale' : 'hover:border-primary/40'}`}>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => toggleTask(task.id)} className={`transition-colors ${task.completed ? 'text-primary' : 'text-slate-300 hover:text-primary'}`}>
                                            <span className="material-symbols-outlined">{task.completed ? 'check_circle' : 'radio_button_unchecked'}</span>
                                        </button>
                                        <div className="flex flex-col">
                                            <p className={`font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</p>
                                            <p className="text-xs text-slate-500">{task.client} • {task.due}</p>
                                        </div>
                                    </div>
                                    {task.type === 'Urgent' && <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Urgent</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-4 bg-white p-6 rounded-xl border h-fit shadow-sm"><h3 className="font-bold mb-4">Calendar Snap</h3><p className="text-xs text-slate-500">Integration with Google Calendar fully active.</p></div>
                </div>
            </main>

            {isAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <form onSubmit={handleAddTask} className="bg-white dark:bg-[#1a2234] rounded-xl shadow-xl w-full max-w-md p-6 animate-[fadeIn_0.2s]">
                        <h3 className="text-lg font-bold mb-4">New Task</h3>
                        <div className="space-y-4">
                            <div><label className="text-xs font-bold text-slate-500">Task Title</label><input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-10 border border-slate-200 rounded p-3 text-sm"/></div>
                            <div><label className="text-xs font-bold text-slate-500">Client</label><input required value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full h-10 border border-slate-200 rounded p-3 text-sm"/></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-xs font-bold text-slate-500">Type</label><select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full h-10 border border-slate-200 rounded px-2 text-sm"><option>Call</option><option>Meeting</option><option>Review</option></select></div>
                                <div><label className="text-xs font-bold text-slate-500">Due</label><input value={formData.due} onChange={e => setFormData({...formData, due: e.target.value})} className="w-full h-10 border border-slate-200 rounded px-3 text-sm"/></div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 font-bold text-slate-500 text-sm hover:bg-slate-50 rounded transition-all">Cancel</button><button type="submit" className="bg-primary text-white px-4 py-2 font-bold text-sm rounded shadow hover:bg-primary-dark transition-all">Create Task</button></div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Tasks;