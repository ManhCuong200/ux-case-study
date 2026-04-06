import { Sparkles, Info, Trash2 } from "lucide-react";

interface ResearchLogProps {
    hotspots: any[];
    onDelete: (id: number) => void;
}

const ResearchLog = ({ hotspots, onDelete }: ResearchLogProps) => {
    return (
        <div className="w-full lg:w-96 space-y-6">
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                        <Info size={18} />
                    </div>
                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Research Log</h3>
                </div>
                
                <div className="space-y-4">
                    {hotspots.length === 0 ? (
                        <div className="text-center py-12 space-y-3">
                            <div className="text-slate-200">
                                <Sparkles size={48} className="mx-auto" />
                            </div>
                            <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase">No observations mapped</p>
                        </div>
                    ) : (
                        hotspots.map((h, i) => (
                            <div key={h.id} className="group p-4 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-blue-100 transition-all duration-500 rounded-2xl border border-transparent hover:border-blue-100">
                                <div className="flex gap-4 items-start">
                                    <div className="w-6 h-6 shrink-0 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[10px] font-black">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-bold text-slate-900 text-sm">{h.title}</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{h.content}</p>
                                    </div>
                                    <button 
                                        onClick={() => onDelete(h.id)}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResearchLog;
