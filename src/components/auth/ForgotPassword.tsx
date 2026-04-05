import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Mail, ArrowLeft, KeyRound, CheckCircle2, Loader2 } from "lucide-react";

interface ForgotPasswordProps {
    step: number;
    setStep: (step: number) => void;
    email: string;
    setEmail: (email: string) => void;
    otp: string;
    setOtp: (otp: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
    onSendOTP: (e: React.FormEvent) => void;
    onResetPassword: (e: React.FormEvent) => void;
    onNavigate: (path: string) => void;
}

const ForgotPassword = ({
    step,
    setStep,
    email,
    setEmail,
    otp,
    setOtp,
    password,
    setPassword,
    loading,
    onSendOTP,
    onResetPassword,
    onNavigate
}: ForgotPasswordProps) => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                {/* Back Link */}
                {step < 3 && (
                    <button 
                        onClick={() => step === 1 ? onNavigate("/login") : setStep(1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 text-sm font-medium"
                    >
                        <ArrowLeft size={16} />
                        Back to {step === 1 ? "Login" : "Email"}
                    </button>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                        {step === 1 && <Mail size={28} />}
                        {step === 2 && <KeyRound size={28} />}
                        {step === 3 && <CheckCircle2 size={28} className="text-green-600" />}
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {step === 1 && "Forgot Password?"}
                        {step === 2 && "Reset Password"}
                        {step === 3 && "All Done!"}
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm">
                        {step === 1 && "No worries, we'll send you reset instructions."}
                        {step === 2 && `Enter the 6-digit code sent to ${email}`}
                        {step === 3 && "Your password has been successfully reset."}
                    </p>
                </div>

                {step === 1 && (
                    <form onSubmit={onSendOTP} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11 rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                "Send Reset Code"
                            )}
                        </Button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={onResetPassword} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="otp" className="text-slate-700">OTP Code</Label>
                            <Input
                                id="otp"
                                type="text"
                                placeholder="******"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="h-11 text-center text-2xl font-bold tracking-[8px] rounded-lg border-slate-200 focus:border-blue-500"
                                maxLength={6}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pass" className="text-slate-700">New Password</Label>
                            <Input
                                id="pass"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-11 rounded-lg border-slate-200 focus:border-blue-500"
                            />
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </form>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium flex items-start gap-3">
                            <ShieldCheck className="shrink-0" size={18} />
                            Your account is now secure. You can log in with your new password.
                        </div>
                        <Button 
                            onClick={() => onNavigate("/login")}
                            className="w-full h-11 bg-slate-900 hover:bg-black text-white font-semibold rounded-lg"
                        >
                            Log in Now
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;