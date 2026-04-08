import { ChevronLeft, Plus, X, Zap, Loader2, Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScreenHeaderProps {
    name: string;
    totalHotspots: number;
    isAdding: boolean;
    isScanning: boolean;
    onBack: () => void;
    onToggleAdding: () => void;
    onAiScan: () => void;
    onEditName: () => void;
    onDeleteScreen: () => void;
}

const ScreenHeader = ({ 
    name, totalHotspots, isAdding, isScanning, onBack, onToggleAdding, onAiScan, onEditName, onDeleteScreen 
}: ScreenHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
                <button 
                    onClick={onBack}
                    className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest transition-all"
                >
                    <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                    Back to Overview
                </button>
                
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                            {name}
                        </h1>
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={onEditName}
                                className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                                title="Rename Screen"
                            >
                                <Edit3 size={18} />
                            </button>
                            <button 
                                onClick={onDeleteScreen}
                                className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                title="Delete Screen"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-tighter shadow-sm border border-slate-200">
                            Interface Mockup
                        </div>
                    </div>
                    <p className="text-slate-400 font-bold tracking-widest text-[10px] uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {totalHotspots} Annotations
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button 
                    onClick={onAiScan}
                    disabled={isScanning}
                    variant="outline"
                    className="h-12 px-6 rounded-2xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 flex items-center gap-2 group shadow-sm bg-white"
                >
                    {isScanning ? (
                        <Loader2 size={20} className="animate-spin text-blue-500" />
                    ) : (
                        <Zap size={20} className="text-blue-500" />
                    )}
                    {isScanning ? "AI Analyzing..." : "AI Intelligence"}
                </Button>

                <Button 
                    onClick={onToggleAdding}
                    variant={isAdding ? "destructive" : "default"}
                    className={`h-12 px-6 rounded-2xl font-bold shadow-sm flex items-center gap-2 transition-all active:scale-95 ${
                        !isAdding ? "bg-slate-900 hover:bg-black text-white" : ""
                    }`}
                >
                    {isAdding ? <X size={20} /> : <Plus size={20} />}
                    {isAdding ? "Cancel Annotation" : "Add Annotation"}
                </Button>
            </div>
        </div>
    );
};

export default ScreenHeader;
