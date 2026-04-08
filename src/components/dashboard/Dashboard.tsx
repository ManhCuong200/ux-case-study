import { Plus, LayoutGrid, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppCard from "@/components/dashboard/AppCard";

interface DashboardProps {
    apps: any[];
    loading: boolean;
    onCreateClick: () => void;
    onAppClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
    onEditClick: (app: any) => void;
}

const Dashboard = ({ apps, loading, onCreateClick, onAppClick, onDeleteClick, onEditClick }: DashboardProps) => {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                        <LayoutGrid className="text-blue-600" />
                        My Projects
                    </h1>
                    <p className="text-slate-500 font-medium lowercase tracking-wide">
                        Managing {apps.length} research cases
                    </p>
                </div>
                <Button 
                    onClick={onCreateClick}
                    className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    New Research App
                </Button>
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : apps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apps.map((app) => (
                        <AppCard 
                            key={app.id} 
                            app={app} 
                            onClick={() => onAppClick(app.id)}
                            onDelete={(id, e) => {
                                e.stopPropagation();
                                onDeleteClick(id);
                            }}
                            onEdit={(app, e) => {
                                e.stopPropagation();
                                onEditClick(app);
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center space-y-6">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                        <Microscope size={40} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900">No projects found yet</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            Start your UX research by creating your first application project. 
                            Upload mockups and identify usability issues.
                        </p>
                    </div>
                    <Button 
                        variant="outline"
                        onClick={onCreateClick}
                        className="rounded-xl border-slate-200 hover:bg-slate-50 hover:text-blue-600 font-semibold"
                    >
                        Create your first app
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
