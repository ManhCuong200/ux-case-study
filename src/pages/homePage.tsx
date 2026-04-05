import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import appsApi from "@/api/apps";
import { createAppSchema } from "@/utils/schema";
import type { App, CreateAppDto } from "@/shared/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Globe, Smartphone, Tablet, Loader2, X, Box } from "lucide-react";

const HomePage = () => {
    const [apps, setApps] = useState<App[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateAppDto>({
        resolver: zodResolver(createAppSchema)
    });

    const fetchApps = async () => {
        setLoading(true);
        try {
            const res = await appsApi.getAll();
            setApps(res.data);
        } catch (err) {
            console.error("Failed to fetch apps", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const onSubmit = async (data: CreateAppDto) => {
        setCreating(true);
        try {
            await appsApi.create(data);
            setIsModalOpen(false);
            reset();
            fetchApps();
        } catch (err) {
            console.error("Failed to create app", err);
        } finally {
            setCreating(false);
        }
    };

    const getIcon = (description: string = "") => {
        const desc = description.toLowerCase();
        if (desc.includes("web")) return <Globe size={24} className="text-blue-500" />;
        if (desc.includes("tablet")) return <Tablet size={24} className="text-purple-500" />;
        return <Smartphone size={24} className="text-emerald-500" />;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 relative">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
                        Application Library
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Manage and explore your UX case study assets.
                    </p>
                </div>
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 shadow-md transition-all active:scale-95 group"
                >
                    <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    New Application
                </Button>
            </div>

            {/* Application Grid */}
            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
            ) : apps.length === 0 ? (
                <Card className="border-dashed border-2 bg-slate-50/50">
                    <CardContent className="h-64 flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-white rounded-2xl shadow-sm cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            <Plus size={32} className="text-blue-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold text-slate-900">No applications yet</p>
                            <p className="text-slate-500">Create your first application to start gathering research.</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apps.map((app) => (
                        <Card key={app.id} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-slate-100 overflow-hidden cursor-pointer bg-white">
                            <div className="h-40 bg-slate-100 relative overflow-hidden">
                                {app.logo_url ? (
                                    <img src={app.logo_url} alt={app.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                                        <div className="p-4 bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/50 text-blue-600 group-hover:scale-110 transition-transform duration-500">
                                            {getIcon(app.description)}
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300" />
                            </div>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {app.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 font-medium">
                                    {app.description || "Research workspace for architectural UX study."}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}

            {/* Create App Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
                        onClick={() => setIsModalOpen(false)}
                    />
                    
                    {/* Modal Content */}
                    <Card className="relative w-full max-w-[500px] shadow-2xl border-slate-100 bg-white animate-in zoom-in-95 duration-300 overflow-hidden">
                        <div className="h-1.5 bg-blue-600 w-full" />
                        <CardContent className="pt-8 pb-10 px-8">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8 flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <Box size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">Create Workspace</h2>
                                    <p className="text-sm font-medium text-slate-500">Initialize a new research application</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                                        Application Name
                                    </Label>
                                    <Input 
                                        {...register("name")}
                                        placeholder="e.g. HealthPro 2.0" 
                                        className={`h-11 ${errors.name ? 'border-red-500' : ''}`}
                                    />
                                    {errors.name && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.name.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                                        Logo URL (Optional)
                                    </Label>
                                    <Input 
                                        {...register("logo_url")}
                                        placeholder="https://..." 
                                        className={`h-11 ${errors.logo_url ? 'border-red-500' : ''}`}
                                    />
                                    {errors.logo_url && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.logo_url.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                                        Workspace Description
                                    </Label>
                                    <Input 
                                        {...register("description")}
                                        placeholder="Describe the research goals..." 
                                        className={`h-11 ${errors.description ? 'border-red-500' : ''}`}
                                    />
                                    {errors.description && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.description.message}</p>}
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 h-11 font-semibold"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit"
                                        disabled={creating}
                                        className="flex-[2] h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                                    >
                                        {creating ? <Loader2 className="animate-spin" /> : "Initialize Workspace"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default HomePage;
