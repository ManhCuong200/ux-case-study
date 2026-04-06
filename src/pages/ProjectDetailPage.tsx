import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import appsApi from "@/api/apps";
import screensApi from "@/api/screens";
import { toast } from "sonner";

// Refactored Components
import ProjectHeader from "@/components/project-detail/ProjectHeader";
import ProjectStats from "@/components/project-detail/ProjectStats";
import ScreenCard from "@/components/project-detail/ScreenCard";
import ProjectEmptyState from "@/components/project-detail/ProjectEmptyState";

const ProjectDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [app, setApp] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchAppDetail = async () => {
        if (!id) return;
        try {
            setLoading(true);
            const res = await appsApi.getById(parseInt(id));
            setApp(res.data);
        } catch (error) {
            toast.error("Process data retrieval failed");
            navigate("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppDetail();
    }, [id]);

    const handleUploadScreen = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !id) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name.replace(/\.[^/.]+$/, ""));
        formData.append("appId", id);

        try {
            setUploading(true);
            await screensApi.upload(formData);
            toast.success("New screen blueprint added!");
            fetchAppDetail();
        } catch (error) {
            toast.error("Blueprint upload failed");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-slate-400 font-bold tracking-widest text-xs uppercase animate-pulse">
                    Decrypting Project Data...
                </p>
            </div>
        );
    }

    const totalHotspots = app?.screens?.reduce((acc: number, s: any) => acc + (s.hotspots?.length || 0), 0) || 0;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <ProjectHeader
                name={app?.name}
                description={app?.description}
                uploading={uploading}
                onBack={() => navigate("/dashboard")}
                onUploadClick={() => fileInputRef.current?.click()}
            />

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUploadScreen}
                className="hidden"
                accept="image/*"
            />

            <ProjectStats
                screensCount={app?.screens?.length || 0}
                hotspotsCount={totalHotspots}
            />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        System Blueprints
                        <span className="text-slate-300 font-medium">({app?.screens?.length || 0})</span>
                    </h2>
                </div>

                {app?.screens?.length === 0 ? (
                    <ProjectEmptyState onUploadClick={() => fileInputRef.current?.click()} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {app?.screens?.map((screen: any) => (
                            <ScreenCard
                                key={screen.id}
                                screen={screen}
                                onClick={() => navigate(`/apps/${app.id}/screens/${screen.id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailPage;
