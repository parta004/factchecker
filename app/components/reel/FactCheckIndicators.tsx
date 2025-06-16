'use client';

import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';
import { FactCheckIndicators as FactCheckIndicatorsType } from '@/app/types/fact-check';
import { Shield, AlertTriangle, CheckCircle, Users, Eye } from 'lucide-react';
import { useState } from 'react';

interface FactCheckIndicatorsProps {
  data: FactCheckIndicatorsType;
  communityNotes: any[];
  className?: string;
  onDetailsOpen?: () => void;
}

// Professional Truth Score Indicator
const TruthScoreIndicator = ({ score, onClick }: { score: number; onClick?: () => void }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

  return (
    <motion.div 
      className="relative w-12 h-12 group cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background Circle */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-full border border-white/20" />
      
      {/* Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="24"
          cy="24" 
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r="20" 
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth="2"
          strokeDasharray={strokeDasharray}
          className="transition-all duration-500"
        />
      </svg>
      
      {/* Score Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-white">{score}</span>
      </div>
      
      {/* Interaction Ripple */}
      <div className="absolute inset-0 rounded-full bg-white/10 scale-0 group-active:scale-100 transition-transform duration-150" />
    </motion.div>
  );
};

// Warning Alert Component
const WarningAlert = ({ 
  type, 
  severity, 
  onClick 
}: { 
  type: string; 
  severity: 'high' | 'medium' | 'low';
  onClick?: () => void;
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'high': return 'bg-red-500/80';
      case 'medium': return 'bg-yellow-500/80';
      case 'low': return 'bg-orange-500/80';
      default: return 'bg-gray-500/80';
    }
  };

  return (
    <motion.div
      className={`
        w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
        ${getSeverityColor()}
        backdrop-blur-sm border border-white/20
        hover:scale-105 active:scale-95 transition-transform
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        scale: severity === 'high' ? [1, 1.1, 1] : 1,
      }}
      transition={{ 
        duration: 2,
        repeat: severity === 'high' ? Infinity : 0,
        ease: "easeInOut"
      }}
    >
      <AlertTriangle className="w-4 h-4 text-white" />
    </motion.div>
  );
};

// Source Badge Component  
const SourceBadge = ({ verified, onClick }: { verified: boolean; onClick?: () => void }) => (
  <motion.div
    className={`
      w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
      ${verified ? 'bg-green-500/80' : 'bg-gray-500/80'}
      backdrop-blur-sm border border-white/20
      hover:scale-105 active:scale-95 transition-transform
    `}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {verified ? (
      <CheckCircle className="w-4 h-4 text-white" />
    ) : (
      <Shield className="w-4 h-4 text-white" />
    )}
  </motion.div>
);

// Community Notes Indicator
const CommunityNotesIndicator = ({ count, onClick }: { count: number; onClick?: () => void }) => (
  <motion.div
    className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
               bg-blue-500/80 backdrop-blur-sm border border-white/20
               hover:scale-105 active:scale-95 transition-transform"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Users className="w-4 h-4 text-white" />
    {count > 0 && (
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-white">{count}</span>
      </div>
    )}
  </motion.div>
);

export function FactCheckIndicators({ data, communityNotes, className, onDetailsOpen }: FactCheckIndicatorsProps) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleIndicatorClick = (type: string) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    onDetailsOpen?.();
  };

  return (
    <motion.div
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 z-30 touch-target",
        className
      )}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex flex-col gap-4">
        {/* Truth Score - Primary indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 400 }}
        >
          <TruthScoreIndicator 
            score={data.truthScore}
            onClick={() => handleIndicatorClick('truth-score')}
          />
        </motion.div>

        {/* Warning Indicators */}
        {data.manipulationAlerts.length > 0 && (
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            {data.manipulationAlerts.slice(0, 2).map((alert, index) => (
              <WarningAlert
                key={index}
                type={alert.type}
                severity={alert.severity}
                onClick={() => handleIndicatorClick('warning')}
              />
            ))}
          </motion.div>
        )}

        {/* Source Verification */}
        {data.sourceVerification.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <SourceBadge
              verified={data.sourceVerification.some(s => s.sourceType === 'verified')}
              onClick={() => handleIndicatorClick('source')}
            />
          </motion.div>
        )}

        {/* Community Notes */}
        {communityNotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <CommunityNotesIndicator
              count={communityNotes.length}
              onClick={() => handleIndicatorClick('community')}
            />
          </motion.div>
        )}

        {/* Confidence Level - Compact */}
        <motion.div
          className="flex items-center justify-center w-8 h-8 bg-black/40 backdrop-blur-md rounded-full border border-white/20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
        >
          <Eye className="w-3 h-3 text-white/80" />
        </motion.div>
      </div>
    </motion.div>
  );
}