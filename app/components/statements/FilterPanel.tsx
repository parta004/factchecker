'use client';

import React from 'react';
import { Stats } from '../../data/statementsData';

interface FilterPanelProps {
  filters: {
    category: string;
    sourceType: string;
    minPriority: number;
    sortBy: string;
  };
  onFilterChange: (newFilters: Partial<FilterPanelProps['filters']>) => void;
  stats: Stats;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, stats }) => {
  const categories = Object.keys(stats.by_category);
  
  const handleCategoryChange = (category: string) => {
    onFilterChange({ category });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ sortBy });
  };

  const handlePriorityChange = (minPriority: number) => {
    onFilterChange({ minPriority });
  };

  const handleStatusChange = (status: string) => {
    // For now, we'll treat status filtering similar to category filtering
    // This can be expanded when the backend supports status-specific filtering
    onFilterChange({ category: status });
  };

  const clearFilters = () => {
    onFilterChange({
      category: 'all',
      sourceType: 'all',
      minPriority: 0,
      sortBy: 'priority'
    });
  };

  return (
    <div className="space-y-6">
      {/* Primary Filter Controls */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-black/20 backdrop-blur-xl border-b border-white/10 flex justify-between items-center">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </h3>
          <button 
            onClick={clearFilters}
            className="text-blue-400 hover:text-blue-300 text-xs font-medium underline transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Status Filter - Most Important */}
        <div className="p-4 border-b border-white/10">
          <h4 className="text-white text-sm font-medium mb-3">Status</h4>
          <div className="space-y-2">
            <FilterOption 
              label="All Statuses" 
              count={stats.total_statements} 
              active={filters.category === 'all'} 
              onClick={() => handleStatusChange('all')}
            />
            <FilterOption 
              label="Verified" 
              count={Math.floor(stats.total_statements * 0.4)} 
              active={filters.category === 'verified'} 
              color="green" 
              onClick={() => handleStatusChange('verified')}
            />
            <FilterOption 
              label="Disputed" 
              count={Math.floor(stats.total_statements * 0.15)} 
              active={filters.category === 'disputed'} 
              color="red" 
              onClick={() => handleStatusChange('disputed')}
            />
            <FilterOption 
              label="Monitoring" 
              count={Math.floor(stats.total_statements * 0.3)} 
              active={filters.category === 'monitoring'} 
              color="blue" 
              onClick={() => handleStatusChange('monitoring')}
            />
            <FilterOption 
              label="Insufficient Data" 
              count={Math.floor(stats.total_statements * 0.15)} 
              active={filters.category === 'insufficient'} 
              color="yellow" 
              onClick={() => handleStatusChange('insufficient')}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-4 border-b border-white/10">
          <h4 className="text-white text-sm font-medium mb-3">Category</h4>
          <div className="space-y-2">
            <FilterOption 
              label="All Categories" 
              count={stats.total_statements} 
              active={filters.category === 'all'} 
              onClick={() => handleCategoryChange('all')}
            />
            {Object.entries(stats.by_category).map(([category, count]) => (
              <FilterOption 
                key={category} 
                label={category.charAt(0).toUpperCase() + category.slice(1)} 
                count={count} 
                active={filters.category === category}
                onClick={() => handleCategoryChange(category)}
              />
            ))}
          </div>
        </div>

        {/* Priority/Sort Controls */}
        <div className="p-4">
          <h4 className="text-white text-sm font-medium mb-3">Sort By</h4>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 backdrop-blur-sm"
          >
            <option value="priority" className="bg-slate-800 text-white">Priority Score</option>
            <option value="date" className="bg-slate-800 text-white">Date Collected</option>
            <option value="engagement" className="bg-slate-800 text-white">Engagement Score</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Helper component for filter options
interface FilterOptionProps {
  label: string;
  count: number;
  active: boolean;
  color?: 'green' | 'red' | 'blue' | 'yellow' | 'purple';
  onClick?: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({ label, count, active, color, onClick }) => {
  const colorClasses: Record<string, string> = {
    green: 'text-green-300',
    red: 'text-red-300',
    blue: 'text-blue-300',
    yellow: 'text-yellow-200',
    purple: 'text-purple-300'
  };

  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${active ? 'bg-white/25 border border-white/20' : 'hover:bg-white/15 border border-transparent'}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          active ? 'bg-blue-300' : color ? colorClasses[color] : 'bg-slate-400'
        }`} />
        <span className={`text-sm font-medium ${active ? 'text-white' : 'text-slate-200'}`}>
          {label}
        </span>
      </div>
      <span className="text-sm bg-white/15 text-slate-300 px-2 py-1 rounded-full font-medium">
        {count}
      </span>
    </div>
  );
};

export default FilterPanel;
