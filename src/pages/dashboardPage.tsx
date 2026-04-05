import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appsApi from "@/api/apps";
import Dashboard from "@/components/dashboard/Dashboard";
import CreateAppModal from "@/components/dashboard/CreateAppModal";
import { toast } from "sonner";

const DashboardPage = () => {
    // List/Loading State
    const [apps, setApps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Form State (Moved from Component to Page)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchApps = async () => {
        try {
            setLoading(true);
            const res = await appsApi.getAll();
            setApps(res.data);
        } catch (error) {
            toast.error("Failed to fetch research projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    // Handlers (Controller Logic)
    const handleFileChange = (file: File | null) => {
        if (file) {
            setThumbnail(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setThumbnail(null);
            setPreview(null);
        }
    };

    const handleCreateApp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }

            const res = await appsApi.create(formData);
            toast.success("New research project launched!");
            
            // Update UI
            setApps([res.data, ...apps]);
            
            // Reset Form & Close
            setName("");
            setDescription("");
            setThumbnail(null);
            setPreview(null);
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to create project");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAppClick = (id: number) => {
        navigate(`/apps/${id}`);
    };

    return (
        <>
            <Dashboard 
                apps={apps}
                loading={loading}
                onCreateClick={() => setIsModalOpen(true)}
                onAppClick={handleAppClick}
            />
            
            <CreateAppModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // Form Props
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                thumbnail={thumbnail}
                preview={preview}
                loading={isSubmitting}
                // Handler Props
                onFileChange={handleFileChange}
                onSubmit={handleCreateApp}
            />
        </>
    );
};

export default DashboardPage;
