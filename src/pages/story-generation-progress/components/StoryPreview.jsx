import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const StoryPreview = ({ story, isComplete = false }) => {
  if (!story) return null;

  return (
    <div className={`
      bg-background rounded-2xl p-6 border-2 shadow-storybook-lg storybook-transition
      ${isComplete 
        ? 'border-success bg-gradient-to-br from-success-50 to-accent-50' :'border-primary-200 animate-pulse'
      }
    `}>
      {/* Preview Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading text-text-primary">
          Story Preview
        </h3>
        {isComplete ? (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={20} />
            <span className="text-sm font-medium">Complete!</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-primary">
            <Icon name="Clock" size={20} />
            <span className="text-sm font-medium">Generating...</span>
          </div>
        )}
      </div>

      {/* Cover Image */}
      <div className="relative mb-4">
        <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl overflow-hidden">
          {story.coverImage ? (
            <Image
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="Image" size={48} className="text-primary-300 animate-pulse" />
            </div>
          )}
        </div>
        
        {/* Overlay with story info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-xl">
          <h4 className="text-white font-heading text-lg mb-1">
            {story.title || "Your Story Title"}
          </h4>
          <div className="flex items-center space-x-4 text-white/80 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={14} />
              <span>{story.pages || 8} pages</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{story.readingTime || "5-7 min"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Details */}
      <div className="space-y-3">
        <div>
          <h5 className="text-sm font-medium text-text-primary mb-1">Character</h5>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={12} color="white" />
            </div>
            <span className="text-text-secondary">{story.character || "Hero"}</span>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-text-primary mb-1">Theme</h5>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
              <Icon name="Sparkles" size={12} color="white" />
            </div>
            <span className="text-text-secondary">{story.theme || "Adventure"}</span>
          </div>
        </div>

        {story.description && (
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-1">Description</h5>
            <p className="text-sm text-text-secondary leading-relaxed">
              {story.description}
            </p>
          </div>
        )}
      </div>

      {/* Action Button */}
      {isComplete && (
        <div className="mt-6 pt-4 border-t border-surface">
          <button className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook">
            <Icon name="BookOpen" size={20} />
            <span className="font-medium">Start Reading</span>
          </button>
        </div>
      )}

      {/* Loading Shimmer Effect */}
      {!isComplete && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-2xl" />
      )}
    </div>
  );
};

export default StoryPreview;