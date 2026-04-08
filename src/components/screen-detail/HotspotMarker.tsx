interface HotspotMarkerProps {
    hotspot: {
        id: number;
        title: string;
        content: string;
        pos_x: number;
        pos_y: number;
    };
    index: number;
}

const HotspotMarker = ({ hotspot, index }: HotspotMarkerProps) => {
    return (
        <div 
            style={{ 
                left: `${Math.min(98, Math.max(2, hotspot.pos_x))}%`, 
                top: `${Math.min(98, Math.max(2, hotspot.pos_y))}%` 
            }}
            className="absolute group/pin -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
        >
            <div className="relative">
                {/* Outer pulse animation - Red for high visibility */}
                <div className="absolute inset-0 w-10 h-10 -left-2 -top-2 bg-red-400/40 rounded-full animate-ping" />
                
                {/* Marker dot - Contrast gradient */}
                <div className="relative w-7 h-7 bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-full flex items-center justify-center font-black text-xs border-2 border-white shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover/pin:scale-110 group-hover/pin:rotate-12 transition-all duration-300">
                    {index}
                </div>
                
                {/* Popover on hover */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl opacity-0 group-hover/pin:opacity-100 pointer-events-none transition-all duration-300 scale-90 group-hover/pin:scale-100 z-30 translate-y-2 group-hover/pin:translate-y-0 border border-white/10">
                    <h5 className="font-bold text-white text-sm mb-1">{hotspot.title}</h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-4">{hotspot.content}</p>
                    {/* Tiny arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/10" />
                </div>
            </div>
        </div>
    );
};

export default HotspotMarker;
