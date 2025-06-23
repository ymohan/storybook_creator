import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const StoryDetails = ({ 
  storyDescription, 
  pageCount, 
  onStoryDescriptionChange, 
  onPageCountChange 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionPrompts = [
    "A magical adventure where the main character discovers a hidden world",
    "A story about friendship and helping others in times of need",
    "An exciting journey to solve a mystery in their neighborhood",
    "A tale about overcoming fears and finding inner courage",
    "An adventure that teaches the importance of being honest",
    "A story where the character learns to appreciate differences in others",
    "A magical quest to save their favorite place from danger",
    "An adventure about working together to achieve a common goal"
  ];

  const pageCountOptions = [
    { count: 3, label: 'Quick Story', description: 'Perfect for bedtime', duration: '5-8 min' },
    { count: 5, label: 'Short Adventure', description: 'Great for young readers', duration: '8-12 min' },
    { count: 8, label: 'Classic Tale', description: 'Most popular choice', duration: '12-18 min' },
    { count: 10, label: 'Extended Story', description: 'Rich with details', duration: '18-25 min' },
    { count: 12, label: 'Epic Adventure', description: 'For advanced readers', duration: '25-30 min' },
    { count: 15, label: 'Chapter Book', description: 'Multiple reading sessions', duration: '30+ min' }
  ];

  const handleSuggestionClick = (suggestion) => {
    onStoryDescriptionChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-heading text-text-primary mb-4">
          Tell Us About Your Story
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Describe what kind of adventure you want your character to have. The more details you provide, the more personalized your story will be!
        </p>
      </div>

      {/* Story Description */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="FileText" size={24} className="text-primary" />
          <span>Story Description</span>
        </h3>
        
        <div className="relative">
          <textarea
            placeholder="Describe your story idea here... What adventure should your character go on? What should they learn or discover?"
            value={storyDescription}
            onChange={(e) => onStoryDescriptionChange(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-primary-200 rounded-storybook focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          
          {/* Character Counter */}
          <div className="absolute bottom-3 right-3 text-sm text-text-secondary">
            {storyDescription.length}/500
          </div>
        </div>

        {/* Suggestion Button */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary-50 rounded-storybook storybook-transition"
          >
            <Icon name="Lightbulb" size={18} />
            <span>Need inspiration?</span>
          </button>
          
          <div className="text-sm text-text-secondary">
            {storyDescription.length < 50 && "Add more details for a richer story"}
            {storyDescription.length >= 50 && storyDescription.length < 150 && "Great start! More details will help"}
            {storyDescription.length >= 150 && "Perfect! Your story will be very detailed"}
          </div>
        </div>

        {/* Suggestions Panel */}
        {showSuggestions && (
          <div className="mt-4 p-4 bg-primary-50 rounded-storybook border border-primary-200">
            <h4 className="font-medium text-text-primary mb-3">Story Ideas:</h4>
            <div className="space-y-2">
              {suggestionPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(prompt)}
                  className="w-full text-left p-3 bg-background hover:bg-primary-100 rounded-storybook storybook-transition text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Page Count Selection */}
      <div className="bg-surface p-6 rounded-2xl border border-primary-100">
        <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="BookOpen" size={24} className="text-primary" />
          <span>Story Length</span>
        </h3>
        
        <p className="text-text-secondary mb-6">
          Choose how long you want your story to be. Longer stories have more details and adventures!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pageCountOptions.map((option) => (
            <button
              key={option.count}
              onClick={() => onPageCountChange(option.count)}
              className={`
                p-4 rounded-storybook border-2 storybook-transition hover:scale-105 text-left
                ${pageCount === option.count
                  ? 'border-primary bg-primary-50' :'border-primary-200 bg-background hover:border-primary-300'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`
                  w-10 h-10 rounded-storybook flex items-center justify-center font-bold
                  ${pageCount === option.count
                    ? 'bg-primary text-white' :'bg-primary-100 text-primary'
                  }
                `}>
                  {option.count}
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">
                    {option.label}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {option.duration}
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-secondary">
                {option.description}
              </p>
            </button>
          ))}
        </div>

        {/* Visual Page Representation */}
        <div className="mt-6 p-4 bg-primary-50 rounded-storybook">
          <h4 className="font-medium text-text-primary mb-3">
            Your story will have {pageCount} pages:
          </h4>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: pageCount }, (_, index) => (
              <div
                key={index}
                className="w-8 h-10 bg-background border border-primary-200 rounded-sm flex items-center justify-center text-xs text-text-secondary"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Preview */}
      {storyDescription && (
        <div className="bg-gradient-to-br from-accent-50 to-primary-50 p-6 rounded-2xl border border-accent-200">
          <h3 className="text-xl font-heading text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Eye" size={24} className="text-accent" />
            <span>Story Preview</span>
          </h3>
          <div className="bg-background p-4 rounded-storybook border border-accent-200">
            <p className="text-text-secondary italic">
              "{storyDescription.substring(0, 200)}{storyDescription.length > 200 ? '...' : ''}"
            </p>
          </div>
          <div className="mt-3 flex items-center space-x-4 text-sm text-text-secondary">
            <span>📖 {pageCount} pages</span>
            <span>⏱️ {pageCountOptions.find(opt => opt.count === pageCount)?.duration}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryDetails;