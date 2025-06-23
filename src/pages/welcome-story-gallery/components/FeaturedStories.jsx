import React, { useRef } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const FeaturedStories = ({ stories, onReadSample }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320; // Width of card + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getThemeIcon = (theme) => {
    const themeIcons = {
      'Space': 'Rocket',
      'Ocean': 'Fish',
      'Fantasy': 'Wand2',
      'Adventure': 'Mountain',
      'Art & Creativity': 'Palette',
      'Technology': 'Bot'
    };
    return themeIcons[theme] || 'BookOpen';
  };

  const getThemeColor = (theme) => {
    const themeColors = {
      'Space': 'text-primary',
      'Ocean': 'text-accent',
      'Fantasy': 'text-secondary',
      'Adventure': 'text-warning',
      'Art & Creativity': 'text-error',
      'Technology': 'text-success'
    };
    return themeColors[theme] || 'text-primary';
  };

  return (
    <section id="featured-stories" className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading text-text-primary mb-4">
            Featured Sample Stories
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore our collection of magical tales to see what's possible with AI-powered storytelling
          </p>
        </div>

        {/* Stories Gallery */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-background border border-primary-200 rounded-full flex items-center justify-center shadow-storybook hover:bg-primary-50 storybook-transition"
          >
            <Icon name="ChevronLeft" size={20} className="text-text-primary" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-background border border-primary-200 rounded-full flex items-center justify-center shadow-storybook hover:bg-primary-50 storybook-transition"
          >
            <Icon name="ChevronRight" size={20} className="text-text-primary" />
          </button>

          {/* Stories Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex-shrink-0 w-80 bg-background rounded-2xl shadow-storybook hover:shadow-storybook-lg storybook-transition group"
              >
                {/* Cover Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-48 object-cover group-hover:scale-105 storybook-transition"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-storybook">
                      <Icon name={getThemeIcon(story.theme)} size={14} color="white" />
                      <span className="text-xs text-white font-medium">{story.theme}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/20 backdrop-blur-sm px-2 py-1 rounded-storybook">
                      <span className="text-xs text-white font-medium">{story.ageRange}</span>
                    </div>
                  </div>
                  {story.isInteractive && (
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center space-x-1 bg-accent/90 px-2 py-1 rounded-storybook">
                        <Icon name="MousePointer" size={12} color="white" />
                        <span className="text-xs text-white font-medium">Interactive</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading text-text-primary mb-2 group-hover:text-primary storybook-transition">
                    {story.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                    {story.description}
                  </p>

                  {/* Story Details */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="FileText" size={14} />
                        <span>{story.pages} pages</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onReadSample(story)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook font-medium"
                  >
                    <Icon name="Play" size={18} />
                    <span>Read Sample</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Grid View */}
        <div className="md:hidden mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stories.slice(0, 4).map((story) => (
              <div
                key={story.id}
                className="bg-background rounded-2xl shadow-storybook hover:shadow-storybook-lg storybook-transition"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <div className="bg-black/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                      {story.ageRange}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-text-primary mb-2">{story.title}</h3>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {story.description}
                  </p>
                  <button
                    onClick={() => onReadSample(story)}
                    className="w-full py-2 bg-primary text-white rounded-storybook hover:bg-primary-600 storybook-transition text-sm font-medium"
                  >
                    Read Sample
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories;