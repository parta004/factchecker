'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { useLayoutTheme } from '@/app/hooks/use-layout-theme';
import { useCategoryCounts } from '@/app/hooks/useNews';
import { useFilterStore, useSelectedCategories } from '@/app/stores/filterStore';
import Categories from './Categories';

interface CategoryFilterProps {
  className?: string;
  maxVisible?: number;
  showCounts?: boolean;
  allowMultiSelect?: boolean;
  isLoading?: boolean;
}

export function CategoryFilter({ 
  className,
  showCounts = true,
  allowMultiSelect = true,
}: CategoryFilterProps) {
  const { colors, isDark } = useLayoutTheme();
  
  // Get filter state from Zustand store
  const selectedCategories = useSelectedCategories();
  const { setSelectedCategories, toggleCategory } = useFilterStore();
  
  // Enhanced error handling for category counts
  const { 
    data: categoryCounts, 
    isLoading: countsLoading, 
    error: countsError,
    isError: hasCountsError 
  } = useCategoryCounts();

  const handleCategoryClick = useCallback((categoryId: string) => {
    if (allowMultiSelect) {
      toggleCategory(categoryId);
    } else {
      // Single select mode
      const newSelection = selectedCategories.includes(categoryId) ? [] : [categoryId];
      setSelectedCategories(newSelection);
    }
  }, [selectedCategories, allowMultiSelect, toggleCategory, setSelectedCategories]);

  const containerStyles = {
    background: isDark
      ? `linear-gradient(135deg, 
          rgba(15, 23, 42, 0.8) 0%,
          rgba(30, 41, 59, 0.6) 100%
        )`
      : `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.9) 0%,
          rgba(248, 250, 252, 0.8) 100%
        )`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${isDark ? 'rgba(71, 85, 105, 0.2)' : 'rgba(226, 232, 240, 0.4)'}`,
    borderRadius: '1rem',
    boxShadow: isDark
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  // Show loading state for initial load
  if (countsLoading && !categoryCounts) {
    return (
      <motion.div 
        className={cn("p-4", className)}
        style={containerStyles}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Filter 
                className="h-5 w-5" 
                style={{ color: colors.primary }}
              />
            </motion.div>
            <span 
              className="text-sm"
              style={{ color: colors.mutedForeground }}
            >
              Loading categories...
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={cn("p-4 space-y-4", className)}
      style={containerStyles}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Error State for Categories */}
      {hasCountsError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <span 
            className="text-xs"
            style={{ color: colors.mutedForeground }}
          >
            Categories temporarily unavailable
          </span>
        </motion.div>
      )}

      {/* Categories */}
      <Categories
        categoryCounts={categoryCounts || {}}
        selectedCategories={selectedCategories}
        handleCategoryClick={handleCategoryClick}
        hasCountsError={hasCountsError}
        showCounts={showCounts && !countsLoading && !hasCountsError}
        countsLoading={countsLoading}
        pendingSelection={null}
      />
    </motion.div>
  );
}