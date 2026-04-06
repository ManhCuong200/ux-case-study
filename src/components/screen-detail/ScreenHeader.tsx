import { ChevronLeft, Plus, X, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScreenHeaderProps {
    name: string;
    totalHotspots: number;
    isAdding: boolean;
    isScanning: boolean;
    onBack: () => void;
    onToggleAdding: () => void;
    onAiScan: () => void;
}

const ScreenHeader = ({ 
    name, totalHotspots, isAdding, isScanning, onBack, onToggleAdding, onAiScan 
}: ScreenHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
                <button 
                    onClick={onBack}
                    className="group flex items-center gap-2 text-slate-400 hover:text-blue-500 font-bold text-xs uppercase tracking-widest transition-all"
                >
                    <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                    Back to System Overview
                </button>
                
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            {name}
                        </h1>
                        <div className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border border-indigo-200">
                            Dynamic Blueprint
                        </div>
                    </div>
                    <p className="text-slate-400 font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        {totalHotspots} Observations Identified
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button 
                    onClick={onAiScan}
                    disabled={isScanning}
                    variant="outline"
                    className="h-12 px-6 rounded-2xl font-bold border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all active:scale-95 flex items-center gap-2 group shadow-sm"
                >
                    {isScanning ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Sparkles size={20} className="transition-transform group-hover:rotate-12" />
                    )}
                    {isScanning ? "AI Analyzing..." : "AI Scan"}
                </Button>

                <Button 
                    onClick={onToggleAdding}
                    variant={isAdding ? "destructive" : "default"}
                    className={`h-12 px-6 rounded-2xl font-bold shadow-xl flex items-center gap-2 transition-all active:scale-95 ${
                        !isAdding ? "bg-blue-600 hover:bg-blue-700 shadow-blue-100" : ""
                    }`}
                >
                    {isAdding ? <X size={20} /> : <Plus size={20} />}
                    {isAdding ? "Cancel Analysis" : "Analyze UX"}
                </Button>
            </div>
        </div>
    );
};

export default ScreenHeader;
