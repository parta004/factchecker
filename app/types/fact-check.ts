export interface FactCheckIndicators {
  truthScore: number; // 0-100, color-coded circle
  manipulationAlerts: ManipulationIcon[];
  sourceVerification: VerificationBadge[];
  communityNotes: number; // Count with icon
  confidenceLevel: number; // Simple bar/dots
}

export interface ManipulationIcon {
  type: 'data' | 'emotional' | 'logical' | 'cherry-picking' | 'strawman';
  severity: 'high' | 'medium' | 'low';
  timestamp?: number;
  description: string;
}

export interface VerificationBadge {
  sourceType: 'verified' | 'questionable' | 'unknown';
  credibilityScore: number;
  sourceName: string;
}

export interface CommunityNote {
  id: string;
  statement: string;
  votes: { helpful: number; unhelpful: number };
  sources: string[];
  timestamp: Date;
  context: string; // Brief context
  severity: 'high' | 'medium' | 'low';
}

export interface VideoAnalysis {
  timeline: AnalysisPoint[];
  currentStatement: StatementAnalysis;
  overallScore: TruthScore;
  techniques: ManipulationTechnique[];
}

export interface AnalysisPoint {
  timestamp: number;
  severity: 'high' | 'medium' | 'low';
  type: 'lie' | 'misleading' | 'manipulation' | 'unverified';
  quickExplanation: string; // Max 10 words
}

export interface StatementAnalysis {
  statement: string;
  truthfulness: number; // 0-100
  confidence: number; // 0-100
  sources: string[];
  reasoning: string;
}

export interface TruthScore {
  overall: number; // 0-100
  breakdown: {
    factualAccuracy: number;
    sourceReliability: number;
    contextCompleteness: number;
    biasDetection: number;
  };
}

export interface ManipulationTechnique {
  name: string;
  type: 'logical_fallacy' | 'emotional_manipulation' | 'data_distortion';
  severity: 'high' | 'medium' | 'low';
  description: string;
  timestamp: number;
  examples: string[];
}

export type FactCheckSeverity = 'high' | 'medium' | 'low' | 'verified';

export interface FactCheckColors {
  high: string; // Red - lies detected
  medium: string; // Yellow - misleading
  low: string; // Orange - minor concerns
  verified: string; // Green - verified/true
  unverified: string; // Gray - unverified
}