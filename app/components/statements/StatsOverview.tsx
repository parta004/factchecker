'use client';

import React from 'react';
import { Stats } from '../../data/statementsData';

interface StatsOverviewProps {
  stats: Stats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      climate: '🌍',
      economy: '💰',
      health: '🏥',
      technology: '💻',
      politics: '🏛️',
      general: '📰'
    };
    return icons[category] || icons.general;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <h3 className="text-white font-semibold text-center text-sm">Collection Stats</h3>
      </div>
      
      <div className="p-4">
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-blue-300 mb-1">
            {stats.total_statements.toLocaleString()}
          </div>
          <div className="text-slate-300 text-sm font-medium">Total Statements</div>
        </div>

        {/* Compact Category Overview */}
        <div className="space-y-3">
          <h4 className="text-white text-sm font-medium mb-2">Top Categories</h4>
          {Object.entries(stats.by_category).slice(0, 3).map(([category, count]) => (
            <div key={category} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-base">{getCategoryIcon(category)}</span>
                <span className="text-slate-200 capitalize font-medium">{category}</span>
              </div>
              <span className="bg-white/15 text-slate-300 px-2 py-1 rounded text-sm font-medium">
                {count}
              </span>
            </div>
          ))}
          {Object.keys(stats.by_category).length > 3 && (
            <div className="text-center pt-2">
              <span className="text-slate-400 text-sm font-medium">+{Object.keys(stats.by_category).length - 3} more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
