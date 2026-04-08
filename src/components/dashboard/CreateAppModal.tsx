import { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Plus, Image as ImageIcon, X } from "lucide-react";

interface CreateAppModalProps {
    isOpen: boolean;
    onClose: () => void;
    name: string;
    setName: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    preview: string | null;
    loading: boolean;
    isEditing?: boolean;
    onFileChange: (file: File | null) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
}

const CreateAppModal = ({
    isOpen,
    onClose,
    name,
    setName,
    description,
    setDescription,
    preview,
    loading,
    isEditing,
    onFileChange,
    onSubmit
}: CreateAppModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(file);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
                <form onSubmit={onSubmit}>
                    <div className="p-8 space-y-6">
                        <DialogHeader className="space-y-3">
                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 mb-2">
                                <Plus size={24} />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-slate-900">
                                {isEditing ? "Edit Project Details" : "New Research Project"}
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium leading-relaxed">
                                {isEditing 
                                    ? "Update your project's name and description."
                                    : "Create a new project to start managing your UX research mockups."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-5 py-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs uppercase font-bold tracking-widest text-slate-400 ml-1">
                                    Process Name
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    placeholder="e.g. Shopee Checkout Optimization"
                                    className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs uppercase font-bold tracking-widest text-slate-400 ml-1">
                                    Brief Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                    placeholder="What are the goals of this research? Any specific flows to focus on?"
                                    className="min-h-[100px] rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 transition-all font-medium resize-none py-3"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs uppercase font-bold tracking-widest text-slate-400 ml-1">
                                    Project Thumbnail
                                </Label>
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden group/thumb ${
                                        preview ? 'border-blue-100 bg-slate-50' : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'
                                    }`}
                                >
                                    {preview ? (
                                        <>
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110 group-hover/thumb:brightness-90" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-black/20">
                                                <div className="bg-white/90 p-2 rounded-xl shadow-xl text-blue-600 scale-90 group-hover/thumb:scale-100 transition-transform">
                                                    <ImageIcon size={20} />
                                                </div>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={(e: React.MouseEvent) => { e.stopPropagation(); onFileChange(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                                                className="absolute top-3 right-3 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors z-10"
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-slate-400">
                                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-300">
                                                <ImageIcon size={28} />
                                            </div>
                                            <div className="text-center">
                                                <span className="text-xs font-bold block text-slate-500">Pick Branding Image</span>
                                                <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Max 5MB • PNG, JPG</span>
                                            </div>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleFileChangeLocal} 
                                        className="hidden" 
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="bg-slate-50 p-6 flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="rounded-xl font-bold text-slate-500 hover:bg-slate-200/50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || !name}
                            className="bg-slate-900 hover:bg-black text-white px-8 rounded-xl font-bold shadow-sm transition-all active:scale-95"
                        >
                            {loading ? "Processing..." : (isEditing ? "Save Changes" : "Create Project")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAppModal;
