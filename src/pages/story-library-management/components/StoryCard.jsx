import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const StoryCard = ({
  story,
  viewMode = 'grid',
  isSelected = false,
  onSelect,
  onClick,
  onQuickAction
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getThemeColor = (theme) => {
    const themeColors = {
      space: 'text-purple-600',
      underwater: 'text-blue-600',
      jungle: 'text-green-600',
      'fairy-tale': 'text-pink-600',
      science: 'text-indigo-600',
      adventure: 'text-orange-600'
    };
    return themeColors[theme] || 'text-text-secondary';
  };

  const getThemeIcon = (theme) => {
    const themeIcons = {
      space: 'Rocket',
      underwater: 'Fish',
      jungle: 'TreePine',
      'fairy-tale': 'Crown',
      science: 'Atom',
      adventure: 'Map'
    };
    return themeIcons[theme] || 'BookOpen';
  };

  const getReadingLevelColor = (level) => {
    const levelColors = {
      'Beginner': 'bg-success-100 text-success-700',
      'Intermediate': 'bg-warning-100 text-warning-700',
      'Advanced': 'bg-error-100 text-error-700'
    };
    return levelColors[level] || 'bg-surface text-text-secondary';
  };

  if (viewMode === 'list') {
    return (
      <div
        className={`
          bg-surface border border-primary-100 rounded-storybook p-4 hover:shadow-storybook-lg storybook-transition cursor-pointer
          ${isSelected ? 'ring-2 ring-primary bg-primary-50' : ''}
        `}
        onClick={onClick}
      >
        <div className="flex items-center space-x-4">
          {/* Selection Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`
              w-5 h-5 rounded border-2 flex items-center justify-center storybook-transition
              ${isSelected 
                ? 'bg-primary border-primary text-white' :'border-primary-200 hover:border-primary'
              }
            `}
          >
            {isSelected && <Icon name="Check" size={12} />}
          </button>

          {/* Cover Image */}
          <div className="w-16 h-16 rounded-storybook overflow-hidden flex-shrink-0">
            <Image
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Story Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-heading text-text-primary truncate mb-1">
                  {story.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(story.createdDate)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="User" size={14} />
                    <span>Age {story.childAge}</span>
                  </span>
                  <span className={`flex items-center space-x-1 ${getThemeColor(story.theme)}`}>
                    <Icon name={getThemeIcon(story.theme)} size={14} />
                    <span className="capitalize">{story.theme.replace('-', ' ')}</span>
                  </span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2">
                  {story.description}
                </p>
              </div>

              {/* Quick Actions */}
              <button
                onClick={(e) => onQuickAction(e, story)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-primary-50 rounded-storybook storybook-transition"
              >
                <Icon name="MoreVertical" size={18} />
              </button>
            </div>

            {/* Progress and Stats */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-primary-100 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full storybook-transition"
                      style={{ width: `${story.readingProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-secondary">
                    {story.readingProgress}%
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReadingLevelColor(story.readingLevel)}`}>
                  {story.readingLevel}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <span className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>{story.readCount}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="BookOpen" size={12} />
                  <span>{story.totalPages} pages</span>
                </span>
                {story.isFavorite && (
                  <Icon name="Heart" size={12} className="text-secondary fill-current" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        bg-surface border border-primary-100 rounded-storybook overflow-hidden hover:shadow-storybook-lg storybook-transition cursor-pointer group
        ${isSelected ? 'ring-2 ring-primary' : ''}
      `}
      onClick={onClick}
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 storybook-transition"
        />
        
        {/* Selection Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`
            absolute top-3 left-3 w-6 h-6 rounded border-2 flex items-center justify-center storybook-transition
            ${isSelected 
              ? 'bg-primary border-primary text-white' :'bg-white/80 border-white hover:bg-white'
            }
          `}
        >
          {isSelected && <Icon name="Check" size={14} />}
        </button>

        {/* Quick Actions */}
        <button
          onClick={(e) => onQuickAction(e, story)}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-text-secondary hover:text-text-primary rounded-storybook storybook-transition opacity-0 group-hover:opacity-100"
        >
          <Icon name="MoreVertical" size={16} />
        </button>

        {/* Progress Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-1 bg-white/20 rounded-full">
              <div
                className="h-full bg-white rounded-full storybook-transition"
                style={{ width: `${story.readingProgress}%` }}
              />
            </div>
            <span className="text-xs text-white">
              {story.readingProgress}%
            </span>
          </div>
        </div>

        {/* Favorite Badge */}
        {story.isFavorite && (
          <div className="absolute top-3 right-12 p-1 bg-secondary rounded-full">
            <Icon name="Heart" size={12} color="white" className="fill-current" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-heading text-text-primary line-clamp-2 flex-1">
            {story.title}
          </h3>
        </div>

        <div className="flex items-center space-x-3 text-sm text-text-secondary mb-3">
          <span className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(story.createdDate)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="User" size={14} />
            <span>Age {story.childAge}</span>
          </span>
        </div>

        <p className="text-sm text-text-secondary line-clamp-3 mb-4">
          {story.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`flex items-center space-x-1 ${getThemeColor(story.theme)}`}>
              <Icon name={getThemeIcon(story.theme)} size={14} />
              <span className="text-xs capitalize">{story.theme.replace('-', ' ')}</span>
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReadingLevelColor(story.readingLevel)}`}>
              {story.readingLevel}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <span className="flex items-center space-x-1">
              <Icon name="Eye" size={12} />
              <span>{story.readCount}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="BookOpen" size={12} />
              <span>{story.totalPages}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;