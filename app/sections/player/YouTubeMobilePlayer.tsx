'use client';

import { useState, useCallback, useEffect } from 'react';
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

interface ActiveStatement {
  id: string;
  timestamp: number;
  title: string;
  status: string;
  truthPercentage: number;
  endTime?: number; // When the statement context ends
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
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const [showFactCheckDetails, setShowFactCheckDetails] = useState(false);
  
  // Header visibility state
  const [activeStatements, setActiveStatements] = useState<ActiveStatement[]>([]);
  const [headerVisibilityTimers, setHeaderVisibilityTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});
  
  // Sync state
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [seekRequest, setSeekRequest] = useState<number | null>(null);

  // Header visibility configuration
  const HEADER_DISPLAY_DURATION = 12000; // 12 seconds - longer for reading and voting
  const HEADER_MIN_DISPLAY_TIME = 5000; // Minimum 5 seconds even if user interacts
  const STATEMENT_DETECTION_THRESHOLD = 2; // Seconds tolerance for statement detection

  const handleTimeUpdate = useCallback((currentTime: number) => {
    setCurrentVideoTime(currentTime);
    
    // Check for new statements at current time
    const currentVideo = videos?.[currentIndex];
    if (!currentVideo?.timestamps) return;

    const relevantTimestamps = currentVideo.timestamps.filter(timestamp => {
      const timeDiff = Math.abs(timestamp.startTime - currentTime);
      return timeDiff <= STATEMENT_DETECTION_THRESHOLD;
    });

    // Process each relevant timestamp
    relevantTimestamps.forEach(timestamp => {
      const statementId = `${currentIndex}-${timestamp.startTime}`;
      
      // Check if this statement is already active
      const isAlreadyActive = activeStatements.some(stmt => stmt.id === statementId);
      
      if (!isAlreadyActive) {
        const newStatement: ActiveStatement = {
          id: statementId,
          timestamp: timestamp.startTime,
          title: timestamp.statement || 'Key Statement',
          status: timestamp.factCheck?.status || 'UNVERIFIED',
          truthPercentage: timestamp.factCheck?.confidence as number || 0,
          endTime: timestamp.endTime || timestamp.startTime + 30 // Use endTime or default to 30 seconds
        };

        setActiveStatements(prev => {
          // Limit to maximum 2 statements visible at once
          const updated = [...prev, newStatement];
          return updated.slice(-2); // Keep only the last 2
        });

        // Set up visibility timer for this statement
        const timer = setTimeout(() => {
          setActiveStatements(prev => 
            prev.filter(stmt => stmt.id !== statementId)
          );
          
          setHeaderVisibilityTimers(prev => {
            const { [statementId]: removedTimer, ...rest } = prev;
            return rest;
          });
        }, HEADER_DISPLAY_DURATION);

        setHeaderVisibilityTimers(prev => ({
          ...prev,
          [statementId]: timer
        }));
      }
    });

    // Remove statements that have passed their context time
    setActiveStatements(prev => 
      prev.filter(stmt => 
        !stmt.endTime || currentTime < stmt.endTime + 5 // 5 second grace period
      )
    );
  }, [currentIndex, videos, activeStatements]);

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
    
    // Clear all active statements and timers when changing videos
    Object.values(headerVisibilityTimers).forEach(timer => clearTimeout(timer));
    setHeaderVisibilityTimers({});
    setActiveStatements([]);
  }, [headerVisibilityTimers]);

  // Handle user interaction with headers (extend visibility)
  const handleHeaderInteraction = useCallback((statementId: string) => {
    const existingTimer = headerVisibilityTimers[statementId];
    if (existingTimer) {
      clearTimeout(existingTimer);
      
      // Extend visibility by another 8 seconds after interaction
      const newTimer = setTimeout(() => {
        setActiveStatements(prev => 
          prev.filter(stmt => stmt.id !== statementId)
        );
        
        setHeaderVisibilityTimers(prev => {
          const { [statementId]: removedTimer, ...rest } = prev;
          return rest;
        });
      }, 8000);
      
      setHeaderVisibilityTimers(prev => ({
        ...prev,
        [statementId]: newTimer
      }));
    }
  }, [headerVisibilityTimers]);

  // Force show header for testing (remove in production)
  useEffect(() => {
    if (videos && videos[currentIndex]) {
      // Mock statement for testing - remove this in production
      const mockStatement: ActiveStatement = {
        id: `mock-${currentIndex}`,
        timestamp: 30,
        title: 'Test Statement',
        status: 'PARTIALLY_TRUE',
        truthPercentage: 75,
        endTime: 60
      };
      
      // Show mock statement after 2 seconds for testing
      const mockTimer = setTimeout(() => {
        setActiveStatements([mockStatement]);
      }, 2000);

      return () => clearTimeout(mockTimer);
    }
  }, [currentIndex, videos]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(headerVisibilityTimers).forEach(timer => clearTimeout(timer));
    };
  }, [headerVisibilityTimers]);

  const currentVideo = videos?.[currentIndex];

  return (
    <div className="reel-container relative w-full h-screen overflow-hidden bg-black">
      {/* Video Container */}
      <YouTubeMobileContainer
        videos={videos}
        currentIndex={currentIndex}
        setCurrentIndex={handleVideoChange}
        setShowHeader={() => {}} // Not used anymore, we handle this internally
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
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">📺</div>
                    <p>Video {index + 1}</p>
                  </div>
                </div>
              )}

              {/* Multiple Statement Headers */}
              {index === currentIndex && (
                <AnimatePresence>
                  {activeStatements.map((statement, headerIndex) => (
                    <div 
                      key={statement.id}
                      onClick={() => handleHeaderInteraction(statement.id)}
                    >
                      <VideoPlayerHeader 
                        video={videoData}
                        isVisible={true}
                        isMobile={true}
                        headerIndex={headerIndex}
                        totalHeaders={activeStatements.length}
                        className="cursor-pointer" // Make it clear it's interactive
                      />
                    </div>
                  ))}
                </AnimatePresence>
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
              className="absolute left-0 right-0 backdrop-blur-md border-t border-white/20 p-4 z-40" // z-40 to stay below headers
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