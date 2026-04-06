import { Calendar, Layers, Trash2 } from "lucide-react";

interface AppCardProps {
  app: {
    id: number;
    name: string;
    description?: string;
    logo_url?: string;
    createdAt?: string | Date;
  };
  onClick: (id: number) => void;
  onDelete: (id: number, e: React.MouseEvent) => void;
}

const AppCard = ({ app, onClick, onDelete }: AppCardProps) => {
  const formatDate = (dateInput?: string | Date) => {
    if (!dateInput) return "Recently";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Recently";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div 
      onClick={() => onClick(app.id)}
      className="group relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 cursor-pointer animate-in fade-in zoom-in-95 duration-500"
    >
      {/* Thumbnail Header */}
      <div className="relative h-48 bg-slate-50 overflow-hidden">
        {app.logo_url ? (
          <img 
            src={app.logo_url} 
            alt={app.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-200 transition-colors duration-500 group-hover:bg-blue-50 group-hover:text-blue-200">
            <Layers size={64} strokeWidth={1.5} />
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-500" />
        
        {/* Delete Button (Visible on Hover) */}
        <div 
          onClick={(e) => onDelete(app.id, e)}
          className="absolute top-4 right-4 h-10 w-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white border border-white/30"
        >
          <Trash2 size={18} />
        </div>
      </div>

      <div className="p-7 space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {app.name}
          </h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 min-h-[40px]">
            {app.description || "No description provided for this research project."}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Calendar size={14} className="text-blue-400" />
            {formatDate(app.createdAt)}
          </div>
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AppCard;
