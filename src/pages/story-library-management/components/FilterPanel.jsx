import React from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFiltersChange, onClose }) => {
  const handleFilterChange = (filterType, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      ageRange: 'all',
      theme: 'all',
      dateRange: 'all',
      readingStatus: 'all'
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== 'all');

  const ageRanges = [
    { value: 'all', label: 'All Ages' },
    { value: '1-3', label: '1-3 years' },
    { value: '4-6', label: '4-6 years' },
    { value: '7-9', label: '7-9 years' },
    { value: '10-12', label: '10-12 years' }
  ];

  const themes = [
    { value: 'all', label: 'All Themes', icon: 'Sparkles' },
    { value: 'space', label: 'Space Adventure', icon: 'Rocket' },
    { value: 'underwater', label: 'Underwater', icon: 'Fish' },
    { value: 'jungle', label: 'Jungle Safari', icon: 'TreePine' },
    { value: 'fairy-tale', label: 'Fairy Tale', icon: 'Crown' },
    { value: 'science', label: 'Science & Tech', icon: 'Atom' },
    { value: 'adventure', label: 'Adventure', icon: 'Map' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const readingStatuses = [
    { value: 'all', label: 'All Stories', icon: 'BookOpen' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { value: 'in-progress', label: 'In Progress', icon: 'Clock' },
    { value: 'unread', label: 'Unread', icon: 'Circle' }
  ];

  return (
    <div className="bg-surface border border-primary-200 rounded-storybook p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading text-text-primary">Filter Stories</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-text-secondary hover:text-text-primary storybook-transition"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-text-secondary hover:text-text-primary storybook-transition"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Age Range Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Age Range
          </label>
          <div className="space-y-2">
            {ageRanges.map((range) => (
              <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="ageRange"
                  value={range.value}
                  checked={filters.ageRange === range.value}
                  onChange={(e) => handleFilterChange('ageRange', e.target.value)}
                  className="w-4 h-4 text-primary focus:ring-primary border-primary-200"
                />
                <span className="text-sm text-text-secondary">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Theme Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Theme
          </label>
          <div className="space-y-2">
            {themes.map((theme) => (
              <label key={theme.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value={theme.value}
                  checked={filters.theme === theme.value}
                  onChange={(e) => handleFilterChange('theme', e.target.value)}
                  className="w-4 h-4 text-primary focus:ring-primary border-primary-200"
                />
                <Icon name={theme.icon} size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{theme.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Created
          </label>
          <div className="space-y-2">
            {dateRanges.map((range) => (
              <label key={range.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  value={range.value}
                  checked={filters.dateRange === range.value}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-4 h-4 text-primary focus:ring-primary border-primary-200"
                />
                <span className="text-sm text-text-secondary">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reading Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Reading Status
          </label>
          <div className="space-y-2">
            {readingStatuses.map((status) => (
              <label key={status.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="readingStatus"
                  value={status.value}
                  checked={filters.readingStatus === status.value}
                  onChange={(e) => handleFilterChange('readingStatus', e.target.value)}
                  className="w-4 h-4 text-primary focus:ring-primary border-primary-200"
                />
                <Icon name={status.icon} size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{status.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;