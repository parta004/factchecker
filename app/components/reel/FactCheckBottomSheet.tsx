'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { useState, useEffect } from 'react';
import { FactCheckIndicators as FactCheckIndicatorsType } from '@/app/types/fact-check';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  data: FactCheckIndicatorsType;
  communityNotes: any[];
  className?: string;
}

const TruthScoreDisplay = ({ score }: { score: number }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Highly Accurate';
    if (score >= 60) return 'Partially Accurate';
    return 'Misleading Content';
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={`${(score / 100) * 175.93} 175.93`}
            className={getScoreColor(score)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Truth Score
        </h3>
        <p className={`text-sm ${getScoreColor(score)}`}>
          {getScoreLabel(score)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Based on fact-checking analysis
        </p>
      </div>
    </div>
  );
};

const AlertSection = ({ alerts }: { alerts: any[] }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
      <AlertTriangle className="w-4 h-4 text-yellow-500" />
      Content Alerts
    </h4>
    {alerts.map((alert, index) => (
      <div
        key={index}
        className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
      >
        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
          alert.severity === 'high' ? 'bg-red-500' :
          alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-orange-500'
        }`} />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
            {alert.type} Manipulation
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {alert.description}
          </p>
          {alert.timestamp && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              At {Math.floor(alert.timestamp / 60)}:{String(alert.timestamp % 60).padStart(2, '0')}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
);

const SourceSection = ({ sources }: { sources: any[] }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
      <CheckCircle className="w-4 h-4 text-green-500" />
      Source Verification
    </h4>
    {sources.map((source, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            source.sourceType === 'verified' ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {source.sourceName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Credibility: {source.credibilityScore}%
            </p>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-400" />
      </div>
    ))}
  </div>
);

const CommunityNotesSection = ({ notes }: { notes: any[] }) => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
      <Info className="w-4 h-4 text-blue-500" />
      Community Notes ({notes.length})
    </h4>
    {notes.slice(0, 3).map((note, index) => (
      <div
        key={note.id || index}
        className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
      >
        <p className="text-sm text-gray-900 dark:text-white mb-2">
          {note.statement}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              {note.votes.helpful}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsDown className="w-3 h-3" />
              {note.votes.unhelpful}
            </span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            note.severity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
            note.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
            'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {note.severity}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export function FactCheckBottomSheet({ 
  isOpen, 
  onClose, 
  data, 
  communityNotes, 
  className 
}: BottomSheetProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Prevent scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50",
              "bg-white dark:bg-gray-900 rounded-t-xl",
              "max-h-[80vh] flex flex-col",
              className
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, { offset, velocity }) => {
              setIsDragging(false);
              if (offset.y > 100 || velocity.y > 500) {
                onClose();
              }
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Truth Score */}
              <TruthScoreDisplay score={data.truthScore} />

              {/* Alerts */}
              {data.manipulationAlerts.length > 0 && (
                <AlertSection alerts={data.manipulationAlerts} />
              )}

              {/* Sources */}
              {data.sourceVerification.length > 0 && (
                <SourceSection sources={data.sourceVerification} />
              )}

              {/* Community Notes */}
              {communityNotes.length > 0 && (
                <CommunityNotesSection notes={communityNotes} />
              )}

              {/* Confidence */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Analysis Confidence
                </h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${data.confidenceLevel}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {data.confidenceLevel}%
                  </span>
                </div>
              </div>
            </div>

            {/* Safe area bottom padding */}
            <div className="h-safe-area-inset-bottom" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default FactCheckBottomSheet;
