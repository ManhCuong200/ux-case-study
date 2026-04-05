import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Microscope, ShieldCheck, Loader2 } from "lucide-react"

import { type FieldErrors, type UseFormRegister } from "react-hook-form"
import type { LoginData } from "@/shared/types"

interface LoginProps {
  register: UseFormRegister<LoginData>;
  errors: FieldErrors<LoginData>;
  loading: boolean;
  error: string;
  onLogin: (e: React.FormEvent) => void;
}

const Login = ({ register, errors, loading, error, onLogin }: LoginProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Header / Logo Section */}
      <div className="flex flex-col items-center mb-8 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 shadow-sm">
          <Microscope size={32} />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
            ResearchCommand
          </h1>
          <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">
            Architectural Authority in UX Ops
          </p>
        </div>
      </div>

      {/* Main Login Card */}
      <Card className="w-full max-w-[450px] shadow-xl border-slate-100 bg-white animate-in zoom-in-95 duration-500">
        <CardContent className="pt-8 pb-10 px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={onLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-md animate-in fade-in zoom-in-95 duration-300">
                {error}
              </div>
            )}
            
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                {...register("email")}
                placeholder="researcher@command.ai" 
                className={`h-12 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                  Password
                </Label>
                <Link 
                  to="/forgot-password" 
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot Password
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                {...register("password")}
                placeholder="••••••••" 
                className={`h-12 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.password && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
              <Label htmlFor="remember" className="text-sm font-medium text-slate-600 leading-none cursor-pointer">
                Remember Me
              </Label>
            </div>

            {/* Login Button */}
            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : "Log In"}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="text-center text-sm pt-4">
            <span className="text-slate-500">Don't have an account? </span>
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Sign up
            </Link>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <Button 
            type="button"
            variant="outline"
            onClick={() => window.location.href = 'http://localhost:3000/auth/google'}
            className="w-full h-11 border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google Account
          </Button>
        </CardContent>
      </Card>

      {/* Security Badge */}
      <div className="mt-12 mb-20 flex items-center gap-2 text-slate-400 font-bold tracking-widest text-[10px] uppercase animate-in fade-in duration-1000 delay-500">
        <ShieldCheck size={14} />
        Enterprise Grade Security
      </div>

      {/* Footer */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] text-slate-400 font-medium tracking-wide">
        <span>© 2024 ResearchCommand AI</span>
        <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-slate-600 transition-colors">Security Standards</a>
      </div>
    </div>
  )
}

export default Login