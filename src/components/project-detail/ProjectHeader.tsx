import { ChevronLeft, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
    name: string;
    description: string;
    uploading: boolean;
    onBack: () => void;
    onUploadClick: () => void;
}

const ProjectHeader = ({ name, description, uploading, onBack, onUploadClick }: ProjectHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-slate-400 hover:text-blue-500 font-bold text-xs uppercase tracking-widest transition-all"
                >
                    <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                    Back to Command Center
                </button>

                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            {name}
                        </h1>
                        <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border border-blue-200">
                            Active Case Study
                        </div>
                    </div>
                    <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
                        {description || "Analyze and optimize the UX flow for this research project."}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    onClick={onUploadClick}
                    disabled={uploading}
                    className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 flex items-center gap-2 transition-all active:scale-95"
                >
                    {uploading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Plus size={20} />
                    )}
                    {uploading ? "Uploading..." : "Add Blueprint"}
                </Button>
            </div>
        </div>
    );
};

export default ProjectHeader;
