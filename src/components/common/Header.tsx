import { Button } from "@/components/ui/button";
import { Microscope, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/shared/types";

interface HeaderProps {
  user: User | null;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header = ({ user, isAuthenticated, onLogout }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <Microscope size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            ResearchCommand
          </span>
        </div>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                <div className="h-6 w-6 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    user?.fullName?.charAt(0).toUpperCase() || "U"
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-600 max-w-[120px] truncate">
                  {user?.fullName || "Researcher"}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onLogout}
                className="text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Log Out"
              >
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <Button 
              variant="default" 
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
