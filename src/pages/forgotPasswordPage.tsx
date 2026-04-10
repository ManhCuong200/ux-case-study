import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "@/api/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import ForgotPassword from "@/components/auth/ForgotPassword";

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password, 3: Success
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authApi.forgotPassword(email);
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (error: unknown) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authApi.resetPassword({ email, otp, password });
            toast.success("Password changed successfully!");
            setStep(3);
        } catch (error: unknown) {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err.response?.data?.message || "Invalid OTP or failed to reset");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ForgotPassword
            step={step}
            setStep={setStep}
            email={email}
            setEmail={setEmail}
            otp={otp}
            setOtp={setOtp}
            password={password}
            setPassword={setPassword}
            loading={loading}
            onSendOTP={handleSendOTP}
            onResetPassword={handleResetPassword}
            onNavigate={(path) => navigate(path)}
        />
    );
};

export default ForgotPasswordPage;
