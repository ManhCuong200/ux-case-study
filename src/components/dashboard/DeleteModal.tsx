import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteModal = ({ isOpen, onClose, onConfirm }: DeleteModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6 border-none shadow-2xl animate-in zoom-in-95 duration-200">
                <DialogHeader className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                        <AlertTriangle size={32} />
                    </div>
                    <div className="text-center space-y-2">
                        <DialogTitle className="text-2xl font-bold text-slate-900">Delete Project?</DialogTitle>
                        <DialogDescription className="text-slate-500 font-medium px-4">
                            Are you sure you want to delete this research project? This action cannot be undone and all associated hotspots will be lost.
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <DialogFooter className="sm:justify-center gap-3 mt-6">
                    <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={onClose}
                        className="h-12 px-6 rounded-xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-95 flex-1 max-w-[140px]"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="button" 
                        onClick={onConfirm}
                        className="h-12 px-6 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-100 transition-all active:scale-95 flex items-center gap-2 flex-1 max-w-[140px] group"
                    >
                        <Trash2 size={18} className="group-hover:shake transition-transform" />
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;
