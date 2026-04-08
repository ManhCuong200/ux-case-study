import { Layers, Search, CheckCircle2 } from "lucide-react";

interface ProjectStatsProps {
    screensCount: number;
    hotspotsCount: number;
}

const ProjectStats = ({ screensCount, hotspotsCount }: ProjectStatsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-slate-200 transition-all">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                    <Layers size={22} />
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-900">{screensCount}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Interfaces</div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-slate-200 transition-all">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Search size={22} />
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-900">{hotspotsCount}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Observations</div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-slate-200 transition-all">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <CheckCircle2 size={22} />
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-900">Active</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Research Status</div>
                </div>
            </div>
        </div>
    );
};

export default ProjectStats;
