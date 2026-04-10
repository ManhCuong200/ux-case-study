import type { User } from "@/shared/types";
import { User as UserIcon, Mail, Shield, Camera, LogOut, Edit2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

interface UserProfileProps {
    userData: User | null;
    fullName: string;
    onFullNameChange: (val: string) => void;
    isEditing: boolean;
    saving: boolean;
    onEditToggle: () => void;
    onLogout: () => void;
    onSave: () => Promise<void>;
    onAvatarUpload: (file: File) => Promise<void>;
}

const UserProfile = ({ 
    userData, 
    fullName, 
    onFullNameChange, 
    isEditing, 
    saving, 
    onEditToggle, 
    onLogout, 
    onSave, 
    onAvatarUpload 
}: UserProfileProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!userData) return null;

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onAvatarUpload(file);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Avatar Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-100 border border-slate-50">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-blue-200 overflow-hidden border-4 border-white">
                        {userData.avatar ? (
                            <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover shadow-inner" />
                        ) : (
                            userData.fullName?.charAt(0).toUpperCase()
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                    />
                    <button 
                        onClick={handleCameraClick}
                        className="absolute -bottom-2 -right-2 p-3 bg-white hover:bg-slate-50 text-blue-600 rounded-2xl shadow-lg border border-slate-100 transition-all active:scale-95 group-hover:rotate-12"
                    >
                        <Camera size={20} />
                    </button>
                </div>
                
                <div className="text-center md:text-left space-y-2 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            {userData.fullName}
                        </h1>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100 w-fit mx-auto md:mx-0">
                            Researcher
                        </span>
                    </div>
                    <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
                        <Mail size={16} />
                        {userData.email}
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button 
                        onClick={onEditToggle}
                        variant={isEditing ? "ghost" : "outline"}
                        className="rounded-2xl h-12 px-6 font-bold flex items-center gap-2"
                    >
                        {isEditing ? "Cancel" : <><Edit2 size={18} /> Edit Profile</>}
                    </Button>
                    {!isEditing && (
                        <Button 
                            onClick={onLogout}
                            className="rounded-2xl h-12 px-6 bg-red-50 text-red-600 hover:bg-red-100 border-none font-bold shadow-none"
                        >
                            <LogOut size={18} />
                        </Button>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Security & Info (Only if editing) */}
                <div className={`lg:col-span-2 space-y-8 ${!isEditing && 'opacity-60 pointer-events-none'}`}>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                            <UserIcon size={20} className="text-blue-600" />
                            Personal Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-xs uppercase font-bold tracking-widest text-slate-400 ml-1">Full Name</Label>
                                <Input 
                                    value={fullName}
                                    onChange={(e) => onFullNameChange(e.target.value)}
                                    placeholder="Enter your name"
                                    className="h-12 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs uppercase font-bold tracking-widest text-slate-400 ml-1">Email (Read-only)</Label>
                                <Input 
                                    value={userData.email}
                                    disabled
                                    className="h-12 rounded-xl bg-slate-100 border-transparent cursor-not-allowed opacity-50 font-medium"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="pt-4">
                                <Button 
                                    onClick={onSave}
                                    disabled={saving || !fullName}
                                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    {saving ? "Saving..." : (
                                        <>
                                            <CheckCircle2 size={20} />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Summary / Stats */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group border border-slate-700/50">
                        <div className="relative z-10 space-y-4">
                            <Shield className="text-blue-400 opacity-50 group-hover:scale-110 transition-transform" size={40} />
                            <div className="space-y-1">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Account Status</p>
                                <h4 className="text-xl font-bold tracking-tight">Verified Professional</h4>
                            </div>
                            <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center">
                                <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Case Studies</span>
                                <span className="text-2xl font-bold text-blue-400">12</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
                    </div>

                    <div className="bg-slate-50 p-7 rounded-[2rem] border border-slate-200">
                        <p className="text-slate-500 text-sm font-medium leading-relaxed italic opacity-80 decoration-blue-500/20 underline underline-offset-8">
                            "As a researcher, you are identifying critical UX flaws that help businesses grow."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
