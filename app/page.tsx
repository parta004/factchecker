'use client';

import { Suspense, memo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import { Sidebar } from '@/app/components/sidebar/sidebar';
import { FeaturedVideos } from '@/app/sections/home/FeaturedVideos';
import { Divider } from './components/ui/divider';
import FeedHeader from './sections/feed/FeedHeader';
import { FilterLayout } from './components/filters/FilterLayout';
import LogoSectionDecor from './components/ui/Decorative/LogoSectionDecor';
import { FirstTimeUserModal } from './sections/onboarding/FirstTimeUserModal';
import { useOnboarding } from './hooks/use-onboarding';
import { useTheme } from 'next-themes';

// Simple loading fallbacks
const SimpleSkeleton = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32" />
);

// Dynamic import with simple fallback
const FeaturedNews = dynamic(() => import('./sections/home/FeaturedNews'), {
  loading: () => <SimpleSkeleton />,
  ssr: false
});

// Simple animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

const NewsBackground = memo(() => (
  <div 
    className="fixed inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url('/background/news_bg_1.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}
  />
));

NewsBackground.displayName = 'NewsBackground';

export default function Home() {
  const { hasCompletedOnboarding, isLoading, completeOnboarding, skipOnboarding } = useOnboarding();
  const {
    theme
  } = useTheme();

  // Simple loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Onboarding Modal */}
      {theme !== 'dark' && <NewsBackground />}
      
      <ErrorBoundary>
        <FirstTimeUserModal
          isOpen={!hasCompletedOnboarding}
          onComplete={completeOnboarding}
          onSkip={skipOnboarding}
        />
      </ErrorBoundary>

      {/* Main Content */}
      <motion.div 
        className="flex relative min-h-screen overflow-y-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Sidebar */}
        <motion.div className="shrink-0" variants={itemVariants}>
          <ErrorBoundary>
            <Sidebar />
          </ErrorBoundary>
        </motion.div>

        {/* Main Content */}
        <motion.div className="flex-1 relative" variants={itemVariants}>
          {/* Filter Layout */}
          <div className="mb-6">
            <ErrorBoundary>
              <FilterLayout />
            </ErrorBoundary>
          </div>

          {/* Feed Header */}
          <div className="mb-6 px-4">
            <ErrorBoundary>
              <FeedHeader />
            </ErrorBoundary>
          </div>

          {/* Featured Videos */}
          <div className="mb-8 px-8">
            <ErrorBoundary>
              <Suspense fallback={<SimpleSkeleton />}>
                <FeaturedVideos />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Divider */}
          <div className="my-8">
            <Divider />
          </div>

          {/* Featured News */}
          <div className="pb-8 px-8">
            <ErrorBoundary>
              <Suspense fallback={<SimpleSkeleton />}>
                <FeaturedNews />
              </Suspense>
            </ErrorBoundary>
          </div>
        </motion.div>

        {/* Background Logo */}
        <LogoSectionDecor condition={true} />
      </motion.div>
    </>
  );
}
