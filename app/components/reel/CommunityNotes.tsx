'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ThumbsUp, ThumbsDown, ExternalLink, X } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { CommunityNote } from '@/app/types/fact-check';
import { useState } from 'react';

interface CommunityNotesProps {
  notes: CommunityNote[];
  className?: string;
}

const SEVERITY_STYLES = {
  high: 'bg-red-500/20 border-red-500 text-red-400',
  medium: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
  low: 'bg-blue-500/20 border-blue-500 text-blue-400'
};

export function CommunityNotes({ notes, className }: CommunityNotesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!notes.length) return null;

  const topNote = notes[0];
  const noteCount = notes.length;

  return (
    <>
      {/* Community Notes Banner */}
      <motion.div
        className={cn(
          "flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg backdrop-blur-sm cursor-pointer",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsExpanded(true)}
      >
        <div className="relative flex items-center justify-center text-blue-400">
          <MessageSquare className="w-4 h-4" />
          {/* Count badge positioned absolutely */}
          <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
            {noteCount}
          </div>
        </div>
        <div className="flex-1 text-white text-sm">
          <span className="font-medium">Community Notes</span>
        </div>
        <div className="text-white/50 text-xs">Tap to view</div>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="w-full max-w-md bg-gray-900/95 border border-gray-700 rounded-t-2xl max-h-[80vh] overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <h3 className="text-white font-medium">Community Notes</h3>
                  <span className="text-gray-400 text-sm">({noteCount})</span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Notes List */}
              <div className="overflow-y-auto max-h-[60vh]">
                {notes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    className="p-4 border-b border-gray-700/50 last:border-b-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Note Content */}
                    <div className="text-white text-sm mb-3 leading-relaxed">
                      {note.statement}
                    </div>

                    {/* Context if available */}
                    {note.context && (
                      <div className="text-gray-400 text-xs mb-3 italic">
                        Context: {note.context}
                      </div>
                    )}

                    {/* Sources */}
                    {note.sources.length > 0 && (
                      <div className="mb-3">
                        <div className="text-gray-300 text-xs mb-1">Sources:</div>
                        {note.sources.slice(0, 2).map((source, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-blue-400 text-xs">
                            <ExternalLink className="w-3 h-3" />
                            <span className="truncate">{source}</span>
                          </div>
                        ))}
                        {note.sources.length > 2 && (
                          <div className="text-gray-400 text-xs">
                            +{note.sources.length - 2} more sources
                          </div>
                        )}
                      </div>
                    )}

                    {/* Voting */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-green-400">
                          <ThumbsUp className="w-3 h-3" />
                          <span className="text-xs">{note.votes.helpful}</span>
                        </div>
                        <div className="flex items-center gap-1 text-red-400">
                          <ThumbsDown className="w-3 h-3" />
                          <span className="text-xs">{note.votes.unhelpful}</span>
                        </div>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {new Date(note.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                <div className="text-center text-gray-400 text-xs">
                  Community notes are contributed by users and may not reflect verified facts
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}