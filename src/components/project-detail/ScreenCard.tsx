import type { Screen } from "@/shared/types";
import { Sparkles, Edit3, Trash2, ArrowRight } from "lucide-react";

interface ScreenCardProps {
    screen: Screen;
    onClick: () => void;
}

const ScreenCard = ({ screen, onClick }: ScreenCardProps) => {
    return (
        <div 
            className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 cursor-pointer"
            onClick={onClick}
        >
            <div className="relative h-64 bg-slate-50 overflow-hidden">
                <img 
                    src={screen.image_url} 
                    alt={screen.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500" />
                <div className="absolute top-4 right-4 flex gap-2 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="h-9 w-9 bg-white/90 backdrop-blur shadow-lg rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                        <Edit3 size={16} />
                    </button>
                    <button className="h-9 w-9 bg-white/90 backdrop-blur shadow-lg rounded-xl flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={16} />
                    </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center justify-between group-hover:shadow-blue-200 transition-all">
                        <div className="space-y-0.5">
                            <h4 className="font-bold text-slate-900 line-clamp-1">{screen.name}</h4>
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1">
                                <Sparkles size={10} />
                                {screen.hotspots?.length || 0} Critical Points
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScreenCard;
