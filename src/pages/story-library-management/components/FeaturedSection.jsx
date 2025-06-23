import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const FeaturedSection = ({ stories, onStoryClick, onQuickAction }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
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

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading text-text-primary mb-2">
            Featured Stories
          </h2>
          <p className="text-text-secondary">
            Your most loved and frequently read stories
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={20} className="text-secondary" />
          <span className="text-sm text-text-secondary">Favorites & Popular</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-storybook overflow-hidden hover:shadow-storybook-lg storybook-transition cursor-pointer group"
            onClick={() => onStoryClick(story)}
          >
            {/* Cover Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={story.coverImage}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 storybook-transition"
              />
              
              {/* Featured Badge */}
              <div className="absolute top-3 left-3 flex items-center space-x-1 bg-secondary px-2 py-1 rounded-full">
                <Icon name="Star" size={12} color="white" className="fill-current" />
                <span className="text-xs text-white font-medium">Featured</span>
              </div>

              {/* Quick Actions */}
              <button
                onClick={(e) => onQuickAction(e, story)}
                className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-text-secondary hover:text-text-primary rounded-storybook storybook-transition opacity-0 group-hover:opacity-100"
              >
                <Icon name="MoreVertical" size={16} />
              </button>

              {/* Progress Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <div className="flex items-center justify-between text-white text-xs">
                  <span>{story.readingProgress}% complete</span>
                  <span>{story.readCount} reads</span>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full mt-2">
                  <div
                    className="h-full bg-white rounded-full storybook-transition"
                    style={{ width: `${story.readingProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-heading text-text-primary line-clamp-2 flex-1">
                  {story.title}
                </h3>
                {story.isFavorite && (
                  <Icon name="Heart" size={16} className="text-secondary fill-current ml-2" />
                )}
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
                <span className="flex items-center space-x-1">
                  <Icon name={getThemeIcon(story.theme)} size={14} />
                  <span className="capitalize">{story.theme.replace('-', ' ')}</span>
                </span>
              </div>

              <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                {story.description}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStoryClick(story);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-white rounded-storybook hover:bg-primary-600 storybook-transition"
                >
                  <Icon name="BookOpen" size={16} />
                  <span className="text-sm">
                    {story.readingProgress > 0 ? 'Continue Reading' : 'Start Reading'}
                  </span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle share action
                  }}
                  className="p-2 bg-surface text-text-secondary hover:text-text-primary hover:bg-primary-50 rounded-storybook storybook-transition"
                  title="Share Story"
                >
                  <Icon name="Share2" size={16} />
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary-100">
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span className="flex items-center space-x-1">
                    <Icon name="BookOpen" size={12} />
                    <span>{story.totalPages} pages</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{Math.ceil(story.totalPages * 2)} min read</span>
                  </span>
                </div>
                
                {story.isCompleted && (
                  <div className="flex items-center space-x-1 text-success text-xs">
                    <Icon name="CheckCircle" size={12} />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;