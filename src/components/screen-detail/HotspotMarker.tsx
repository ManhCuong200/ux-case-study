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
            style={{ left: `${hotspot.pos_x}%`, top: `${hotspot.pos_y}%` }}
            className="absolute group/pin -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
        >
            <div className="relative">
                {/* Outer pulse animation */}
                <div className="absolute inset-0 w-8 h-8 -left-1 -top-1 bg-blue-500/50 rounded-full animate-ping" />
                {/* Marker dot */}
                <div className="relative w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-[10px] border-2 border-white shadow-lg shadow-blue-500/50 group-hover/pin:scale-125 transition-transform duration-300">
                    {index}
                </div>
                
                {/* Popover on hover */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-xl shadow-2xl opacity-0 group-hover/pin:opacity-100 pointer-events-none transition-all duration-300 scale-90 group-hover/pin:scale-100 z-20 border border-slate-100 translate-y-2 group-hover/pin:translate-y-0">
                    <h5 className="font-bold text-slate-900 text-sm mb-1">{hotspot.title}</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{hotspot.content}</p>
                </div>
            </div>
        </div>
    );
};

export default HotspotMarker;
