'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, BarChart3, Heart, Brain, Search, Target } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { ManipulationIcon } from '@/app/types/fact-check';

interface ManipulationAlertsProps {
  alerts: ManipulationIcon[];
  className?: string;
}

const MANIPULATION_ICONS = {
  data: BarChart3,
  emotional: Heart,
  logical: Brain,
  'cherry-picking': Search,
  strawman: Target
};

const MANIPULATION_EMOJIS = {
  data: '📊',
  emotional: '🗣️',
  logical: '🧠',
  'cherry-picking': '🍒',
  strawman: '🎯'
};

const SEVERITY_STYLES = {
  high: 'bg-red-500/20 border-red-500 text-red-400',
  medium: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
  low: 'bg-orange-500/20 border-orange-500 text-orange-400'
};

export function ManipulationAlerts({ alerts, className }: ManipulationAlertsProps) {
  if (!alerts.length) return null;

  return (
    <motion.div
      className={cn("flex flex-col gap-2", className)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <AnimatePresence>
        {alerts.slice(0, 3).map((alert, index) => {
          const emoji = MANIPULATION_EMOJIS[alert.type];
          const severityStyle = SEVERITY_STYLES[alert.severity];
          
          return (
            <motion.div
              key={`${alert.type}-${index}`}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full border-2 backdrop-blur-sm",
                severityStyle
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
                {emoji}
              </div>
              
              {/* Severity Indicator */}
              {alert.severity === 'high' && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="w-full h-full bg-red-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}
              
              {/* Tooltip on Hover */}
              <div className="absolute left-12 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap max-w-48">
                  <div className="font-medium capitalize">{alert.type.replace('-', ' ')}</div>
                  <div className="text-white/70">{alert.description}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Show count if more alerts */}
      {alerts.length > 3 && (
        <motion.div
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border-2 border-white/30 text-white/80"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-xs font-medium">+{alerts.length - 3}</span>
        </motion.div>
      )}
    </motion.div>
  );
}