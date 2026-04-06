import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectEmptyStateProps {
    onUploadClick: () => void;
}

const ProjectEmptyState = ({ onUploadClick }: ProjectEmptyStateProps) => {
    return (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-200">
                <ImageIcon size={40} />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">No blueprints available yet</h3>
                <p className="text-slate-500 max-w-xs mx-auto font-medium">
                    Upload your first screen mockup to begin identifying user flows and pain points.
                </p>
            </div>
            <Button 
                onClick={onUploadClick}
                variant="outline"
                className="mt-4 rounded-xl border-slate-200 font-bold"
            >
                Upload Initial Screen
            </Button>
        </div>
    );
};

export default ProjectEmptyState;
