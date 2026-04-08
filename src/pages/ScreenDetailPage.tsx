import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import screensApi from "@/api/screens";
import hotspotsApi from "@/api/hotspots";
import aiApi from "@/api/ai";
import { toast } from "sonner";

// Refactored Components
import ScreenHeader from "@/components/screen-detail/ScreenHeader";
import ScreenImageViewer from "@/components/screen-detail/ScreenImageViewer";
import ResearchLog from "@/components/screen-detail/ResearchLog";
import AddHotspotModal from "@/components/screen-detail/AddHotspotModal";

const ScreenDetailPage = () => {
    const { id, screenId } = useParams();
    const navigate = useNavigate();
    const [screen, setScreen] = useState<any>(null);
    const [hotspots, setHotspots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isScanning, setIsScanning] = useState(false);
    
    // Add Hotspot state
    const [isAdding, setIsAdding] = useState(false);
    const [newPos, setNewPos] = useState({ x: 0, y: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [editingHotspot, setEditingHotspot] = useState<any>(null);
    
    const imageRef = useRef<HTMLImageElement>(null);

    const fetchData = async () => {
        if (!screenId) return;
        try {
            setLoading(true);
            console.log("Fetching blueprint with ID:", screenId);
            const res = await screensApi.getById(parseInt(screenId as string));
            
            if (!res.data) {
                toast.error("Blueprint not found in Command Center");
                navigate(`/apps/${id}`);
                return;
            }

            setScreen(res.data);
            setHotspots(res.data.hotspots || []);
        } catch (error: any) {
            console.error("Screen retrieval failure details:", {
                url: error.config?.url,
                status: error.response?.status,
                message: error.message,
                data: error.response?.data
            });
            const message = error.response?.data?.message || "Blueprint link disrupted - 404 Path Error";
            toast.error(message);
            navigate(`/apps/${id}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [screenId]);

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        
        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setNewPos({ x, y });
        setIsModalOpen(true);
    };

    const handleEditClick = (hotspot: any) => {
        setEditingHotspot(hotspot);
        setTitle(hotspot.title);
        setContent(hotspot.content);
        setNewPos({ x: hotspot.pos_x, y: hotspot.pos_y });
        setIsModalOpen(true);
    };

    const handleAddHotspot = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!screenId || !title || !content) return;

        try {
            setSubmitting(true);
            const payload = {
                title,
                content,
                pos_x: newPos.x,
                pos_y: newPos.y,
                type: "observation",
                screenId: parseInt(screenId)
            };
            
            if (editingHotspot) {
                const res = await hotspotsApi.update(editingHotspot.id, { title, content });
                setHotspots(hotspots.map(h => h.id === editingHotspot.id ? res.data : h));
                toast.success("Observation updated!");
            } else {
                const res = await hotspotsApi.create(payload);
                setHotspots([...hotspots, res.data]);
                toast.success("Critical observation mapped!");
            }
            
            // Reset
            setIsModalOpen(false);
            setTitle("");
            setContent("");
            setEditingHotspot(null);
        } catch (error) {
            toast.error(editingHotspot ? "Update failed" : "Mapping failed");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteHotspot = async (hotspotId: number) => {
        try {
            await hotspotsApi.delete(hotspotId);
            setHotspots(hotspots.filter(h => h.id !== hotspotId));
            toast.success("Hotspot removed");
        } catch (error) {
            toast.error("Removal failed");
        }
    };

    const handleAiScan = async () => {
        if (!screenId) return;
        try {
            setIsScanning(true);
            toast.info("AI is reviewing your blueprint...");
            
            const res = await aiApi.analyzeScreen(parseInt(screenId));
            const aiHotspots = res.data;
            
            if (!aiHotspots || aiHotspots.length === 0) {
                toast.error("AI couldn't find any issues this time.");
                return;
            }

            // Map and save to DB
            const formatted = aiHotspots.map((h: any) => ({
                ...h,
                screenId: parseInt(screenId)
            }));
            
            const saved = await hotspotsApi.createBulk(formatted);
            setHotspots([...hotspots, ...saved.data]);
            toast.success(`AI successfully identified ${aiHotspots.length} UX issues!`);
        } catch (error: any) {
            console.error("AI DISRUPTION:", error);
            const msg = error.response?.data?.message || "AI Command Center unresponsive.";
            toast.error(msg);
        } finally {
            setIsScanning(false);
        }
    };

    const handleDeleteScreen = async () => {
        if (!screenId || !window.confirm("Are you sure you want to permanently delete this blueprint?")) return;
        try {
            await screensApi.delete(parseInt(screenId));
            toast.success("Blueprint purged from system.");
            navigate(`/apps/${id}`);
        } catch (error) {
            toast.error("Deletion failed.");
        }
    };

    const handleEditScreenName = async () => {
        const newName = window.prompt("Enter new blueprint name:", screen?.name);
        if (!newName || newName === screen?.name) return;
        try {
            const res = await screensApi.update(parseInt(screenId as string), { name: newName });
            setScreen(res.data);
            toast.success("Blueprint identity updated.");
        } catch (error) {
            toast.error("Rename failed.");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-slate-400 font-bold tracking-widest text-xs uppercase animate-pulse">
                    Parsing Blueprint Details...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <ScreenHeader 
                name={screen?.name}
                totalHotspots={hotspots.length}
                isAdding={isAdding}
                isScanning={isScanning}
                onBack={() => navigate(`/apps/${id}`)}
                onToggleAdding={() => setIsAdding(!isAdding)}
                onAiScan={handleAiScan}
                onEditName={handleEditScreenName}
                onDeleteScreen={handleDeleteScreen}
            />

            <div className="flex flex-col lg:flex-row gap-8">
                <ScreenImageViewer 
                    ref={imageRef}
                    imageUrl={screen?.image_url}
                    screenName={screen?.name}
                    isAdding={isAdding}
                    hotspots={hotspots}
                    onImageClick={handleImageClick}
                />

                <ResearchLog 
                    hotspots={hotspots}
                    onDelete={handleDeleteHotspot}
                    onEdit={handleEditClick}
                />
            </div>

            <AddHotspotModal 
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingHotspot(null);
                    setTitle("");
                    setContent("");
                }}
                onSubmit={handleAddHotspot}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                submitting={submitting}
                pos={newPos}
            />
        </div>
    );
};

export default ScreenDetailPage;
