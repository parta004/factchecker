'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { Statement } from '../../data/statementsData';

interface StatementCardProps {
  statement: Statement;
  viewMode: 'cards' | 'list';
  onReverify?: (statementId: string) => void;
  onDeepAnalysis?: (statementId: string) => void;
  onExpertReview?: (statementId: string) => void;
}

const StatementCard: React.FC<StatementCardProps> = ({ 
  statement, 
  viewMode, 
  onReverify, 
  onDeepAnalysis, 
  onExpertReview 
}) => {
  const {
    id,
    content,
    source_name,
    source_url,
    topic_category,
    fact_check_priority,
    engagement_score,
    date_collected,
    is_processed
  } = statement;

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      climate: 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/20',
      economy: 'bg-blue-500/30 text-blue-300 border border-blue-500/20',
      health: 'bg-red-500/30 text-red-300 border border-red-500/20',
      technology: 'bg-purple-500/30 text-purple-300 border border-purple-500/20',
      politics: 'bg-yellow-500/30 text-yellow-200 border border-yellow-500/20',
      general: 'bg-slate-500/30 text-slate-300 border border-slate-500/20'
    };
    return colors[category] || colors.general;
  };

  const getStatusDisplay = () => {
    const { factCheckStatus, truthScore, conflicts, networkRelationships } = statement;
    
    switch (factCheckStatus) {
      case 'verified':
        return (
          <div className="flex items-center gap-1 bg-green-500/30 text-green-300 border border-green-500/20 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle className="w-3 h-3" />
            <span>Verified ({truthScore}%)</span>
          </div>
        );
      case 'disputed':
        return (
          <div className="flex items-center gap-1 bg-red-500/30 text-red-300 border border-red-500/20 px-3 py-1 rounded-full text-sm font-medium">
            <AlertCircle className="w-3 h-3" />
            <span>Disputed ({conflicts} conflicts)</span>
          </div>
        );
      case 'monitoring':
        return (
          <div className="flex items-center gap-1 bg-blue-500/30 text-blue-300 border border-blue-500/20 px-3 py-1 rounded-full text-sm font-medium">
            <span>👁️</span>
            <span>Monitoring</span>
          </div>
        );
      case 'insufficient_data':
        return (
          <div className="flex items-center gap-1 bg-yellow-500/30 text-yellow-200 border border-yellow-500/20 px-3 py-1 rounded-full text-sm font-medium">
            <span>❓</span>
            <span>Insufficient Data</span>
          </div>
        );
      case 'processing':
        return (
          <div className="flex items-center gap-1 bg-purple-500/30 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-full text-sm font-medium">
            <span>⚡</span>
            <span>Processing</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getNetworkDisplay = () => {
    const { networkRelationships } = statement;
    if (!networkRelationships) return null;

    return (
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1 text-sm">
          <div className="w-2 h-2 bg-green-300 rounded-full" />
          <span className="text-green-300 font-medium">{networkRelationships.supporting}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="w-2 h-2 bg-red-300 rounded-full" />
          <span className="text-red-300 font-medium">{networkRelationships.contradicting}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="w-2 h-2 bg-blue-300 rounded-full" />
          <span className="text-blue-300 font-medium">{networkRelationships.related}</span>
        </div>
      </div>
    );
  };

  const getUserInitiatedProgress = () => {
    const { userInitiatedActions } = statement;
    if (!userInitiatedActions) return null;

    if (userInitiatedActions.deepAnalysis?.inProgress) {
      return (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-300 font-medium">Deep Analysis in Progress</span>
            <span className="text-sm text-blue-300 font-bold">{userInitiatedActions.deepAnalysis.progress}%</span>
          </div>
          <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden border border-slate-600/30">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500"
              style={{ width: `${userInitiatedActions.deepAnalysis.progress}%` }}
            />
          </div>
        </div>
      );
    }

    if (userInitiatedActions.expertReview?.requested) {
      return (
        <div className="mt-4 bg-orange-500/30 border border-orange-400/30 rounded-lg p-3">
          <div className="flex items-center gap-2 text-orange-200 text-sm font-medium">
            <span>👨‍🔬</span>
            <span>Expert Review Requested (Queue position: {userInitiatedActions.expertReview.queuePosition})</span>
          </div>
        </div>
      );
    }

    return null;
  };

  const getMeaningfulActions = () => {
    const actions = [];

    if (statement.canReverify && onReverify) {
      actions.push(
        <button 
          key="reverify"
          onClick={() => onReverify(statement.id)}
          className="px-3 py-2 bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded-lg text-sm font-medium hover:bg-blue-500/40 hover:border-blue-400/50 transition-all"
        >
          🔄 Re-verify
        </button>
      );
    }

    if (statement.canDeepDive && onDeepAnalysis) {
      actions.push(
        <button 
          key="deep"
          onClick={() => onDeepAnalysis(statement.id)}
          className="px-3 py-2 bg-purple-500/30 text-purple-200 border border-purple-400/30 rounded-lg text-sm font-medium hover:bg-purple-500/40 hover:border-purple-400/50 transition-all"
        >
          🔬 Deep Analysis
        </button>
      );
    }

    if (statement.canRequestExpert && onExpertReview) {
      actions.push(
        <button 
          key="expert"
          onClick={() => onExpertReview(statement.id)}
          className="px-3 py-2 bg-orange-500/30 text-orange-200 border border-orange-400/30 rounded-lg text-sm font-medium hover:bg-orange-500/40 hover:border-orange-400/50 transition-all"
        >
          👨‍🔬 Expert Review
        </button>
      );
    }

    return actions;
  };

  const formatEngagement = (score: number) => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}K`;
    }
    return score.toString();
  };

  const cardClasses = viewMode === 'list' 
    ? 'glass-card glass-hover rounded-lg'
    : 'glass-card glass-hover rounded-xl group h-full flex flex-col';

  return (
    <div className={cardClasses}>
      {/* Source Header - Fixed Height */}
      <div className="p-4 bg-black/30 backdrop-blur-xl border-b border-white/10 rounded-t-xl flex-shrink-0">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-blue-500/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-blue-400/20">
              <span className="text-blue-200 font-bold text-sm">
                {source_name.charAt(0)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm truncate">{source_name}</h3>
              <p className="text-slate-300 text-sm">
                {formatDistanceToNow(new Date(date_collected), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            {getStatusDisplay()}
          </div>
        </div>
      </div>

      {/* Statement Text - Flexible but Constrained Height */}
      <div className="p-6 flex-1 flex flex-col">
        <blockquote className="text-gray-50 text-base leading-relaxed font-medium flex-1 line-clamp-4 mb-4">
          "{content}"
        </blockquote>
        
        {/* Metadata Row - Fixed Height */}
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <span 
                className={`${getCategoryColor(topic_category)} px-3 py-1 rounded-full text-sm font-medium capitalize`}
              >
                {topic_category}
              </span>
              
              <div className="flex items-center gap-1 text-slate-300 text-sm font-medium">
                <span>📊</span>
                <span>{formatEngagement(engagement_score)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <span>Updated: {formatDistanceToNow(new Date(statement.lastUpdated), { addSuffix: true })}</span>
            </div>
          </div>
          
          {/* Network Relationships */}
          {getNetworkDisplay()}
          
          {/* User Initiated Progress */}
          {getUserInitiatedProgress()}
        </div>
      </div>

      {/* Action Footer - Fixed Height */}
      <div className="px-6 py-4 bg-black/30 backdrop-blur-xl border-t border-white/10 rounded-b-xl flex justify-between items-center flex-shrink-0">
        <a 
          href={source_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors underline decoration-blue-400/30 hover:decoration-blue-300/50"
        >
          <ExternalLink className="w-4 h-4" />
          View Source
        </a>
        
        <div className="flex flex-wrap items-center gap-2">
          {getMeaningfulActions()}
        </div>
      </div>
    </div>
  );
};

export default StatementCard;
