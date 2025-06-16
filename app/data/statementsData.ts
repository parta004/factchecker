export const mockStatements = [
  {
    id: "stmt-001",
    content: "Climate change is causing a 15% increase in global temperature every decade according to new research.",
    source_url: "https://reuters.com/climate-research-2025",
    source_type: "rss",
    source_name: "Reuters Top News",
    engagement_score: 1250,
    topic_category: "climate",
    date_collected: "2025-06-16T14:30:00Z",
    is_processed: true,
    fact_check_priority: 8.5,
    metadata: {
      original_title: "New Climate Research Shows Alarming Temperature Trends",
      original_description: "Latest study reveals unprecedented warming patterns across global regions..."
    },
    factCheckStatus: 'disputed',
    truthScore: 35,
    conflicts: 12,
    nextCheck: "2025-06-18T14:30:00Z",
    analysisLevel: 'deep',
    canReverify: true,
    canDeepDive: false,
    canRequestExpert: true,
    networkRelationships: {
      supporting: 3,
      contradicting: 12,
      related: 25
    },
    lastUpdated: "2025-06-17T08:15:00Z"
  },
  {
    id: "stmt-002",
    content: "The unemployment rate has dropped to 3.2% this quarter, marking the lowest level in 50 years.",
    source_url: "https://bbc.com/economics/unemployment-record-low",
    source_type: "rss",
    source_name: "BBC World News",
    engagement_score: 890,
    topic_category: "economy",
    date_collected: "2025-06-16T13:45:00Z",
    is_processed: true,
    fact_check_priority: 7.2,
    metadata: {
      original_title: "Historic Low Unemployment Numbers Released",
      original_description: "Government statistics show continued economic recovery..."
    },
    factCheckStatus: 'verified',
    truthScore: 87,
    nextCheck: "2025-06-24T13:45:00Z",
    analysisLevel: 'basic',
    canReverify: true,
    canDeepDive: true,
    canRequestExpert: false,
    networkRelationships: {
      supporting: 8,
      contradicting: 1,
      related: 15
    },
    lastUpdated: "2025-06-16T18:22:00Z"
  },
  {
    id: "stmt-003",
    content: "New vaccine shows 95% effectiveness against the latest virus variant in clinical trials.",
    source_url: "https://npr.org/health/vaccine-breakthrough-2025",
    source_type: "rss",
    source_name: "NPR News",
    engagement_score: 2100,
    topic_category: "health",
    date_collected: "2025-06-16T12:20:00Z",
    is_processed: true,
    fact_check_priority: 9.1,
    metadata: {
      original_title: "Breakthrough Vaccine Shows Promise",
      original_description: "Phase 3 trials demonstrate high efficacy rates..."
    },
    factCheckStatus: 'monitoring',
    truthScore: 72,
    nextCheck: "2025-06-17T18:00:00Z",
    analysisLevel: 'deep',
    canReverify: false,
    canDeepDive: false,
    canRequestExpert: true,
    networkRelationships: {
      supporting: 6,
      contradicting: 2,
      related: 18
    },
    lastUpdated: "2025-06-17T06:45:00Z",
    userInitiatedActions: {
      expertReview: {
        requested: true,
        queuePosition: 3
      }
    }
  },
  {
    id: "stmt-004",
    content: "Electric vehicle sales have increased by 300% compared to last year across all major markets.",
    source_url: "https://cnn.com/tech/ev-sales-surge-2025",
    source_type: "rss",
    source_name: "CNN Top Stories",
    engagement_score: 1650,
    topic_category: "technology",
    date_collected: "2025-06-16T11:15:00Z",
    is_processed: true,
    fact_check_priority: 6.8,
    metadata: {
      original_title: "Electric Vehicle Market Sees Explosive Growth",
      original_description: "Automotive industry reports record-breaking EV adoption..."
    },
    factCheckStatus: 'insufficient_data',
    analysisLevel: 'basic',
    canReverify: true,
    canDeepDive: true,
    canRequestExpert: false,
    networkRelationships: {
      supporting: 2,
      contradicting: 0,
      related: 8
    },
    lastUpdated: "2025-06-16T16:45:00Z"
  },
  {
    id: "stmt-005",
    content: "Artificial intelligence systems now consume 40% of global energy according to latest environmental report.",
    source_url: "https://reuters.com/tech/ai-energy-consumption-study",
    source_type: "rss",
    source_name: "Reuters Top News",
    engagement_score: 980,
    topic_category: "technology",
    date_collected: "2025-06-16T10:30:00Z",
    is_processed: true,
    fact_check_priority: 7.9,
    metadata: {
      original_title: "AI Energy Impact Study Released",
      original_description: "Environmental researchers warn of AI's growing energy footprint..."
    }
  },
  {
    id: "stmt-006",
    content: "New study shows that social media usage has increased teen depression rates by 40% over the past 5 years.",
    source_url: "https://npr.org/health/social-media-depression-study",
    source_type: "rss",
    source_name: "NPR Health",
    engagement_score: 1850,
    topic_category: "health",
    date_collected: "2025-06-16T09:45:00Z",
    is_processed: false,
    fact_check_priority: 8.3,
    metadata: {
      original_title: "Teen Mental Health Crisis Linked to Social Media",
      original_description: "Comprehensive study tracks depression rates across social platforms..."
    }
  },
  {
    id: "stmt-007",
    content: "Federal Reserve announces interest rates will remain unchanged for the next 12 months to combat inflation.",
    source_url: "https://reuters.com/economy/fed-rates-announcement",
    source_type: "rss",
    source_name: "Reuters Business",
    engagement_score: 1420,
    topic_category: "economy",
    date_collected: "2025-06-16T08:30:00Z",
    is_processed: true,
    fact_check_priority: 6.5,
    metadata: {
      original_title: "Fed Holds Rates Steady Amid Inflation Concerns",
      original_description: "Central bank maintains current monetary policy stance..."
    }
  },
  {
    id: "stmt-008",
    content: "Breakthrough in quantum computing allows for 1000x faster processing than traditional computers.",
    source_url: "https://bbc.com/technology/quantum-breakthrough-2025",
    source_type: "rss",
    source_name: "BBC Technology",
    engagement_score: 2350,
    topic_category: "technology",
    date_collected: "2025-06-16T07:15:00Z",
    is_processed: false,
    fact_check_priority: 9.3,
    metadata: {
      original_title: "Quantum Computing Achieves Major Milestone",
      original_description: "Researchers demonstrate unprecedented processing speeds..."
    }
  },
  {
    id: "stmt-009",
    content: "Arctic ice melting has accelerated by 200% in the last decade, new satellite data reveals.",
    source_url: "https://cnn.com/climate/arctic-ice-melting-data",
    source_type: "rss",
    source_name: "CNN Climate",
    engagement_score: 1760,
    topic_category: "climate",
    date_collected: "2025-06-16T06:20:00Z",
    is_processed: true,
    fact_check_priority: 8.8,
    metadata: {
      original_title: "Alarming Arctic Ice Loss Documented",
      original_description: "Satellite measurements show unprecedented melting rates..."
    }
  },
  {
    id: "stmt-010",
    content: "New immigration policy will allow 500,000 additional workers annually to address labor shortages.",
    source_url: "https://npr.org/politics/immigration-policy-update",
    source_type: "rss",
    source_name: "NPR Politics",
    engagement_score: 1350,
    topic_category: "politics",
    date_collected: "2025-06-16T05:45:00Z",
    is_processed: false,
    fact_check_priority: 7.6,
    metadata: {
      original_title: "Immigration Reform Addresses Labor Market Needs",
      original_description: "Policy changes aim to fill critical workforce gaps..."
    }
  }
];

export const mockStats = {
  total_statements: 1247,
  by_source_type: {
    rss: 1247,
    social_media: 0
  },
  by_category: {
    climate: 189,
    economy: 245,
    health: 298,
    technology: 312,
    politics: 203
  }
};

export type Statement = {
  id: string;
  content: string;
  source_url: string;
  source_type: string;
  source_name: string;
  engagement_score: number;
  topic_category: string;
  date_collected: string;
  is_processed: boolean;
  fact_check_priority: number;
  metadata: {
    original_title: string;
    original_description: string;
  };
  // Enhanced fact-checking status
  factCheckStatus: 'verified' | 'disputed' | 'monitoring' | 'insufficient_data' | 'processing';
  truthScore?: number; // 0-100 confidence score
  conflicts?: number; // Number of contradicting sources
  nextCheck?: string; // Next autonomous monitoring check
  analysisLevel: 'basic' | 'deep' | 'expert_reviewed';
  canReverify: boolean;
  canDeepDive: boolean;
  canRequestExpert: boolean;
  networkRelationships?: {
    supporting: number;
    contradicting: number;
    related: number;
  };
  lastUpdated: string;
  userInitiatedActions?: {
    deepAnalysis?: {
      inProgress: boolean;
      progress?: number;
      eta?: string;
    };
    expertReview?: {
      requested: boolean;
      queuePosition?: number;
    };
  };
};

export type Stats = {
  total_statements: number;
  by_source_type: {
    [key: string]: number;
  };
  by_category: {
    [key: string]: number;
  };
};
