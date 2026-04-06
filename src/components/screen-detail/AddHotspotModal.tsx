import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface AddHotspotModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    title: string;
    setTitle: (val: string) => void;
    content: string;
    setContent: (val: string) => void;
    submitting: boolean;
    pos: { x: number, y: number };
}

const AddHotspotModal = ({ 
    isOpen, onClose, onSubmit, title, setTitle, content, setContent, submitting, pos 
}: AddHotspotModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] bg-white rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
                <form onSubmit={onSubmit}>
                    <div className="p-8 space-y-6">
                        <DialogHeader className="space-y-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                                <Sparkles size={24} />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-slate-900">
                                Map Observation
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium leading-relaxed">
                                Identify a pain point, success, or observation at coordinates ({Math.round(pos.x)}%, {Math.round(pos.y)}%).
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs uppercase font-bold tracking-widest text-slate-400 ml-1">
                                    Highlight Title
                                </Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Broken flow, confusing label"
                                    className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-xs uppercase font-bold tracking-widest text-slate-400 ml-1">
                                    Analysis Detail
                                </Label>
                                <Textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Describe the UX implication here..."
                                    className="min-h-[100px] rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 transition-all font-medium resize-none"
                                    required
                                />
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
                            disabled={submitting || !title || !content}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
                        >
                            {submitting ? "Mapping..." : "Add to Log"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddHotspotModal;
