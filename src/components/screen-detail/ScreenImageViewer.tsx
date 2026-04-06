import React, { forwardRef } from "react";
import { Sparkles } from "lucide-react";
import HotspotMarker from "./HotspotMarker";

interface ScreenImageViewerProps {
    imageUrl: string;
    screenName: string;
    isAdding: boolean;
    hotspots: any[];
    onImageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ScreenImageViewer = forwardRef<HTMLImageElement, ScreenImageViewerProps>(
    ({ imageUrl, screenName, isAdding, hotspots, onImageClick }, ref) => {
        return (
            <div className="flex-1 space-y-4">
                <div className="bg-slate-900 rounded-[2.5rem] p-4 lg:p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5" />
                    <div 
                        className={`relative border border-white/10 rounded-2xl overflow-hidden cursor-crosshair transition-all duration-500 ${
                            isAdding ? 'ring-4 ring-blue-500/50 ring-offset-4 ring-offset-slate-900 shadow-[0_0_50px_rgba(59,130,246,0.3)]' : ''
                        }`}
                        onClick={isAdding ? onImageClick : undefined}
                    >
                        <img 
                            ref={ref}
                            src={imageUrl} 
                            alt={screenName} 
                            className="w-full h-auto block select-none pointer-events-none"
                        />
                        
                        {/* Render Hotspots */}
                        {hotspots.map((h, i) => (
                            <HotspotMarker 
                                key={h.id}
                                hotspot={h}
                                index={i + 1}
                            />
                        ))}
                        
                        {/* Instructions overlay */}
                        {isAdding && (
                            <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                                <div className="bg-white/90 backdrop-blur p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-3 animate-in zoom-in-95 duration-300 scale-100">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                                        <Sparkles size={24} />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="font-bold text-slate-900">Analysis Mode Active</h4>
                                        <p className="text-xs text-slate-500 font-medium max-w-[200px]">Click anywhere on the blueprint to map a UX observation.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

export default ScreenImageViewer;
