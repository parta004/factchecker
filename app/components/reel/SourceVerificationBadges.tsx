'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, HelpCircle, Shield, X } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { VerificationBadge } from '@/app/types/fact-check';

interface SourceVerificationBadgesProps {
  badges: VerificationBadge[];
  className?: string;
}

const SOURCE_STYLES = {
  verified: {
    icon: '✅',
    bg: 'bg-green-500/20',
    border: 'border-green-500',
    text: 'text-green-400'
  },
  questionable: {
    icon: '❌', 
    bg: 'bg-red-500/20',
    border: 'border-red-500',
    text: 'text-red-400'
  },
  unknown: {
    icon: '⚠️',
    bg: 'bg-gray-500/20',
    border: 'border-gray-500', 
    text: 'text-gray-400'
  }
};

export function SourceVerificationBadges({ badges, className }: SourceVerificationBadgesProps) {
  if (!badges.length) return null;

  return (
    <motion.div
      className={cn("flex flex-col gap-2", className)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <AnimatePresence>
        {badges.slice(0, 3).map((badge, index) => {
          const style = SOURCE_STYLES[badge.sourceType];
          
          return (
            <motion.div
              key={`${badge.sourceName}-${index}`}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full border-2 backdrop-blur-sm",
                style.bg,
                style.border
              )}
              initial={{ scale: 0, opacity: 0, x: -20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0, opacity: 0, x: -20 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Main Icon */}
              <div className="text-lg">
                {style.icon}
              </div>
              
              {/* Credibility Score Indicator */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black/80 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {Math.round(badge.credibilityScore / 10)}
                </span>
              </div>
              
              {/* Tooltip on Hover */}
              <div className="absolute left-12 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap max-w-48">
                  <div className="font-medium">{badge.sourceName}</div>
                  <div className="text-white/70">
                    Credibility: {badge.credibilityScore}/100
                  </div>
                  <div className={cn("capitalize", style.text)}>
                    {badge.sourceType}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Show count if more badges */}
      {badges.length > 3 && (
        <motion.div
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border-2 border-white/30 text-white/80"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-xs font-medium">+{badges.length - 3}</span>
        </motion.div>
      )}
    </motion.div>
  );
}