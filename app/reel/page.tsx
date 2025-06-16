'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { YouTubeMobilePlayer } from '@/app/sections/player/YouTubeMobilePlayer';
import { useVideoDataManager } from '@/app/utils/videoDataManager';
import { VideoDataStates } from '@/app/components/video/VideoDataStates';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function ReelPageContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v');

  // Use the common video data manager
  const videoDataResult = useVideoDataManager({
    limit: 50,
    researched: true,
    sort_by: 'processed_at',
    sort_order: 'desc',
    videoId
  });

  return (
    <VideoDataStates result={videoDataResult}>
      <div className="h-screen bg-black relative overflow-hidden select-none">
        <YouTubeMobilePlayer
          videos={videoDataResult.enhancedVideos}
          initialIndex={videoDataResult.initialIndex}
          autoPlay={true}
        />
      </div>
    </VideoDataStates>
  );
}

export default function ReelPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-12 h-12 mx-auto mb-4" />
          </motion.div>
          <p className="text-lg font-medium">Loading Reel Player...</p>
          <p className="text-sm text-white/60 mt-2">Preparing your fact-checked videos</p>
        </motion.div>
      </div>
    }>
      <ReelPageContent />
    </Suspense>
  );
}