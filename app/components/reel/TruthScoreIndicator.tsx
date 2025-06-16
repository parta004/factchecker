'use client';

import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';
import { FactCheckSeverity } from '@/app/types/fact-check';

interface TruthScoreIndicatorProps {
  score: number; // 0-100
  severity: FactCheckSeverity;
  className?: string;
}

const SEVERITY_COLORS = {
  high: {
    bg: 'bg-red-500',
    border: 'border-red-400',
    glow: 'shadow-red-500/50'
  },
  medium: {
    bg: 'bg-yellow-500',
    border: 'border-yellow-400',
    glow: 'shadow-yellow-500/50'
  },
  low: {
    bg: 'bg-orange-500',
    border: 'border-orange-400',
    glow: 'shadow-orange-500/50'
  },
  verified: {
    bg: 'bg-green-500',
    border: 'border-green-400',
    glow: 'shadow-green-500/50'
  }
};

const SEVERITY_EMOJIS = {
  high: '🔴',
  medium: '🟡',
  low: '🟠',
  verified: '🟢'
};

export function TruthScoreIndicator({ score, severity, className }: TruthScoreIndicatorProps) {
  const colors = SEVERITY_COLORS[severity];
  const emoji = SEVERITY_EMOJIS[severity];
  
  const circumference = 2 * Math.PI * 16; // radius = 16
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Circular Progress Background */}
      <div className="relative w-12 h-12">
        <svg
          className="w-12 h-12 transform -rotate-90"
          viewBox="0 0 40 40"
        >
          {/* Background Circle */}
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
          />
          
          {/* Progress Circle */}
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            strokeWidth="3"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              "transition-all duration-500",
              severity === 'high' && "stroke-red-500",
              severity === 'medium' && "stroke-yellow-500", 
              severity === 'low' && "stroke-orange-500",
              severity === 'verified' && "stroke-green-500"
            )}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
          >
            {emoji}
          </motion.div>
        </div>
      </div>
      
      {/* Score Text */}
      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-xs text-white/80 font-medium bg-black/60 px-2 py-1 rounded">
          {score}%
        </div>
      </motion.div>
    </motion.div>
  );
}