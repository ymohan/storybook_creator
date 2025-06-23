import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentStories = ({ stories, onReadStory, onCreateNew }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-heading text-text-primary mb-2">
              Your Recent Stories
            </h2>
            <p className="text-text-secondary">
              Continue reading or create something new
            </p>
          </div>
          <button
            onClick={onCreateNew}
            className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook font-medium"
          >
            <Icon name="Plus" size={20} />
            <span>Create New Story</span>
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-background rounded-2xl shadow-storybook hover:shadow-storybook-lg storybook-transition overflow-hidden group"
            >
              {/* Cover Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-40 object-cover group-hover:scale-105 storybook-transition"
                />
                <div className="absolute top-3 left-3">
                  <div className="bg-black/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                    {story.ageRange}
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-black/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                    {story.theme}
                  </div>
                </div>
                {story.isCompleted && (
                  <div className="absolute bottom-3 right-3">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={16} color="white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-heading text-text-primary group-hover:text-primary storybook-transition">
                    {story.title}
                  </h3>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-secondary">
                      {story.isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {story.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface rounded-full">
                    <div 
                      className={`h-full rounded-full storybook-transition ${
                        story.isCompleted 
                          ? 'bg-gradient-to-r from-success to-success-400' :'bg-gradient-to-r from-primary to-secondary'
                      }`}
                      style={{ width: `${story.progress}%` }}
                    />
                  </div>
                </div>

                {/* Story Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-text-secondary">
                    Created {formatDate(story.createdDate)}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onReadStory(story)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-storybook hover:bg-primary-600 storybook-transition font-medium"
                >
                  <Icon name={story.isCompleted ? "BookOpen" : "Play"} size={18} />
                  <span>{story.isCompleted ? "Read Again" : "Continue Reading"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {stories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="BookOpen" size={48} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading text-text-primary mb-2">
              No Stories Yet
            </h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Start your storytelling journey by creating your first personalized story
            </p>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook font-medium"
            >
              <Icon name="Plus" size={20} />
              <span>Create Your First Story</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentStories;