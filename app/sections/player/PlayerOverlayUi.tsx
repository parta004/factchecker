import { Button } from "@/app/components/ui/button";
import { useLayoutTheme } from "@/app/hooks/use-layout-theme";
import { VideoWithTimestamps } from "@/app/types/video_api";
import { motion, AnimatePresence } from "framer-motion"
import { MoreVertical, Share, Flag, BookOpen, TrendingUp, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

type Props = {
    index: number;
    currentIndex: number;
    video: VideoWithTimestamps['video']; 
    showTimeline: boolean;
    setShowTimeline: (show: boolean) => void;
    setCurrentIndex: (index: number) => void;
    videos: VideoWithTimestamps[];
}

const PlayerOverlayUi = ({currentIndex, video, showTimeline, setShowTimeline, setCurrentIndex, videos }: Props) => {
    const { colors, isDark } = useLayoutTheme();
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: video.title || 'Fact-checked video',
                text: 'Check out this fact-checked video',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
        setShowMoreMenu(false);
    };

    const handleReport = () => {
        // Handle report functionality
        console.log('Report video:', video.id);
        setShowMoreMenu(false);
    };

    const handleViewDetails = () => {
        // Navigate to detailed fact-check view
        window.open(`/watch?v=${video.id}`, '_blank');
        setShowMoreMenu(false);
    };

    const handleViewTrends = () => {
        // Show trending analysis
        setShowTimeline(true);
        setShowMoreMenu(false);
    };
    
    return (
        <>
            <div className="absolute inset-0 pointer-events-none">
                {/* Enhanced Gradients */}
                <div
                    className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                    style={{
                        background: `linear-gradient(to bottom, 
                        rgba(0, 0, 0, 0.6) 0%, 
                        rgba(0, 0, 0, 0.3) 50%, 
                        transparent 100%
                      )`
                    }}
                />

                <div
                    className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                    style={{
                        background: `linear-gradient(to top, 
                        rgba(0, 0, 0, 0.8) 0%, 
                        rgba(0, 0, 0, 0.4) 60%, 
                        transparent 100%
                      )`
                    }}
                />

                {/* Right Side Swiper Dots - Restored */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 pointer-events-none">
                    {videos && videos.length > 1 && videos.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`w-1 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'h-8 bg-white' 
                                    : 'h-2 bg-white/50'
                            }`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        />
                    ))}
                    
                    {/* Swipe Hint Icon */}
                    {videos && videos.length > 1 && (
                        <motion.div
                            className="text-white/70 text-center mt-2 flex flex-col items-center gap-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <motion.div
                                animate={{ 
                                    y: [-1, -3, -1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <ChevronUp className="w-4 h-4" />
                            </motion.div>
                            <motion.div
                                animate={{ 
                                    y: [1, 3, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.75
                                }}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {/* Functional Right Side Controls - Moved down to avoid swiper dots */}
                <div className="absolute right-4 bottom-40 flex flex-col items-center gap-4 pointer-events-auto">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-12 h-12 rounded-full text-white hover:bg-white/20 backdrop-blur-md border border-white/20"
                            style={{
                                background: isDark
                                    ? 'rgba(15, 23, 42, 0.6)'
                                    : 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(8px)'
                            }}
                            onClick={() => setShowMoreMenu(!showMoreMenu)}
                        >
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </motion.div>

                    {/* More Menu Dropdown */}
                    <AnimatePresence>
                        {showMoreMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="absolute bottom-16 right-0 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl p-2 min-w-[200px] z-50"
                            >
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                                    >
                                        <Share className="w-4 h-4" />
                                        <span className="text-sm">Share Video</span>
                                    </button>
                                    
                                    <button
                                        onClick={handleViewDetails}
                                        className="flex items-center gap-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        <span className="text-sm">Detailed Analysis</span>
                                    </button>
                                    
                                    <button
                                        onClick={handleViewTrends}
                                        className="flex items-center gap-3 px-3 py-2 text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
                                    >
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="text-sm">View Timeline</span>
                                    </button>
                                    
                                    <hr className="border-gray-700 my-1" />
                                    
                                    <button
                                        onClick={handleReport}
                                        className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                                    >
                                        <Flag className="w-4 h-4" />
                                        <span className="text-sm">Report Issue</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right side swipe area - keep clear for gestures */}
                <div className="absolute right-0 top-0 w-20 h-full pointer-events-auto" />
            </div>
        </>
    );
};

export default PlayerOverlayUi;