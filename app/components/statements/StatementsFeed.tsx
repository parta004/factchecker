'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Grid3X3, List, Loader2 } from 'lucide-react';
import { mockStatements, mockStats, Statement, Stats } from '../../data/statementsData';
import StatementCard from './StatementCard';
import FilterPanel from './FilterPanel';
import StatsOverview from './StatsOverview';
import '../../styles/statements.css';

interface Filters {
  category: string;
  sourceType: string;
  minPriority: number;
  sortBy: string;
}

const StatementsFeed: React.FC = () => {
  const [statements, setStatements] = useState<Statement[]>([]);
  const [filteredStatements, setFilteredStatements] = useState<Statement[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    sourceType: 'all',
    minPriority: 0,
    sortBy: 'priority'
  });
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  useEffect(() => {
    loadStatements();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [statements, filters]);

  const loadStatements = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Add default fields to statements that don't have them
    const enhancedStatements = mockStatements.map(statement => ({
      ...statement,
      factCheckStatus: (statement.factCheckStatus || 'verified') as 'verified' | 'disputed' | 'monitoring' | 'insufficient_data' | 'processing',
      analysisLevel: (statement.analysisLevel || 'basic') as 'basic' | 'deep' | 'expert_reviewed',
      canReverify: statement.canReverify !== undefined ? statement.canReverify : true,
      canDeepDive: statement.canDeepDive !== undefined ? statement.canDeepDive : true,
      canRequestExpert: statement.canRequestExpert !== undefined ? statement.canRequestExpert : false,
      lastUpdated: statement.lastUpdated || statement.date_collected,
    }));
    
    setStatements(enhancedStatements);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...statements];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(stmt => stmt.topic_category === filters.category);
    }

    // Source type filter
    if (filters.sourceType !== 'all') {
      filtered = filtered.filter(stmt => stmt.source_type === filters.sourceType);
    }

    // Priority filter
    filtered = filtered.filter(stmt => stmt.fact_check_priority >= filters.minPriority);

    // Sort
    switch (filters.sortBy) {
      case 'priority':
        filtered.sort((a, b) => b.fact_check_priority - a.fact_check_priority);
        break;
      case 'date':
        filtered.sort((a, b) => new Date(b.date_collected).getTime() - new Date(a.date_collected).getTime());
        break;
      case 'engagement':
        filtered.sort((a, b) => b.engagement_score - a.engagement_score);
        break;
      default:
        break;
    }

    setFilteredStatements(filtered);
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRefresh = () => {
    loadStatements();
  };

  const handleReverify = (statementId: string) => {
    console.log('Re-verifying statement:', statementId);
    // TODO: Integrate with re-verification API
    alert(`Re-verification initiated for statement: ${statementId}`);
  };

  const handleDeepAnalysis = (statementId: string) => {
    console.log('Starting deep analysis for:', statementId);
    // TODO: Integrate with deep analysis API
    alert(`Deep analysis started for statement: ${statementId}`);
  };

  const handleExpertReview = (statementId: string) => {
    console.log('Requesting expert review for:', statementId);
    // TODO: Integrate with expert review queue API
    alert(`Expert review requested for statement: ${statementId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <motion.div
        className="bg-black/20 backdrop-blur-xl border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Statement Collection Feed</h1>
              <p className="text-gray-400 text-sm sm:text-base">Real-time collection of fact-checkable statements from news sources</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button 
                onClick={handleRefresh} 
                disabled={loading}
                className="btn-secondary text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {loading ? 'Loading...' : 'Refresh Feed'}
              </button>
              
              <div className="glass-card rounded-lg p-1 flex w-full sm:w-auto">
                <button 
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors flex-1 sm:flex-none ${
                    viewMode === 'cards' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4 inline mr-1" />
                  Cards
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors flex-1 sm:flex-none ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4 inline mr-1" />
                  List
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Stats Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-blue-400">{filteredStatements.length}</span>
              <span className="text-gray-400 text-xs sm:text-sm">Total</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-green-400">{filteredStatements.filter(s => new Date(s.date_collected) > new Date(Date.now() - 24*60*60*1000)).length}</span>
              <span className="text-gray-400 text-xs sm:text-sm">New Today</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-yellow-400">{filteredStatements.filter(s => !s.is_processed).length}</span>
              <span className="text-gray-400 text-xs sm:text-sm">Processing</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar with Fixed Width and Better Layout Priority */}
        <div className="w-80 bg-black/30 backdrop-blur-xl border-r border-white/10 min-h-screen flex flex-col">
          {/* Filters Section - TOP PRIORITY */}
          <div className="flex-1 p-6">
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange}
              stats={mockStats}
            />
          </div>
          
          {/* Stats Section - BOTTOM SECONDARY */}
          <div className="border-t border-white/10 p-6">
            <StatsOverview stats={mockStats} />
          </div>
        </div>

        {/* Main Feed Area */}
        <div className="flex-1 min-w-0">
          {/* Results Header */}
          <div className="p-6 border-b border-white/10">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-semibold">
                    {filteredStatements.length} statements found
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Last updated: 2 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 glass-card rounded-xl">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-4" />
                  <p className="text-gray-300">Loading statements...</p>
                </div>
              ) : (
                <>
                  {viewMode === 'cards' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">
                      {filteredStatements.map((statement, index) => (
                        <motion.div
                          key={statement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="h-full"
                        >
                          <StatementCard
                            statement={statement}
                            viewMode={viewMode}
                            onReverify={handleReverify}
                            onDeepAnalysis={handleDeepAnalysis}
                            onExpertReview={handleExpertReview}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {filteredStatements.map((statement, index) => (
                        <motion.div
                          key={statement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <StatementCard
                            statement={statement}
                            viewMode={viewMode}
                            onReverify={handleReverify}
                            onDeepAnalysis={handleDeepAnalysis}
                            onExpertReview={handleExpertReview}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                
                  {filteredStatements.length === 0 && !loading && (
                    <div className="text-center py-20 glass-card rounded-xl">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-white mb-2">No statements found</h3>
                      <p className="text-gray-400">Try adjusting your filters or refresh the feed</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementsFeed;
