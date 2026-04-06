import { Monitor, Sparkles, Layout } from "lucide-react";

interface ProjectStatsProps {
    screensCount: number;
    hotspotsCount: number;
}

const ProjectStats = ({ screensCount, hotspotsCount }: ProjectStatsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Monitor size={22} />
                </div>
                <div>
                    <div className="text-2xl font-black text-slate-900">{screensCount}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Defined Screens</div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <Sparkles size={22} />
                </div>
                <div>
                    <div className="text-2xl font-black text-slate-900">{hotspotsCount}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pain Points Found</div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <Layout size={22} />
                </div>
                <div>
                    <div className="text-2xl font-black text-slate-900">Finalized</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Phase</div>
                </div>
            </div>
        </div>
    );
};

export default ProjectStats;
