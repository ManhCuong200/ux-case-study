import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import UserProfile from "@/components/profile/UserProfile";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import usersApi from "@/api/users";

const ProfilePage = () => {
    const { user, logout, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState("");
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    // Đồng bộ tên từ user sang state khi vào trang
    useEffect(() => {
        if (user) setFullName(user.fullName || "");
    }, [user]);

    const handleLogout = () => {
        logout();
        toast.info("Logged out successfully");
        navigate("/login");
    };

    const handleAvatarUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await usersApi.updateAvatar(formData);
            updateUser(res.data);
            toast.success("Avatar updated successfully!");
        } catch (error) {
            toast.error("Failed to upload avatar");
        }
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            const res = await usersApi.updateProfile({ fullName });
            updateUser(res.data);
            toast.success("Profile updated!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <UserProfile 
            userData={user}
            fullName={fullName}
            onFullNameChange={setFullName}
            isEditing={isEditing}
            saving={saving}
            onEditToggle={() => setIsEditing(!isEditing)}
            onLogout={handleLogout}
            onSave={handleSaveProfile}
            onAvatarUpload={handleAvatarUpload}
        />
    );
};

export default ProfilePage;
