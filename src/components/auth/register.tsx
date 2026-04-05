import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Microscope, ShieldCheck, Loader2 } from "lucide-react"

import { type FieldErrors, type UseFormRegister } from "react-hook-form"

interface RegisterProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setValue: (name: string, value: any) => void;
  watch: (name: string) => any;
  loading: boolean;
  error: string;
  onRegister: (e: React.FormEvent) => void;
}

const Register = ({
  register, errors, setValue, watch, loading, error, onRegister
}: RegisterProps) => {
  const agreeTerms = watch("agreeTerms");

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
            Create your researcher account
          </p>
        </div>
      </div>

      {/* Main Register Card */}
      <Card className="w-full max-w-[500px] shadow-xl border-slate-100 bg-white animate-in zoom-in-95 duration-500">
        <CardContent className="pt-8 pb-10 px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Get started</h2>
            <p className="text-slate-500">Enter your information to create an account.</p>
          </div>

          <form onSubmit={onRegister} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-md animate-in fade-in zoom-in-95 duration-300">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                Full Name
              </Label>
              <Input 
                id="name" 
                type="text" 
                {...register("fullName")}
                placeholder="Dr. Jordan Smith" 
                className={`h-11 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 ${errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.fullName && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">
                  {errors.fullName.message as string}
                </p>
              )}
            </div>

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
                className={`h-11 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                        Password
                    </Label>
                    <Input 
                        id="password" 
                        type="password" 
                        {...register("password")}
                        placeholder="••••••••" 
                        className={`h-11 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {errors.password && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">
                        {errors.password.message as string}
                      </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                        Confirm
                    </Label>
                    <Input 
                        id="confirm-password" 
                        type="password" 
                        {...register("confirmPassword")}
                        placeholder="••••••••" 
                        className={`h-11 border-slate-200 focus-visible:ring-blue-500 focus-visible:border-blue-500 ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">
                        {errors.confirmPassword.message as string}
                      </p>
                    )}
                </div>
            </div>

            {/* Terms */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="agreeTerms" 
                  onCheckedChange={(checked) => setValue("agreeTerms", checked)}
                  checked={!!agreeTerms}
                  className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" 
                />
                <Label htmlFor="agreeTerms" className="text-xs font-medium text-slate-500 leading-normal cursor-pointer">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                </Label>
              </div>
              {errors.agreeTerms && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.agreeTerms.message as string}
                </p>
              )}
            </div>

            {/* Register Button */}
            <Button 
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98] mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : "Create Account"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm pt-4">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Log in
            </Link>
          </div>
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

export default Register