import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appsApi from "@/api/apps";
import Dashboard from "@/components/dashboard/Dashboard";
import CreateAppModal from "@/components/dashboard/CreateAppModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import type { App } from "@/shared/types";
import { toast } from "sonner";

const DashboardPage = () => {
    // List/Loading State
    const [apps, setApps] = useState<App[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
    const [editingApp, setEditingApp] = useState<App | null>(null);
    const navigate = useNavigate();

    // Form State
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
        } catch {
            toast.error("Failed to fetch research projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    // Handlers
    const handleFileChange = (file: File | null) => {
        if (file) {
            setThumbnail(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setThumbnail(null);
            setPreview(null);
        }
    };

    const handleEditAppClick = (app: App) => {
        setEditingApp(app);
        setName(app.name);
        setDescription(app.description || "");
        setPreview(app.logo_url || null);
        setIsModalOpen(true);
    };

    const handleCreateApp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingApp) {
                const res = await appsApi.update(editingApp.id, { name, description });
                setApps(apps.map(a => a.id === editingApp.id ? res.data : a));
                toast.success("Project updated successfully!");
            } else {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("description", description);
                if (thumbnail) {
                    formData.append("thumbnail", thumbnail);
                }

                const res = await appsApi.create(formData);
                toast.success("New research project launched!");
                setApps([res.data, ...apps]);
            }
            
            // Reset Form & Close
            handleCloseModal();
        } catch {
            toast.error(editingApp ? "Failed to update project" : "Failed to create project");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setName("");
        setDescription("");
        setThumbnail(null);
        setPreview(null);
        setEditingApp(null);
    };

    const handleDeleteClick = (id: number) => {
        setSelectedAppId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteApp = async () => {
        if (!selectedAppId) return;
        try {
            await appsApi.delete(selectedAppId);
            toast.success("Research project deleted successfully");
            setApps(apps.filter((app) => app.id !== selectedAppId));
            setIsDeleteModalOpen(false);
            setSelectedAppId(null);
        } catch {
            toast.error("Failed to delete research project");
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
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditAppClick}
            />

            <CreateAppModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                preview={preview}
                loading={isSubmitting}
                isEditing={!!editingApp}
                onFileChange={handleFileChange}
                onSubmit={handleCreateApp}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteApp}
            />
        </>
    );
};

export default DashboardPage;
