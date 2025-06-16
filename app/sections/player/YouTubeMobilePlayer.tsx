'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoWithTimestamps } from '@/app/types/video_api';
import { PlayerTimeline } from '@/app/sections/player/timeline/PlayerTimeline';
import { VideoPlayerHeader } from '@/app/components/video/VideoPlayerHeader';
import { useLayoutTheme } from '@/app/hooks/use-layout-theme';
import { YouTubePlayerWithSync } from './YouTubePlayerWithSync';
import YouTubeMobileContainer from './YouTubeMobileContainer';
import PlayerOverlayUi from './PlayerOverlayUi';
import { FactCheckIndicators } from '@/app/components/reel/FactCheckIndicators';
import { FactCheckBottomSheet } from '@/app/components/reel/FactCheckBottomSheet';
import { FactCheckIndicators as FactCheckIndicatorsType, CommunityNote } from '@/app/types/fact-check';

interface YouTubeMobilePlayerProps {
  videos?: VideoWithTimestamps[];
  initialIndex?: number;
  autoPlay?: boolean;
}

// Mock data for demonstration - replace with real data integration
const mockFactCheckData: FactCheckIndicatorsType = {
  truthScore: 75,
  manipulationAlerts: [
    {
      type: 'emotional',
      severity: 'medium',
      description: 'Appeals to emotion detected',
      timestamp: 30
    },
    {
      type: 'data',
      severity: 'low', 
      description: 'Data may be cherry-picked',
      timestamp: 90
    }
  ],
  sourceVerification: [
    {
      sourceType: 'verified',
      credibilityScore: 85,
      sourceName: 'Reuters'
    },
    {
      sourceType: 'questionable',
      credibilityScore: 30,
      sourceName: 'Unknown Blog'
    }
  ],
  communityNotes: 3,
  confidenceLevel: 82
};

const mockCommunityNotes: CommunityNote[] = [
  {
    id: '1',
    statement: 'The statistics mentioned in this video are from 2019 and may not reflect current data.',
    votes: { helpful: 45, unhelpful: 3 },
    sources: ['https://example.com/source1', 'https://example.com/source2'],
    timestamp: new Date(),
    context: 'Data accuracy concern',
    severity: 'medium'
  },
  {
    id: '2', 
    statement: 'Additional context: This policy was updated in 2023 with significant changes.',
    votes: { helpful: 32, unhelpful: 1 },
    sources: ['https://example.com/source3'],
    timestamp: new Date(),
    context: 'Missing context',
    severity: 'low'
  }
];

export function YouTubeMobilePlayer({ 
  videos, 
  initialIndex = 0, 
  autoPlay = true 
}: YouTubeMobilePlayerProps) {
  const { isDark } = useLayoutTheme();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showFactCheckDetails, setShowFactCheckDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  // Sync state
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [seekRequest, setSeekRequest] = useState<number | null>(null);

  const handleTimeUpdate = useCallback((currentTime: number) => {
    setCurrentVideoTime(currentTime);
  }, []);

  const handleSeekToTimestamp = useCallback((timestamp: number) => {
    console.log('Seek to timestamp:', timestamp);
    setSeekRequest(timestamp);
    
    // Clear seek request after a short delay
    setTimeout(() => {
      setSeekRequest(null);
    }, 500);
  }, []);

  const handleVideoChange = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
    setCurrentVideoTime(0);
    setSeekRequest(null);
  }, []);

  const currentVideo = videos?.[currentIndex];

  return (
    <div className="reel-container relative w-full h-screen overflow-hidden bg-black">
      {/* Video Container */}
      <YouTubeMobileContainer
        videos={videos}
        currentIndex={currentIndex}
        setCurrentIndex={handleVideoChange}
        setShowHeader={setShowHeader}
      >
        {/* Video Player */}
        {videos && videos.map((videoData, index) => {
          const youtubeId = extractYouTubeId(videoData.video.video_url);
          
          return (
            <div
              key={videoData.video.id}
              className="w-full h-screen relative bg-black"
            >
              {/* Synced YouTube Player */}
              {index === currentIndex ? (
                <YouTubePlayerWithSync
                  videoId={youtubeId}
                  videoData={videoData}
                  onTimeUpdate={handleTimeUpdate}
                  onSeekRequest={seekRequest}
                  autoPlay={autoPlay}
                  className="w-full h-full"
                />
              ) : (
                // Placeholder for non-active videos
                <div className="w-full h-full bg-black flex items-center justify-start">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">📺</div>
                    <p>Video {index + 1}</p>
                  </div>
                </div>
              )}

              {/* Enhanced Header with Fact Check */}
              {index === currentIndex && (
                <VideoPlayerHeader 
                //@ts-expect-error Ignore
                  video={videoData.video}
                  isVisible={showHeader}
                  isMobile={true}
                />
              )}

                {/* Left Side Panel - Professional Fact-Check Indicators */}
                {index === currentIndex && (
                  <FactCheckIndicators 
                    data={mockFactCheckData}
                    communityNotes={mockCommunityNotes}
                    onDetailsOpen={() => setShowFactCheckDetails(true)}
                  />
                )}

              {/* Right Side Panel - Reserved for swipe gestures (EMPTY) */}
              <div className="right-swipe-area absolute right-0 top-0 w-20 h-full z-10" />

              {/* Overlay UI */}
              <PlayerOverlayUi
                index={index}
                currentIndex={currentIndex}
                video={videoData.video}
                showTimeline={showTimeline}
                setShowTimeline={setShowTimeline}
                setCurrentIndex={handleVideoChange}
                videos={videos}
              />
            </div>
          );
        })}
      </YouTubeMobileContainer>

      {/* Enhanced Timeline Overlay - Now Synced */}
      {videos && currentVideo && (
        <AnimatePresence>
          {showTimeline && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 right-0 backdrop-blur-md border-t border-white/20 p-4 z-50"
              style={{
                bottom: '80px', // Positioned above bottom navigation
                background: 'rgba(0, 0, 0, 0.9)'
              }}
            >
              <PlayerTimeline
                videoData={currentVideo}
                onSeekToTimestamp={handleSeekToTimestamp}
                isOverNavbar={true}
                currentVideoTime={currentVideoTime}
                setShowTimeline={setShowTimeline}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Fact-Check Details Bottom Sheet */}
      <FactCheckBottomSheet
        isOpen={showFactCheckDetails}
        onClose={() => setShowFactCheckDetails(false)}
        data={mockFactCheckData}
        communityNotes={mockCommunityNotes}
      />
    </div>
  );
}

// Helper function to extract YouTube ID from URL
function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : '';
}